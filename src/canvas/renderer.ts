import Line from "../graphics/links/line";
import LoopLine from "../graphics/links/loop";
import QuadraticLine from "../graphics/links/quadratic";
import Circle from "../graphics/nodes/circle";
import { CanvasLink, CanvasNode, IdString } from "../graphics/types";
import GraphCanvas from "./canvas";

 

class Renderer {

    canvas: GraphCanvas;

    constructor(canvas: GraphCanvas) {
        this.canvas = canvas;
    }

    rerender(){
        const links = this.canvas.graph.getLinks();
        const nodes = this.canvas.graph.getNodes();
        this.render(nodes, links);
    }

    tick(){
        this.canvas.camera.fitView()
        this.rePositionNodes(this.canvas.graph.getNodes());
        this.reRenderLinks(this.canvas.graph.getLinks())
        // this.renderScreenBorderIfRequired();
    }


    // rePositionSingleNode(nodeId: IdString, x: number, y: number){
    //     this.gfxContainer.position.set(x, y);
    // }

    rePositionNodes(nodes: CanvasNode[]){
        nodes.forEach((node: CanvasNode) => {
            let { x, y } = node;
            // TODO - FIXME - next 2 lines are re-used
            if (x && y ){
                this.canvas.graph.moveNodeTo(node.id, x, y)
            }
        });
        // this.renderScreenBorderIfRequired()
    }

    reRenderLinks(links: CanvasLink[]){
        // const _this = this;
        links.forEach((link: CanvasLink)=>{
            link.gfxInstance?.redraw(true, false);
        })
        // this.renderScreenBorderIfRequired()
    }

    createLinkGfx(link: CanvasLink) {
        // console.log("createLinkGfx triggered", JSON.stringify(link))
        let gfxInstance;
        if (link.shape === "loop"){
            gfxInstance = new LoopLine(link, this.canvas)
            gfxInstance.draw()
        }
        else if (link.shape === "quadratic"){
            gfxInstance = new QuadraticLine(link, this.canvas)
            gfxInstance.draw()
        } 
        else{
            gfxInstance = new Line(link, this.canvas)
            gfxInstance.draw() 
        }
        return gfxInstance
    }


    createNodeGfx(node: CanvasNode){
        const gfxInstance =  new Circle(node, this.canvas)
        gfxInstance.draw()     
        return gfxInstance
    }

    // reRenderLink(link: CanvasLink){
    //     link.gfxInstance?.redraw()
    // }

    // renderScreenBorderIfRequired(){
    //     if (this.canvas.debug_mode) {
    //         this.canvas.screenBorderDraw();
    //     }else{
    //         this.canvas.screenBorderClear();
    //     }
    // }

    render = (nodes: CanvasNode[], links: CanvasLink[]) => {
        let _this = this;
        // render links 
        links.forEach((link: CanvasLink) => {
            if (!link.gfxInstance) {
                const gfxInstance = this.createLinkGfx(link)
                link.gfxInstance = gfxInstance
            }
            // else{
            //     link.gfxInstance.redraw()
            // }
            if (link.gfxInstance)
            _this.canvas.addGfx(link.gfxInstance)
        })
        
        // render nodes
        nodes.forEach((node: CanvasNode) => {
            if (!node.gfxInstance) {
                node.gfxInstance = this.createNodeGfx(node)
            }
            // else{
            //     node.gfxInstance.redraw()       
            // }
            _this.canvas.addGfx(node.gfxInstance);
        });
        // draw any debug
        // this.renderScreenBorderIfRequired();
    }

}

export default Renderer