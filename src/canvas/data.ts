import Line from "../graphics/links/line";
import Circle from "../graphics/nodes/circle";
import { CanvasLink, CanvasNode, IdString } from "../graphics/types";
import GraphCanvas from "./canvas";


export default class GraphData {
    
    nodes: Map<IdString, CanvasNode>
    links: Map<IdString, CanvasLink>
    canvas: GraphCanvas

    constructor(canvas: GraphCanvas) {
        this.canvas =canvas
        this.nodes = new Map()
        this.links = new Map()
    }

    add(nodes: Array<CanvasNode>, links: Array<CanvasLink>) {
        const _this = this; 

    

        nodes.forEach(node=> {
      
            _this.nodes.set(node.id, node)


            const nodeShape = new Circle(node)
            nodeShape.draw()
            _this.canvas.addGfx(nodeShape) 
        })

        console.log("adding links", this.nodes, this.links)
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


            const linkShape = new Line(link)
            linkShape.draw()
            _this.canvas.addGfx(linkShape) 
        })
    }

    update(nodes: Array<CanvasNode>, links: Array<CanvasLink>) {

    }

    delete(nodes: Array<IdString>, links: Array<IdString>) {

    }

}