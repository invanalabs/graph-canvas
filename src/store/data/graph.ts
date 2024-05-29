import { ICanvasLink, ICanvasNode, IdString } from "./types"


/**
 * CanvasGraph for managing nodes, links, paths etc 
 */
export default class CanvasGraph {

  nodes: Map<IdString, ICanvasNode>
  links: Map<IdString, ICanvasLink>

  constructor() {
    this.nodes = new Map()
    this.links = new Map()
  }

  addNode(node: ICanvasNode) {
    // update the properties if node already exist
    this.nodes.set(node.id, node)
  }

  addLink(link: ICanvasLink) {

    if (typeof link.source !== 'object') {
      const sourceNode = this.nodes.get(link.source)
      console.log("====sourceNode", sourceNode)
      if (sourceNode) {
        link.source = sourceNode
      } else {
        throw Error(`${link.source} not found in nodes: ${this.nodes} `)
      }
    }
    if (typeof link.target !== 'object') {
      const targetNode = this.nodes.get(link.target);
      console.log("====targetNode", targetNode)
      if (targetNode) {
        link.target = targetNode
      } else {
        throw Error(`${link.target} not found in node: ${this.nodes} `)
      }
    }
    this.links.set(link.id, link)

  }

  private calcDegreeOfNode(nodeId: IdString) {
    let incoming: number = 0;
    let outgoing: number = 0;
    this.links.forEach((link) => {
      //@ts-ignore
      if (link.source.id === nodeId) {
        outgoing++
      }
      //@ts-ignore  
      if (link.target.id === nodeId) {
        incoming++
      }
    })
    return { incoming, outgoing }
  }

  filerLinksOfNode(node: ICanvasNode): ICanvasLink[]{
    //@ts-ignore
    return [...this.links.values()].filter((_, link)=>{link.source.id === node.id || link.target.id === node.id})
  }

  private calculateNodeLinks(links: ICanvasLink[]) {
    /**
     * This will calculate edges for the nodes 
     */
    let _this = this;
    let nodeIds: Array<string> = []
    //@ts-ignore
    nodeIds = [...new Set(links.map(link => [link.source.id, link.target.id]).flat(2))]
    nodeIds.forEach(nodeId => {
      let node = _this.nodes.get(nodeId)
      if (node) {
        // calc degree
        node.degree = _this.calcDegreeOfNode(node.id)
        // calc links
        node.links = _this.filerLinksOfNode(node)

        _this.nodes.set(node.id, node)
      }

    })
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

    // calculate links for the nodes
    this.calculateNodeLinks(links)
  }

}