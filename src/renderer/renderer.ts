import { CanvasLink, CanvasNode } from "../store";
import { ArtBoard } from "../artBoard/artBoard";
import TextureStore from "./textureStore";
import Circle from "./graphics/nodes/circle/circle";
import { Graphics } from "pixi.js";
import StraightLink from "./graphics/links/straight/straight";


export class Renderer {

  artBoard: ArtBoard
  textureStore: TextureStore

  constructor(artBoard: ArtBoard) {
    this.artBoard = artBoard
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
    const gfxInstance =  new Circle(node, this.artBoard)
    gfxInstance.draw()     
    console.debug("Renderer.renderNode after .draw triggered ", node, gfxInstance)
    this.artBoard.viewport.addChild(gfxInstance.containerGfx)
    // _this.canvas.layers.addToDataLayer(node, LAYER_GRAPHICS_TYPES_CONSTANTS.NODES)
  }

  renderLink(link: CanvasLink) {
    console.debug("Renderer.renderLink triggered ", link)
    const gfxInstance =  new StraightLink(link, this.artBoard)
    gfxInstance.draw()     
    console.debug("Renderer.renderLink after .draw triggered ", link, gfxInstance)
    this.artBoard.viewport.addChild(gfxInstance.containerGfx)
      // _this.canvas.layers.addToDataLayer(node, LAYER_GRAPHICS_TYPES_CONSTANTS.NODES)
  }

  clear() {
    console.debug("Renderer.clear triggered ")
    // this.canvas.layers.clear()
  }

} 