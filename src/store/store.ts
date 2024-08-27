import { Dict, FederatedPointerEvent } from "pixi.js"
import { ILinkStyle, INodeShapeStyle, INodeStyle, IShapeState } from "../renderer/types"
import { CanvasLink } from "./graph/links"
import { CanvasNode } from "./graph/nodes"
import { filterLinksOfNode } from "./graph/utils"
import { ICanvasItemProperties, ICanvasLink, ICanvasNode, IDataStore, IdString } from "./graph"
import { IDataStoreListeners } from "./events/types"
import { GraphCanvas } from "../canvas"
import { deepMerge } from "../utils/merge"
import stc from "string-to-color";
import { NodeStyleDefaults } from "../renderer/shapes/nodes/circle/defaults"


/**
 * DataStore for managing nodes, links, paths etc 
 */
export class DataStore implements IDataStore {

  nodes: Map<IdString, CanvasNode>
  links: Map<IdString, CanvasLink>

  canvas: GraphCanvas

  // when any of the node is being in dragging, this will disable hover effect on other nodes 
  isDragModeOn: boolean = false

  message: string | null = null

  selectedNodes: Map<IdString, CanvasNode> = new Map()
  selectedLinks: Map<IdString, CanvasLink> = new Map()

  listeners: IDataStoreListeners

  constructor(canvas: GraphCanvas) {
    this.nodes = new Map()
    this.links = new Map()
    this.canvas = canvas

    this.listeners = {
      "node:data:onAdded": [],
      "node:data:onDeleted": [],
      "node:data:onPropertiesUpdated": [],
      "node:data:onLinksUpdated": [],
      "node:data:onPositionUpdated": [],
      "node:data:onStyleUpdated": [],

      "link:data:onAdded": [],
      "link:data:onDeleted": [],
      "link:data:onPropertiesUpdated": [],
      "link:data:onStyleUpdated": [],


      'node:gfx:onStateUpdated': [],
      'link:gfx:onStateUpdated': [],

      "node:gfx:onPointerIn": [],
      "node:gfx:onPointerOut": [],
      "node:gfx:onClicked": [],
      "node:gfx:onUnClicked": [],
      "node:gfx:onContextMenu": [],
      // "node:gfx:onMoved": [],

      "link:gfx:onPointerIn": [],
      "link:gfx:onPointerOut": [],
      "link:gfx:onClicked": [],
      "link:gfx:onUnClicked": [],
      "link:gfx:onContextMenu": [],
      "link:gfx:onMoved": [],

      "artBoard:onMessageChanged": [],

    }
  }

  enableDraggingMode(){
    this.isDragModeOn = true;
  }

  disableDraggingMode(){
    this.isDragModeOn = false;
  }

  // Register event listeners
  on(event: keyof IDataStoreListeners, listener: any) {
    if (this.listeners[event]) {
      this.listeners[event].push(listener as any);
    } else {
      console.error(`Event "${event}" is not supported.`);
    }
  }

  // Remove event listeners
  off(event: keyof IDataStoreListeners, listener?: any) {
    if (this.listeners[event]) {
      if (listener) {
        // @ts-ignore
        this.listeners[event] = this.listeners[event].filter(l => l !== listener);
      } else {
        this.listeners[event] = [];
      }
    } else {
      console.error(`Event "${event}" is not supported.`);
    }
  }

  // Trigger event listeners
  trigger(event: keyof IDataStoreListeners, data: any) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(listener => listener(data));
    }
  }

  addToSelectedNodes(node: CanvasNode) {
    this.selectedNodes.set(node.id, node)
  }

  removeFromSelectedNodes(node: CanvasNode) {
    this.selectedNodes.delete(node.id)
  }

  addToSelectedLinks(link: CanvasLink) {
    this.selectedLinks.set(link.id, link)
  }

  removeFromSelectedLinks(link: CanvasLink) {
    this.selectedLinks.delete(link.id)
  }

  private getNodeSizeBasedOnDegree(node: CanvasNode, style: INodeStyle) {
    if (node.degree?.total && node.degree.total <= 1) {
      return style?.size;
    }
    const size = style?.size + (node.degree.total * 0.02)
    // if (size > style.size * 2){
    //     return style.size * 2
    // }
    // return 12
    return size

  }
  generateNodeStyle(node: ICanvasNode) {
    // const nodeStyles = this.canvas.options.styles?.nodes || {};

    let style: INodeStyle;
    console.log("===generateNodeStyle node.id", node.id, this.canvas.options.styles)
    const nodeStyles = this.canvas.options.styles?.nodes || {}
    // const nodeStyles = this.canvas.options.styles?.nodes || {};
    const defaultNodeStyle: INodeStyle = this.canvas.options.styles?.defaultNodeStyle || NodeStyleDefaults as INodeStyle;

    // P3 - color by group
    style = this.canvas.options.extraSettings?.nodeColorBasedOn === "group"
        ? deepMerge(defaultNodeStyle, { shape: { background: { color: stc(node.group) } } })
        : defaultNodeStyle;
    // P2 - style defined in the nodeStyleFromICanvasOptions ie., use defined in ICanvasOptions 
    style = deepMerge(style, nodeStyles[node.group] || {})
    // P1 - this has the highest priority, 
    console.log("=====style node.id", node.id,  style, nodeStyles[node.group], nodeStyles)
    style = deepMerge(style, node?.style || {});


    // style.label.text.font.size = style.size 
    if (this.canvas.options.extraSettings?.nodeSizeBasedOn === "degree") {
      const nodeSize = this.getNodeSizeBasedOnDegree(node, style);
      style = deepMerge(style, { size: nodeSize })
    }

    return style
  }


  calcDegree(nodeId: IdString) {
    let incoming: number = 0;
    let outgoing: number = 0;
    this.links.forEach((link) => {
      if (link.source.id === nodeId) {
        outgoing++
      }
      if (link.target.id === nodeId) {
        incoming++
      }
    })
    return { incoming, outgoing, total: incoming + outgoing }
  }

  private addNode(node: ICanvasNode) {

    // const linkStyles = this.canvas.options.styles?.links || {};

    if (this.canvas.artBoard.isDestroyed === true) {
      console.debug("ArtBoard destroyed, ignoring adding the node ");
      return
    }

    // update the properties if node already exist
    if (!this.nodes.has(node.id)) {
      node.degree = this.calcDegree(node.id)
      node.style = this.generateNodeStyle(node);
      const nodeInstance = new CanvasNode(node)
      this.nodes.set(node.id, nodeInstance);
      this.trigger('node:data:onAdded', { id: node.id, node: nodeInstance });
      return nodeInstance
    } else {
      console.error(`Node with id "${node.id}" already exists.`);
    }
  }

  setState(item: CanvasNode | CanvasLink, stateName: IShapeState, setNeighborsToo: boolean = false, event?: FederatedPointerEvent) {
    // console.log("setState called", item.id, stateName, setNeighborsToo)
    if (item instanceof CanvasNode) {
      // Handle CanvasNode instance
      const node = this.nodes.get(item.id)
      if (node) {
        node.state = stateName
        this.nodes.set(item.id, node)
        this.trigger('node:gfx:onStateUpdated', { id: node.id, node: node, state: stateName, setNeighborsToo: setNeighborsToo, event: event })
      }

    } else if (item instanceof CanvasLink) {
      const link = this.links.get(item.id)
      if (link) {
        link.state = stateName
        this.links.set(item.id, link)
        this.trigger('link:gfx:onStateUpdated', { id: link.id, link: link, state: stateName, setNeighborsToo: setNeighborsToo, event: event })
      }
    } else {
      // Handle other cases
      console.error("Item is neither CanvasNode nor CanvasLink");
    }
  }

  moveNodeTo(nodeId: IdString, x: number, y: number, event?: FederatedPointerEvent) {
    // console.log("Updating position of node ", nodeId, x, y)
    const node: CanvasNode | undefined = this.nodes.get(nodeId);
    if (node) {
      node.updateNodePosition(x, y)
      // node.x = x;
      // node.y = y;
      // // TODO - trigger new event callled node:
      this.nodes.set(nodeId, node)
      // node.gfxInstance?.setPosition(x, y);
      this.trigger('node:data:onPositionUpdated', { id: node.id, node: node, event: event });
      // node.gfxInstance.reDrawNeighbors()
    }
  }

  updateNodeProperties(nodeId: IdString, properties: ICanvasItemProperties) {
    const node = this.nodes.get(nodeId);
    if (node) {
      node?.updateProperties(properties)
      this.nodes.set(nodeId, node)
      this.trigger('node:data:onPropertiesUpdated', { id: nodeId, node: node, updatedProperties: properties });
    } else {
      console.error(`Node with key "${nodeId}" does not exist.`);
    }
  }

  deleteNode(nodeId: IdString) {
    // console.log("delete Node", nodeId)
    if (this.nodes.has(nodeId)) {
      const node = this.nodes.get(nodeId);
      // delete the links
      node?.links.forEach((link) => {
        this.deleteLink(link.id)
      })
      // delete this node 
      this.nodes.delete(nodeId);
      this.trigger('node:data:onDeleted', { id: nodeId, node });
    } else {
      console.error(`Node with key "${nodeId}" does not exist. can't delete`);
    }
  }

  getNode(key: IdString) {
    return this.nodes.get(key);
  }

  private reCalcNodeLinks(nodeId: IdString) {
    console.debug("reCalcNodeLinks", nodeId, this.links)
    const node = this.nodes.get(nodeId)
    if (node) {
      const neighbors = this.getNeighbors(nodeId)
      node.setNeighbors(neighbors)
      this.nodes.set(nodeId, node)
      this.trigger('node:data:onLinksUpdated', { id: node.id, node: node })
    } else {
      console.error(`${nodeId} doesnt exist in nodes, so can't reCalcNodeLinks`)
    }
  }

  generateLinkStyle(link: ICanvasLink){

    let style: ILinkStyle;
    const linkStyles = this.canvas.options.styles?.links || {}

    // console.log("====this.canvas.options.extraSettings.nodeColorBasedOn", this.canvas.options.extraSettings?.nodeColorBasedOn, node.id, node.style)
    // P3 - color by group
    if (this.canvas.options.extraSettings?.linkColorBasedOn === "group") {
      style = deepMerge(this.canvas.options.styles?.defaultLinkStyle || {}, { shape: { color: stc(link.group) } })
      // console.log("====nodeColorBasedOn", style)
    } else {
      style = this.canvas.options.styles?.defaultLinkStyle
    }

    // P2 - style defined in the nodeStyleFromICanvasOptions ie., use defined in ICanvasOptions 
    style = deepMerge(style, linkStyles[link.group] || {})

    // P1 - this has the highest priority, 
    style = deepMerge(style, link?.style || {});

    return style
  }

  private addLink(link: ICanvasLink) {

    if (this.canvas.artBoard.isDestroyed === true) {
      console.debug("ArtBoard destroyed, ignoring adding the link ");
      return
    }


    if (!this.links.has(link.id)) {
      // attach sourceInstance using sourceId
      console.log("Adding link", link)
      const sourceId = link.source instanceof CanvasNode ? link.source.id : link.source
      const sourceNode = this.nodes.get(sourceId);

      if (sourceNode) {
        //@ts-ignore
        link.source = sourceNode
      } else {
        throw Error(`${sourceId} not found in nodes: ${this.nodes} `)
      }

      // attach targetInstance using targetId
      const targetId = link.target instanceof CanvasNode ? link.target.id : link.target
      const targetNode = this.nodes.get(targetId);
      if (targetNode) {
        //@ts-ignore
        link.target = targetNode
      } else {
        throw Error(`${targetId} not found in node: ${this.nodes} `)
      }

      link.style = this.generateLinkStyle(link);

      // create CanvasLink
      const linkInstance = new CanvasLink(link)
      this.links.set(link.id, linkInstance);
      this.trigger('link:data:onAdded', { id: link.id, link: linkInstance });
      this.reCalcNodeLinks(linkInstance.source.id);
      this.reCalcNodeLinks(linkInstance.target.id);
      return linkInstance

    } else {
      console.error(`Link with key "${link.id}" already exists.`);
    }

  }

  updateLinkProperties(linkId: IdString, properties: ICanvasItemProperties) {
    const link = this.links.get(linkId);
    if (link) {
      link?.updateProperties(properties)
      this.links.set(linkId, link)
      this.trigger('link:data:onPropertiesUpdated', { id: linkId, link: link, updatedProperties: properties });
    } else {
      console.error(`Link with key "${linkId}" does not exist.`);
    }
  }


  deleteLink(linkId: IdString) {
    const link = this.links.get(linkId);
    if (link) {
      this.links.delete(linkId);
      this.trigger('link:data:onDeleted', { id: linkId, link });
      // recacl nodeLinks for the nodes of the link
      this.reCalcNodeLinks(link.source.id);
      this.reCalcNodeLinks(link.target.id);
    } else {
      console.error(`Link with key "${linkId}" does not exist.`);
    }
  }

  getNodes(): CanvasNode[] {
    return Array.from(this.nodes.values())
  }

  getLinks(): CanvasLink[] {
    return Array.from(this.links.values())
  }
 
  /**
   * Adds data to the graph 
   * @param nodes 
   * @param links 
   */
  add(nodes: ICanvasNode[], links: ICanvasLink[]) {
    console.log("adding nodes and links", nodes, links)

    if (this.canvas.artBoard.isDestroyed === true) {
      console.debug("ArtBoard destroyed, ignoring adding the data ");
      this.canvas.dataStore.updateMessage("ArtBoard destroyed, ignoring adding the data")
      return
    }


    this.canvas.dataStore.updateMessage("Drawing new data")

    nodes.map(node=> this.addNode(node))
    links.map(link=> this.addLink(link))
    const newNodes = nodes.map(node=> this.nodes.get(node.id)).filter(node => node !== undefined)
    const newLinks = links.map(link=> this.links.get(link.id)).filter(link => link !== undefined)
    // this.canvas.layout.computeLayout(newNodes, newLinks)
    this.canvas.artBoard.renderer.renderSelection(newNodes, newLinks)
  }

  getNeighborLinks(nodeId: IdString): CanvasLink[] {
    return this.getLinks().filter(link => link.source.id === nodeId || link.target.id === nodeId);
  }

  /*
  get both neighbor nodes and links for a given nodeIf
  */
  getNeighbors(nodeId: IdString): { nodes: CanvasNode[], links: CanvasLink[] } {
    const neighborLinks: CanvasLink[] = [];
    const relatedNodes: Map<IdString, CanvasNode> = new Map();

    filterLinksOfNode(nodeId, this.links).forEach(link => {
      neighborLinks.push(link);
      const source = this.nodes.get(link.source.id)
      if (source && source.id !== nodeId) {
        relatedNodes.set(link.source.id, source);
      }
      const target = this.nodes.get(link.target.id)
      if (target && target.id !== nodeId) {
        relatedNodes.set(link.target.id, target);
      }
    });
    const neighbors = { nodes: Array.from(relatedNodes.values()), links: neighborLinks };
    return neighbors
  }

  updateMessage = (message: string | null) => {
    this.message = message
    this.trigger('artBoard:onMessageChanged', { message });
  }

  destroy(){
    this.nodes.clear()
    this.links.clear()
  }

}