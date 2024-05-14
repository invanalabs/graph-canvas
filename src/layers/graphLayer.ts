import { Container, Graphics } from "pixi.js";
import { LayerGfxTypes, LayerTypes } from "./types";
import {LAYER_GRAPHICS_TYPES_CONSTANTS} from "./constants";
import CanvasLayers from ".";


export default class GraphLayer {

    /*
        This is used for data, annotations and front canvasLayer 
    */

    canvasLayer: CanvasLayers
    baseLayer : Container

    nodeGfxLayer: Container
    linkGfxLayer: Container


    constructor(canvasLayer: CanvasLayers, layerName: LayerTypes){
        this.canvasLayer = canvasLayer;
        // base layer 
        this.baseLayer = new Container();
        this.baseLayer.name = layerName
        // for nodes and links layer
        this.nodeGfxLayer = this.createLayer(LAYER_GRAPHICS_TYPES_CONSTANTS.NODES)
        this.linkGfxLayer = this.createLayer(LAYER_GRAPHICS_TYPES_CONSTANTS.LINKS)
        // add to viewport
        this.canvasLayer.canvas.viewport.addChild(this.baseLayer)
    }

    createLayer(LayerName: LayerGfxTypes){
        const layer = new Container();
        layer.name = LayerName
        this.baseLayer.addChild(layer)
        return layer
    }


    addNodeGfx(gfx: Graphics ) {
        this.nodeGfxLayer.addChild(gfx)
    }

    // addNodeLabelGfx(gfx: Graphics ) {
    //     this.nodeLabeslLayer.addChild(gfx)
    // }

    addLinkGfx(gfx: Graphics ) {
        this.linkGfxLayer.addChild(gfx)
    }

    // addLinkLabelGfx(gfx: Graphics ) {
    //     this.linkLabelsLayer.addChild(gfx)
    // }

    clearAll(){
        this.baseLayer.removeChildren()
    }
}