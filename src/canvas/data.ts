import Circle from "../graphics/nodes/circle";
import { CanvasLink, CanvasNode, IdString } from "../graphics/types";
import GraphCanvas from "./canvas";



export default class GraphData {
    
    nodes: WeakMap<IdString, CanvasNode>
    links: WeakMap<IdString, CanvasLink>
    canvas: GraphCanvas

    constructor(canvas: GraphCanvas) {
        this.canvas =canvas
        this.nodes = new WeakMap()
        this.links = new WeakMap()
    }

    add(nodes: Array<CanvasNode>, links: Array<CanvasLink>) {
        const _this = this; 
        nodes.forEach(node=> {
            const circleShape1 = new Circle(node)
            circleShape1.draw()
            _this.canvas.addGfx2Canvas(circleShape1) 
        })

        links.forEach(link=>{
            // const circleShape1 = new Circle(node)
            // circleShape1.draw()
            // canvas.addGfx2Canvas(circleShape1) 
        })
    }

    update(nodes: Array<CanvasNode>, links: Array<CanvasLink>) {

    }

    delete(nodes: Array<IdString>, links: Array<IdString>) {

    }

}