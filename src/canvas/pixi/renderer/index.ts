import Canvas from "..";
import { ILink, INode } from "../../../graphCanvas/types";
import StateCtrl from "../../../state/model";
import Circle from "./structures/nodes/circle";



class PIXIRenderer {


    canvas: Canvas;

    constructor(canvas: Canvas){
        this.canvas = canvas;
    }
    
 
    render = () => {
        let _this = this;

                // add data to store 

                // clear canvas
                // this.viewport.removeChildren(); // fix this 
        
                // render nodes 
        
                // render links 
        
                // set canvas events
        
                // // add to graphology
                // nodes.forEach((node: INode) => {
                //     _this.graphData.addNode(node.id, node);
                // });
        
                // render nodes
                this.canvas.stateCtrl.nodes.map((node: INode) => {
                    if (!node.shapeGfx) {
                        const shapeContainer = new Circle(this.canvas)
                        node.shapeGfx = shapeContainer.draw(node)
                        _this.canvas.addShape(node.shapeGfx);
                     }
                });
        
                // render links 
                this.canvas.stateCtrl.links.map((link: ILink) => {
                    if (link.shapeGfx) {
                        // const shapeContainer = new
                    }
                })
    }

    

}

export default PIXIRenderer