import { CanvasLink, CanvasNode } from "../store";
import { ArtBoard } from "../artBoard/artBoard";
import TextureStore from "./textureStore";


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


  }

  renderLink(link: CanvasLink) {
    console.debug("Renderer.renderLink triggered ", link)
  }

  clear() {
    console.debug("Renderer.clear triggered ")
    // this.canvas.layers.clear()
  }

} 