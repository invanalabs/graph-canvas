import { CanvasLink, CanvasNode } from "../store";
import { ArtBoard } from "../artBoard/artBoard";
import TextureStore from "./store/texture";
import Circle from "./shapes/nodes/circle/circle";
import StraightLink from "./shapes/links/straight/straight";
import { GraphicsStore } from "./store/graphics";
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

  renderAll() {
    console.debug("Renderer.renderAll triggered ")
    const links = this.artBoard.canvas.dataStore.getLinks();
    const nodes = this.artBoard.canvas.dataStore.getNodes();
    this.renderSelection(nodes, links);
  }

  renderSelection = (nodes: CanvasNode[], links: CanvasLink[]) => {
    console.debug("Renderer.render triggered ", nodes, links)
  }

  renderNode(node: CanvasNode) {
    console.debug("Renderer.renderNode triggered ", node)
    const gfxInstance = new Circle(node, this.artBoard)
    gfxInstance.draw()
    console.debug("Renderer.renderNode after .draw triggered ", node, gfxInstance)
    this.artBoard.viewport.addChild(gfxInstance.containerGfx)
    // this.artBoard.renderer.gfxStore.addToDataLayer(node, LAYER_GRAPHICS_TYPES_CONSTANTS.NODES)
    this.artBoard.cull.add(gfxInstance.containerGfx)

    // _this.canvas.layers.addToDataLayer(node, LAYER_GRAPHICS_TYPES_CONSTANTS.NODES)
  }

  renderLink(link: CanvasLink) {
    console.debug("Renderer.renderLink triggered ", link)
    const gfxInstance = new StraightLink(link, this.artBoard)
    gfxInstance.draw()
    console.debug("Renderer.renderLink after .draw triggered ", link, gfxInstance)
    this.artBoard.viewport.addChild(gfxInstance.containerGfx)
    // this.artBoard.renderer.gfxStore.addToDataLayer(link, LAYER_GRAPHICS_TYPES_CONSTANTS.LINKS)
    this.artBoard.cull.add(gfxInstance.containerGfx)

  }

  tick() {
    this.artBoard.camera.fitView()
    this.rePositionNodes(this.artBoard.canvas.dataStore.getNodes());
    this.reRenderLinks(this.artBoard.canvas.dataStore.getLinks())
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
  }

} 