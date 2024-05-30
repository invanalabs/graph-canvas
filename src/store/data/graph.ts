import { CanvasLink } from "./links"
import { CanvasNode } from "./nodes"
import {
  ICanvasLink, ICanvasNode, IdString, ICanvasData,
  ICanvasDataListeners, NodeEventListener, LinkEventListener,
  ICanvasItemProperties,
} from "./types"
import { filerLinksOfNode } from "./utils"


/**
 * CanvasData for managing nodes, links, paths etc 
 */
export class CanvasData implements ICanvasData {

  nodes: Map<IdString, CanvasNode>
  links: Map<IdString, CanvasLink>

  listeners: ICanvasDataListeners

  constructor() {
    this.nodes = new Map()
    this.links = new Map()

    this.listeners = {
      nodeAdded: [],
      nodeUpdated: [],
      "nodeUpdated:links": [],
      nodeDeleted: [],
      linkAdded: [],
      linkUpdated: [],
      linkDeleted: []
    }
  }

  // Register event listeners
  on(event: keyof ICanvasDataListeners, listener: NodeEventListener | LinkEventListener) {
    if (this.listeners[event]) {
      this.listeners[event].push(listener as any);
    } else {
      console.error(`Event "${event}" is not supported.`);
    }
  }

  // Remove event listeners
  off(event: keyof ICanvasDataListeners, listener?: NodeEventListener | LinkEventListener | undefined) {
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
  trigger(event: keyof ICanvasDataListeners, data: any) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(listener => listener(data));
    }
  }

  addNode(node: ICanvasNode) {
    // update the properties if node already exist
    if (!this.nodes.has(node.id)) {
      const nodeInstance = new CanvasNode(node)
      this.nodes.set(node.id, nodeInstance);
      this.trigger('nodeAdded', { key: node.id, properties: nodeInstance });
    } else {
      console.error(`Node with id "${node.id}" already exists.`);
    }
  }

  updateNode(nodeId: IdString, properties: ICanvasItemProperties) {
    if (this.nodes.has(nodeId)) {
      let node = this.nodes.get(nodeId);
      node?.updateProperties(properties)
      // node.
      this.trigger('nodeUpdated', { id: nodeId, node: node, updatedProperties: properties });
    } else {
      console.error(`Node with key "${nodeId}" does not exist.`);
    }
  }

  deleteNode(nodeId: IdString) {
    console.log("delete Node", nodeId)
    const _this = this;
    if (this.nodes.has(nodeId)) {
      const node = this.nodes.get(nodeId);
      // delete the links
      node?.links.forEach((link) => {
        _this.deleteLink(link.id)
      })
      // delete this node 
      this.nodes.delete(nodeId);
      this.trigger('nodeDeleted', { key: nodeId, node });
    } else {
      console.error(`Node with key "${nodeId}" does not exist. can't delete`);
    }
  }

  getNode(key: IdString) {
    return this.nodes.get(key);
  }

  private reCalcNodeLinks(nodeId: IdString){
    console.debug("reCalcNodeLinks", nodeId, this.links)
    let node = this.nodes.get(nodeId)
    if (node){
      const links = filerLinksOfNode(nodeId, this.links)
      console.debug("====reCalcNodeLinks links", links)
      node.setLinks(links);
      console.debug("====reCalcNodeLinks node.links", node.links)
      this.nodes.set(nodeId, node)
      this.trigger('nodeUpdated:links', {key: node.id, value: node})
    }else{
      console.error(`${nodeId} doesnt exist in nodes, so can't reCalcNodeLinks`)
    }
  }

  addLink(link: ICanvasLink) {

    if (!this.links.has(link.id)) {
      // attach sourceInstance using sourceId
      const sourceNode = this.nodes.get(link.sourceId)
      if (sourceNode) {
        //@ts-ignore
        link.source = sourceNode
      } else {
        throw Error(`${link.sourceId} not found in nodes: ${this.nodes} `)
      }
  
      // attach targetInstance using targetId
      const targetNode = this.nodes.get(link.targetId);
      if (targetNode) {
        //@ts-ignore
        link.target = targetNode
      } else {
        throw Error(`${link.targetId} not found in node: ${this.nodes} `)
      }
    
      // create CanvasLink
      const linkInstance = new CanvasLink(link)
      this.links.set(link.id, linkInstance);
      console.debug("====addLink", this.nodes, this.links)
      this.trigger('linkAdded', { key: link.id, value: linkInstance });
      this.reCalcNodeLinks(linkInstance.source.id);
      this.reCalcNodeLinks(linkInstance.target.id);
    } else {
      console.error(`Link with key "${link.id}" already exists.`);
    }

  }

  deleteLink(linkId: IdString) {
    const link = this.links.get(linkId);
    if (link) {
      this.links.delete(linkId);
      this.trigger('linkDeleted', { key: linkId, value: link });
      // recacl nodeLinks for the nodes of the link
      this.reCalcNodeLinks(link.source.id);
      this.reCalcNodeLinks(link.target.id);
    } else {
      console.error(`Link with key "${linkId}" does not exist.`);
    }
  }

  getNodes(): ICanvasNode[] {
    return Array.from(this.nodes.values())
  }

  getLinks(): ICanvasLink[] {
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

}