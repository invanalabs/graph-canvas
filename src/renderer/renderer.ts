// import GraphCanvas from "../canvas";
// import { ICanvasLink, ICanvasNode } from "../data";
// import { LAYER_GRAPHICS_TYPES_CONSTANTS } from "./defaults";
 

// class Renderer {

//     canvas: GraphCanvas;

//     constructor(canvas: GraphCanvas) {
//         this.canvas = canvas;
//     }

//     rerender(){
//         const links = this.canvas.data.getLinks();
//         const nodes = this.canvas.data.getNodes();
//         this.render(nodes, links);
//     }

//     clear() {
//         console.debug("Renderer.clear triggered ")
//         this.canvas.layers.clear()
//     }

//     tick(){
//         this.canvas.camera.fitView()
//         this.rePositionNodes(this.canvas.graph.getNodes());
//         this.reRenderLinks(this.canvas.graph.getLinks())
//         // this.renderScreenBorderIfRequired();
//     }


//     // rePositionSingleNode(nodeId: IdString, x: number, y: number){
//     //     this.gfxContainer.position.set(x, y);
//     // }

//     rePositionNodes(nodes: ICanvasNode[]){
//         nodes.forEach((node: ICanvasNode) => {
//             let { x, y } = node;
//             // TODO - FIXME - next 2 lines are re-used
//             if (x && y ){
//                 this.canvas.graph.moveNodeTo(node.id, x, y)
//             }
//         });
//         // this.renderScreenBorderIfRequired()
//     }

//     reRenderLinks(links: ICanvasLink[]){
//         // const _this = this;
//         links.forEach((link: ICanvasLink)=>{
//             link.gfxInstance?.redraw(true, false);
//         })
//         // this.renderScreenBorderIfRequired()
//     }

//     createLinkGfx(link: ICanvasLink) {
//         // console.log("createLinkGfx triggered", JSON.stringify(link))
//         let gfxInstance;
//         if (link.shapeName === "loop"){
//             gfxInstance = new LoopLine(link, this.canvas)
//             gfxInstance.draw()
//         }
//         else if (link.shapeName === "quadratic"){
//             gfxInstance = new QuadraticLine(link, this.canvas)
//             gfxInstance.draw()
//         } 
//         else{
//             gfxInstance = new Line(link, this.canvas)
//             gfxInstance.draw() 
//         }
//         return gfxInstance
//     }


//     createNodeGfx(node: ICanvasNode){
//         const gfxInstance =  new Circle(node, this.canvas)
//         gfxInstance.draw()     
//         return gfxInstance
//     }

//     // reRenderLink(link: ICanvasLink){
//     //     link.gfxInstance?.redraw()
//     // }

//     // renderScreenBorderIfRequired(){
//     //     if (this.canvas.debug_mode) {
//     //         this.canvas.screenBorderDraw();
//     //     }else{
//     //         this.canvas.screenBorderClear();
//     //     }
//     // }

//     render = (nodes: ICanvasNode[], links: ICanvasLink[]) => {
//         let _this = this;
//         // render links 
//         links.forEach((link: ICanvasLink) => {
//             if (!link.gfxInstance) {
//                 const gfxInstance = this.createLinkGfx(link)
//                 link.gfxInstance = gfxInstance
//             }
//             if (link.gfxInstance)
//             _this.canvas.layers.addToDataLayer(link, LAYER_GRAPHICS_TYPES_CONSTANTS.LINKS)

//         })
        
//         // render nodes
//         nodes.forEach((node: ICanvasNode) => {
//             if (!node.gfxInstance) {
//                 node.gfxInstance = this.createNodeGfx(node)
//             }
//             _this.canvas.layers.addToDataLayer(node, LAYER_GRAPHICS_TYPES_CONSTANTS.NODES)

//         });
//         // draw any debug
//         // this.renderScreenBorderIfRequired();
//     }

// }

// export default Renderer