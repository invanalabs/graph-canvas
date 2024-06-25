import { FederatedPointerEvent } from "pixi.js"
import { ILinkStateTypes, INodeStateTypes } from "../renderer/types"
import { CanvasLink } from "./graph/links"
import { CanvasNode } from "./graph/nodes"
import { filerLinksOfNode } from "./graph/utils"
import { ICanvasItemProperties, ICanvasLink, ICanvasNode, IDataStore, IdString } from "./graph"
import { IDataStoreListeners, OnLinkGfxEventListener, OnNodeGfxEventListener, } from "./events/types"


/**
 * DataStore for managing nodes, links, paths etc 
 */
export class DataStore implements IDataStore {

  nodes: Map<IdString, CanvasNode>
  links: Map<IdString, CanvasLink>

  selectedNodes: Map<IdString, CanvasNode> = new Map()
  selectedLinks: Map<IdString, CanvasLink> = new Map()

  listeners: IDataStoreListeners

  constructor() {
    this.nodes = new Map()
    this.links = new Map()

    this.listeners = {
      "node:data:onAdded": [],
      "node:data:onDeleted": [],
      "node:data:onPropertiesUpdated": [],
      "node:data:onLinksUpdated": [],
    
      "link:data:onAdded": [],
      "link:data:onDeleted": [],
      "link:data:onPropertiesUpdated": [],
    
    
      "node:gfx:onStateUpdated": [],
      "link:gfx:onStateUpdated": [],  
    
      "node:gfx:onPointerIn": [],
      "node:gfx:onPointerOut": [],
      "node:gfx:onClicked": [],
      "node:gfx:onUnClicked": [],
      "node:gfx:onContextMenu": [],
      "node:gfx:onMoved": [],
    
      "link:gfx:onPointerIn": [],
      "link:gfx:onPointerOut": [],
      "link:gfx:onClicked": [],
      "link:gfx:onUnClicked": [],
      "link:gfx:onContextMenu": [],
      "link:gfx:onMoved": [],

    }
  }

  // Register event listeners
  on(event: keyof IDataStoreListeners, listener: OnNodeGfxEventListener | OnLinkGfxEventListener) {
    if (this.listeners[event]) {
      this.listeners[event].push(listener as any);
    } else {
      console.error(`Event "${event}" is not supported.`);
    }
  }

  // Remove event listeners
  off(event: keyof IDataStoreListeners, listener?: OnNodeGfxEventListener | OnLinkGfxEventListener | undefined) {
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

  addToHighlightedNodes(node: CanvasNode){
    this.selectedNodes.set(node.id, node)
  }

  removeFromHighlightedNodes(node: CanvasNode){
    this.selectedNodes.delete(node.id)
  }

  addToHighlightedLinks(link: CanvasLink){
    this.selectedLinks.set(link.id, link)
  }

  removeFromHighlightedLinks(link: CanvasLink){
    this.selectedLinks.delete(link.id)
  }



  addNode(node: ICanvasNode) {
    // update the properties if node already exist
    if (!this.nodes.has(node.id)) {
      const nodeInstance = new CanvasNode(node)
      this.nodes.set(node.id, nodeInstance);
      this.trigger('node:data:onAdded', { id: node.id, node: nodeInstance });
    } else {
      console.error(`Node with id "${node.id}" already exists.`);
    }
  }

  setState(item: CanvasNode | CanvasLink, stateName: INodeStateTypes | ILinkStateTypes, setNeighborsToo: boolean=false, event: FederatedPointerEvent) {
    console.log("setState called", item.id, stateName, setNeighborsToo)
    if (item instanceof CanvasNode) {
      // Handle CanvasNode instance
      const node = this.nodes.get(item.id)
      if (node) {
        node.state = stateName
        this.nodes.set(item.id, node)
        this.trigger("node:gfx:onStateUpdated", {id:node.id, node: node, state: stateName, setNeighborsToo: setNeighborsToo, event:event})
      }

    } else if (item instanceof CanvasLink) {
      const link = this.links.get(item.id)
      if (link) {
        link.state = stateName
        this.links.set(item.id, link)
        this.trigger("link:gfx:onStateUpdated", {id:link.id, link: link, state: stateName, setNeighborsToo:setNeighborsToo, event:event})
      }
    } else {
      // Handle other cases
      console.error("Item is neither CanvasNode nor CanvasLink");
    }
  }

  moveNodeTo(nodeId: IdString, x: number, y: number) {
    console.log("Updating position of node ", nodeId, x, y)
    const node: CanvasNode | undefined = this.nodes.get(nodeId);
    if (node) {
      node.x = x;
      node.y = y;
      // TODO - trigger new event callled node:
      this.nodes.set(nodeId, node)
      // node.gfxInstance?.setPosition(x, y);
      this.trigger('node:gfx:onMoved', { id: node.id, node: node });
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
    console.log("delete Node", nodeId)
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
      const links = filerLinksOfNode(nodeId, this.links)
      console.debug("====reCalcNodeLinks links", links)
      node.setLinks(links);
      node.setNeighbors(this.getNeighbors(nodeId))
      console.debug("====reCalcNodeLinks node.links", node.links)
      this.nodes.set(nodeId, node)
      this.trigger('node:data:onLinksUpdated', { id: node.id, node: node })
    } else {
      console.error(`${nodeId} doesnt exist in nodes, so can't reCalcNodeLinks`)
    }
  }

  addLink(link: ICanvasLink) {

    if (!this.links.has(link.id)) {

      // attach sourceInstance using sourceId
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

      // create CanvasLink
      const linkInstance = new CanvasLink(link)
      this.links.set(link.id, linkInstance);
      console.debug("====addLink", this.nodes, this.links)
      this.trigger('link:data:onAdded', { id: link.id, link: linkInstance });
      this.reCalcNodeLinks(linkInstance.source.id);
      this.reCalcNodeLinks(linkInstance.target.id);
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
    // let _this = this;
    // add nodes 
    nodes.forEach(node => this.addNode(node))

    // add links
    links.forEach(link => this.addLink(link))

    // // calculate links for the nodes
    // nodes.forEach(node => this.reCalcNodeLinks(node.id))

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

    filerLinksOfNode(nodeId, this.links).forEach(link => {
      neighborLinks.push(link);
      const source = this.nodes.get(link.source.id)
      if (source) {
        relatedNodes.set(link.source.id, source);
      }
      const target = this.nodes.get(link.target.id)
      if (target) {
        relatedNodes.set(link.target.id, target);
      }
    });
    const neighbors = { nodes: Array.from(relatedNodes.values()), links: neighborLinks };
    return neighbors
  }

}