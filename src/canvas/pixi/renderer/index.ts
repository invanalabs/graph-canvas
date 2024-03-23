import Canvas from "..";
import { ILink, INode } from "../../../graphCanvas/types";
import StateCtrl from "../../../state/model";
import LinkShape from "./structures/links";
import Circle from "./structures/nodes/circle";



class PIXIRenderer {


    canvas: Canvas;

    constructor(canvas: Canvas) {
        this.canvas = canvas;
    }

    rerender(){
        this.render()
    }

    tick(){
        
        this.canvas.fitView()
        this.canvas.stateCtrl.nodes.forEach((node: INode) => {
            let { x, y } = node;
            this.canvas.stateCtrl.updateNodePosition(node.id, x, y)
            node.shapeInstance.updatePosition(x, y)
            // shapeGfx?.position.set(x, y);
        });

        this.canvas.stateCtrl.links.forEach((link: ILink) => {
            // let { source, target } = link;
            // redraw the links 
            link.shapeInstance.redraw()
        });

        this.canvas.screenBorderDraw();
    }

    render = () => {
        // clear canvas 
        // this.canvas.clear();

        // NOTE - 

        let _this = this;

        // add data to store 

        // clear canvas
        // this.viewport.removeChildren(); // fix this 


        // render links 
        const links = this.canvas.stateCtrl.getLinks();
        links.map((link: ILink) => {
            // const shapeGfx = link.shapeGfx ? link.shapeGfx: new LinkShape(this.canvas).draw()
            if (!link.shapeGfx) {
                // const shapeContainer = new
                const shapeInstance = new LinkShape(this.canvas)
                link.shapeInstance = shapeInstance
                link.shapeGfx = shapeInstance.draw(link)
                _this.canvas.addShape(link.shapeGfx)
            }
        })
        
        // render nodes
        const nodes = this.canvas.stateCtrl.getNodes();
        nodes.map((node: INode) => {
            if (!node.shapeGfx) {
                const shapeInstance = new Circle(this.canvas)
                node.shapeInstance = shapeInstance
                node.shapeGfx = shapeInstance.draw(node)
                _this.canvas.addShape(node.shapeGfx);
            }
        });




        // set canvas events

        // // add to graphology
        // nodes.forEach((node: INode) => {
        //     _this.graphData.addNode(node.id, node);
        // });

        // draw any debug
        this.canvas.fitView();

        if (this.canvas.debug_mode) {
            this.canvas.screenBorderDraw();
        }else{
            this.canvas.screenBorderClear();
        }
    }



}

export default PIXIRenderer