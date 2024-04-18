import Line from "../graphics/links/line";
import Circle from "../graphics/nodes/circle";
import { CanvasLink, CanvasNode, IdString } from "../graphics/types";
import GraphCanvas from "./canvas";


export default class GraphData {
    
    nodes: Map<IdString, CanvasNode>
    links: Map<IdString, CanvasLink>
    canvas: GraphCanvas

    constructor(canvas: GraphCanvas) {
        this.canvas = canvas
        this.nodes = new Map()
        this.links = new Map()
    }

    add(nodes: Array<CanvasNode>, links: Array<CanvasLink>) {
        const _this = this; 
        console.log("adding nodes and links", this.nodes, this.links)

        nodes.forEach(node=> {
            if (_this.nodes.get(node.id)){
                throw new Error(`${node.id} already found in the nodes`)
            }
            _this.nodes.set(node.id, node)
        })

        links.forEach(link=>{
            if (typeof link.source !== 'object'){
                const sourceNode = this.nodes.get(link.source) 
                if (sourceNode){
                    link.source = sourceNode
                }else{
                    throw Error(`${link.source} not found in nodes: ${this.nodes} `)
                }
            }
            if (typeof link.target !== 'object'){
                const targetNode = this.nodes.get(link.target);
                if (targetNode){
                    link.target = targetNode
                }else{
                    throw Error(`${link.target} not found in node: ${this.nodes} `)
                }
            }
            _this.links.set(link.id, link)
        })

        this.canvas.renderer.render(nodes, links)
    }


    update(nodes: Array<CanvasNode>, links: Array<CanvasLink>) {

    }

    delete(nodes: Array<IdString>, links: Array<IdString>) {

    }

    updateNodePosition(nodeId: IdString, x: number, y: number){
        console.log("Updating position of node ", nodeId, x, y)     
        let node: CanvasNode | undefined = this.nodes.get(nodeId);
        if (node){
            node.x = x;
            node.y = y;
            node.gfxInstance?.gfxContainer.position.set(x, y);    
            // node.gfxInstance?.updatePosition(x, y)    
            this.nodes.set(nodeId, node)            
        }

    }

    getNodesByIds(nodeIds: IdString[]) {
        return this.getNodes().filter(node => nodeIds.includes(node.id));
    }

    getLinksByIds(linkIds: IdString[]) {
        return this.getLinks().filter(link => linkIds.includes(link.id));
    }
    
    getNodes(): CanvasNode[]{
        return Array.from(this.nodes.values())
    }

    getLinks(): CanvasLink[]{
        return Array.from(this.links.values())
    }

    getNeighborLinks(node:CanvasNode){
        return this.getLinks().filter(link => link.source.id === node.id || link.target.id  === node.id );
    }

}