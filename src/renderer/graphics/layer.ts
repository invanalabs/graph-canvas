import { Container, Graphics } from "pixi.js"

export const LAYER_GRAPHICS_TYPES_CONSTANTS = {
  NODES: "NODES",
  LINKS: "LINKS"
}


export class GraphicsLayer {

  layerName: string

  baseLayer: Container
  nodeGfxLayer: Container
  linkGfxLayer: Container


  constructor(layerName: string, zIndexStartsAt: number) {
    this.layerName = layerName
    this.baseLayer = this.createLayer(layerName, zIndexStartsAt) // add this to this.artBoard.viewport
    // for nodes and links layer
    this.linkGfxLayer = this.createLayer(this.getLinksLayerName(), zIndexStartsAt + 1)
    this.baseLayer.addChild(this.linkGfxLayer)
    this.nodeGfxLayer = this.createLayer(this.getNodesLayerName(), zIndexStartsAt + 2)
    this.baseLayer.addChild(this.nodeGfxLayer)
  }


  createLayer(LayerName: string, zIndex: number) {
    const layer = new Container()
    layer.name = LayerName
    layer.zIndex = zIndex
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
    this.linkGfxLayer.removeChildren();
    this.nodeGfxLayer.removeChildren();
  }


  addNodeGfx(gfx: Graphics) {

    // gfx.parentLayer = this.nodeGfxLayer
    this.nodeGfxLayer.addChild(gfx)
    // this.canvasLayers.canvas.viewport.addChild(gfx)
  }

  removeNodeGfx(gfx: Graphics) {
    this.nodeGfxLayer.removeChild(gfx.name)
  }

  // addNodeLabelGfx(gfx: Graphics ) {
  //     this.nodeLabeslLayer.addChild(gfx)
  // }

  addLinkGfx(gfx: Graphics) {
    // gfx.parentLayer = this.linkGfxLayer
    this.linkGfxLayer.addChild(gfx)
    // this.canvasLayers.canvas.viewport.addChild(gfx)
  }

  removeLinkGfx(gfx: Graphics) {
    // if (gfx.name){
      this.linkGfxLayer.removeChild(gfx.name)
    // }
  }

}

