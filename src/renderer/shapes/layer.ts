import { Container, Graphics } from "pixi.js"
import { ArtBoard } from "../../artBoard"
import { ILayerItemTypes } from "../store/graphics"

export const LAYER_GRAPHICS_TYPES_CONSTANTS: {NODES: ILayerItemTypes, LINKS: ILayerItemTypes} = {
  NODES: "NODES",
  LINKS: "LINKS"
}


export class GraphicsLayer {

  layerName: string
  artBoard : ArtBoard

  // baseLayer: Container
  nodeGraphics: Container
  linkGraphics: Container


  constructor(artBoard: ArtBoard,  layerName: string, zIndexStartsAt: number) {
    this.layerName = layerName
    this.artBoard = artBoard
    // console.log("===this.artBoard.viewport.", this.artBoard.viewport)
    // this.baseLayer = this.createLayer(layerName, zIndexStartsAt) // add this to this.artBoard.viewport
    // for nodes and links layer
    this.linkGraphics = this.createLayer(this.getLinksLayerName(), zIndexStartsAt + 1)
    this.artBoard.viewport.addChild(this.linkGraphics)
    // this.artBoard.pixiApp.stage.addChild(this.linkGraphics)
    
    this.nodeGraphics = this.createLayer(this.getNodesLayerName(), zIndexStartsAt + 2)
    this.artBoard.viewport.addChild(this.nodeGraphics)
    // this.artBoard.pixiApp.stage.addChild(this.nodeGraphics)
  }


  createLayer(LayerName: string, zIndex: number) {
    const layer = new Container({
      isRenderGroup:true // this containers transform is now handled on the GPU!
    })
    layer.name = LayerName
    layer.zIndex = zIndex
    layer.interactive = true
    // this.baseLayer.addChild(layer)
    return layer
  }

  getNodesLayerName() {
    return this.layerName + "-" + LAYER_GRAPHICS_TYPES_CONSTANTS.NODES;
  }

  getLinksLayerName() {
    return this.layerName + "-" + LAYER_GRAPHICS_TYPES_CONSTANTS.LINKS;
  }

  clear() {
    this.linkGraphics.removeChildren();
    this.nodeGraphics.removeChildren();
  }


  addNodeGfx(gfx: Graphics) {

    // gfx.parentLayer = this.nodeGraphics
    this.nodeGraphics.addChild(gfx)
    // this.canvasLayers.canvas.viewport.addChild(gfx)
  }

  removeNodeGfx(gfx: Graphics) {
    this.nodeGraphics.removeChild(gfx)
  }

  // addNodeLabelGfx(gfx: Graphics ) {
  //     this.nodeLabeslLayer.addChild(gfx)
  // }

  addLinkGfx(gfx: Graphics) {
    // gfx.parentLayer = this.linkGraphics
    this.linkGraphics.addChild(gfx)
    // this.canvasLayers.canvas.viewport.addChild(gfx)
  }

  removeLinkGfx(gfx: Graphics) {
    // if (gfx.name){
      this.linkGraphics.removeChild(gfx)
    // }
  }

}

