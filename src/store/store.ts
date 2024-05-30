import { CanvasLink } from "./graph/links"
import { CanvasNode } from "./graph/nodes"
import {
  ICanvasLink, ICanvasNode, IdString, IDataStore,
  IDataStoreListeners, NodeEventListener, LinkEventListener,
  ICanvasItemProperties,
} from "./graph/types"
import { filerLinksOfNode } from "./graph/utils"


/**
 * DataStore for managing nodes, links, paths etc 
 */
export class DataStore implements IDataStore {

  nodes: Map<IdString, CanvasNode>
  links: Map<IdString, CanvasLink>

  listeners: IDataStoreListeners

  constructor() {
    this.nodes = new Map()
    this.links = new Map()

    this.listeners = {
      nodeAdded: [],
      "nodeUpdated:links": [],
      "nodeUpdated:properties": [],
      nodeDeleted: [],
      linkAdded: [],
      "linkUpdated:properties": [],
      linkDeleted: []
    }
  }

  // Register event listeners
  on(event: keyof IDataStoreListeners, listener: NodeEventListener | LinkEventListener) {
    if (this.listeners[event]) {
      this.listeners[event].push(listener as any);
    } else {
      console.error(`Event "${event}" is not supported.`);
    }
  }

  // Remove event listeners
  off(event: keyof IDataStoreListeners, listener?: NodeEventListener | LinkEventListener | undefined) {
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

  addNode(node: ICanvasNode) {
    // update the properties if node already exist
    if (!this.nodes.has(node.id)) {
      const nodeInstance = new CanvasNode(node)
      this.nodes.set(node.id, nodeInstance);
      this.trigger('nodeAdded', { id: node.id, node: nodeInstance });
    } else {
      console.error(`Node with id "${node.id}" already exists.`);
    }
  }

  updateNodeProperties(nodeId: IdString, properties: ICanvasItemProperties) {
    let node = this.nodes.get(nodeId);
    if (node) {
      node?.updateProperties(properties)
      this.nodes.set(nodeId, node)
      this.trigger('nodeUpdated:properties', { id: nodeId, node: node, updatedProperties: properties });
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
      this.trigger('nodeDeleted', { id: nodeId, node });
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
      this.trigger('nodeUpdated:links', {id: node.id, node: node})
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
      this.trigger('linkAdded', { id: link.id, link: linkInstance });
      this.reCalcNodeLinks(linkInstance.source.id);
      this.reCalcNodeLinks(linkInstance.target.id);
    } else {
      console.error(`Link with key "${link.id}" already exists.`);
    }

  }

  updateLinkProperties(linkId: IdString, properties: ICanvasItemProperties) {
    let link = this.links.get(linkId);
    if (link) {
      link?.updateProperties(properties)
      this.links.set(linkId, link)
      this.trigger('linkUpdated:properties', { id: linkId, link: link, updatedProperties: properties });
    } else {
      console.error(`Link with key "${linkId}" does not exist.`);
    }
  }


  deleteLink(linkId: IdString) {
    const link = this.links.get(linkId);
    if (link) {
      this.links.delete(linkId);
      this.trigger('linkDeleted', { id: linkId, link });
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