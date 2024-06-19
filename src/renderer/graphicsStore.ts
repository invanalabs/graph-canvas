import { ArtBoard } from "../artBoard"
import { Container } from "pixi.js"
import { CanvasLink, CanvasNode } from "../store"


export default class GraphicsStore {

  nodeGfxMap: Map<string, Container>
  linkGfxMap: Map<string, Container>
  artBoard: ArtBoard
 
  constructor(artBoard: ArtBoard) {
    this.artBoard = artBoard
    this.nodeGfxMap = new Map()
    this.linkGfxMap = new Map()
  }

  createNodeGfx(node: CanvasNode){

  }

  createLinkGfx(link: CanvasLink){

  }
  
 
}