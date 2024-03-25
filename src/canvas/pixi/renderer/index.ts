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
        
        // this.canvas.fitView()
        this.canvas.stateCtrl.nodes.forEach((node: INode) => {
            let { x, y } = node;
            // TODO - next 2 lines are re-used
            this.canvas.stateCtrl.updateNodePosition(node.id, x, y)
            node.shapeInstance?.updatePosition(x, y)
            // shapeGfx?.position.set(x, y);
        });

        this.canvas.stateCtrl.links.forEach((link: ILink) => {
            // let { source, target } = link;
            // redraw the links 
            link.shapeInstance?.redraw()
        });
        this.renderScreenBorderIfRequired();

    }

    renderScreenBorderIfRequired(){
        
        if (this.canvas.debug_mode) {
            this.canvas.screenBorderDraw();
        }else{
            this.canvas.screenBorderClear();
        }
    }



    render = () => {
        // clear canvas 
        // this.canvas.clear();

        // NOTE - 

        let _this = this;

        // add data to store 

        // clear canvas

        this.canvas.clear();


        // render links 
        const links = this.canvas.stateCtrl.getLinks();
        links.forEach((link: ILink) => {
            if (!link.shapeInstance) {
                const shapeInstance = new LinkShape(this.canvas)
                link.shapeInstance = shapeInstance
            }
            const gfx = link.shapeInstance.draw(link)
            _this.canvas.addShape(gfx)

        })
        
        // render nodes
        const nodes = this.canvas.stateCtrl.getNodes();
        nodes.forEach((node: INode) => {
            if (!node.shapeInstance) {
                const shapeInstance =  new Circle(this.canvas)
                node.shapeInstance = shapeInstance          
            }
            const gfx = node.shapeInstance.draw(node)
            _this.canvas.addShape(gfx);
        });
        // set canvas events
 
        // draw any debug
        this.renderScreenBorderIfRequired();
    }




}

export default PIXIRenderer