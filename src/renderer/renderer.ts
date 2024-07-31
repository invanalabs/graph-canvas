import { CanvasLink, CanvasNode } from "../store";
import { ArtBoard } from "../artBoard/artBoard";
import TextureStore from "./store/texture";
import Circle from "./shapes/nodes/circle/circle";
import { GraphicsStore } from "./store/graphics";
// import { LAYER_GRAPHICS_TYPES_CONSTANTS } from "./shapes/layer";
// import drawStraightLineShape from "./primitives/links/straightLine";
import StraightLine from "./shapes/links/lines/straightLine";
import CurvedLine from "./shapes/links/lines/curvedLine";
import BezierCurvedLine from "./shapes/links/lines/bezierCurvedLine";
import LoopLine from "./shapes/links/lines/loopLine";
import { LAYER_GRAPHICS_TYPES_CONSTANTS } from "./shapes/layer";


export class Renderer {

  artBoard: ArtBoard
  textureStore: TextureStore
  gfxStore: GraphicsStore

  constructor(artBoard: ArtBoard) {
    this.artBoard = artBoard
    this.gfxStore = new GraphicsStore(this.artBoard)
    this.textureStore = new TextureStore(this.artBoard)
  }

  render() {
    console.debug("Renderer.renderAll triggered ", this.artBoard.canvas.dataStore.getNodes())
    this.clear()
    const links = this.artBoard.canvas.dataStore.getLinks();
    const nodes = this.artBoard.canvas.dataStore.getNodes();
    this.renderSelection(nodes, links);
    this.artBoard.canvas.dataStore.updateMessage("Re-rendered the graphics ")
  }

  reRender(){
    this.render()
  }

  // hideAll(){
  //   // this.artBoard.pixiApp.stage.hi
  // }

  // showAll(){
    
  // }

  renderSelection = (nodes: CanvasNode[], links: CanvasLink[]) => {
    console.debug("Renderer.render triggered ", nodes, links)
    nodes.forEach((node: CanvasNode)=> this.renderNode(node))
    links.forEach((link: CanvasLink)=> this.renderLink(link))
  }

  renderNode(node: CanvasNode) {
    console.debug("Renderer.renderNode triggered ", node)
    const gfxInstance = new Circle(node, this.artBoard)
    gfxInstance.draw()
    console.debug("Renderer.renderNode after .draw triggered ", node, gfxInstance)
    this.artBoard.viewport.addChild(gfxInstance.containerGfx)
    // this.artBoard.renderer.gfxStore.addToDataLayer(node, LAYER_GRAPHICS_TYPES_CONSTANTS.NODES)
    // this.artBoard.cull.add(gfxInstance.containerGfx)
    // this.artBoard.updateCull()

    // _this.canvas.layers.addToDataLayer(node, LAYER_GRAPHICS_TYPES_CONSTANTS.NODES)
  }

  renderLink(link: CanvasLink) {
    console.debug("Renderer.renderLink triggered ", link)


    if (link.shapeName === "straightLine"){
      const gfxInstance = new StraightLine(link, this.artBoard)
      gfxInstance.draw()
      console.debug("Renderer.renderLink after .draw triggered ", link, gfxInstance)
      this.artBoard.viewport.addChild(gfxInstance.containerGfx)       
      // this.artBoard.renderer.gfxStore.addToDataLayer(link, LAYER_GRAPHICS_TYPES_CONSTANTS.LINKS)
 
    }
    else if (link.shapeName === "curvedLine"){
      const gfxInstance = new CurvedLine(link, this.artBoard)
      gfxInstance.draw()
      console.debug("Renderer.renderLink after .draw triggered ", link, gfxInstance)
      this.artBoard.viewport.addChild(gfxInstance.containerGfx)     
      // this.artBoard.renderer.gfxStore.addToDataLayer(link, LAYER_GRAPHICS_TYPES_CONSTANTS.LINKS)

    }
    else if (link.shapeName === "bezierCurvedLine"){
        const gfxInstance = new BezierCurvedLine(link, this.artBoard)
        gfxInstance.draw()
        console.debug("Renderer.renderLink after .draw triggered ", link, gfxInstance)
        this.artBoard.viewport.addChild(gfxInstance.containerGfx)      
        // this.artBoard.renderer.gfxStore.addToDataLayer(link, LAYER_GRAPHICS_TYPES_CONSTANTS.LINKS)

    }
    else if (link.shapeName === "loopLine"){
      const gfxInstance = new LoopLine(link, this.artBoard)
      gfxInstance.draw()
      console.debug("Renderer.renderLink after .draw triggered ", link, gfxInstance)
      this.artBoard.viewport.addChild(gfxInstance.containerGfx)      
      // this.artBoard.renderer.gfxStore.addToDataLayer(link, LAYER_GRAPHICS_TYPES_CONSTANTS.LINKS)

  }
    else{
      console.error(`there is no link with shapeName=${link.shapeName} to render for ${link.id}`)
    }
    // this.artBoard.cull.add(gfxInstance.containerGfx)
    // this.artBoard.updateCull()

  }

  tick() {
    // TODO - render the pending renderNode/renderLink requests

    this.rePositionNodes(this.artBoard.canvas.dataStore.getNodes());
    this.reRenderLinks(this.artBoard.canvas.dataStore.getLinks())
    // this.artBoard.camera.fitView()
    // this.renderScreenBorderIfRequired();
  }

  reRenderLinks(links: CanvasLink[]) {
    // const _this = this;
    links.forEach((link: CanvasLink) => {
      link.gfxInstance?.redraw(true, false);
    })
    // this.renderScreenBorderIfRequired()
  }

  rePositionNodes(nodes: CanvasNode[]) {
    nodes.forEach((node: CanvasNode) => {
      let { x, y } = node;
      // TODO - FIXME - next 2 lines are re-used
      if (x && y) {
        this.artBoard.canvas.dataStore.moveNodeTo(node.id, x, y)
      }
    });
    // this.renderScreenBorderIfRequired()
  }
  clear() {
    console.debug("Renderer.clear triggered ")
    this.artBoard.viewport.removeChildren()
    this.artBoard.canvas.dataStore.updateMessage("Cleared the graphics on canvas (data still persist).")
  }

} 