import { CanvasLink, CanvasNode } from "../store";
import { ArtBoard } from "./artBoard";


export class Renderer {

  artBoard: ArtBoard

  constructor(artBoard: ArtBoard) {
    this.artBoard = artBoard
  }

  renderAll() {
    console.debug("Renderer.renderAll triggered ")
    // const links = this.canvas.dataStore.getLinks();
    // const nodes = this.canvas.dataStore.getNodes();
    // this.render(nodes, links);
  }

  render = (nodes: CanvasNode[], links: CanvasLink[]) => {
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