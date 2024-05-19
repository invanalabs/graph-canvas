import { Graphics } from "pixi.js";
import { LayerGfxTypes, LayerTypes } from "./types";
import {LAYER_GRAPHICS_TYPES_CONSTANTS} from "./constants";
import CanvasLayers from ".";
import { Layer } from '@pixi/layers';


export default class GraphLayer {

    /*
        This is used for data, annotations and front canvasLayers 
    */
    layerName : string
    canvasLayers: CanvasLayers
    baseLayer : Layer

    nodeGfxLayer: Layer
    linkGfxLayer: Layer


    constructor(canvasLayers: CanvasLayers, layerName: LayerTypes, zIndexStartsAt: number){
        this.canvasLayers = canvasLayers;
        this.layerName = layerName;
        // base layer 
        this.baseLayer = this.createLayer(layerName, zIndexStartsAt);

        // for nodes and links layer
        this.linkGfxLayer = this.createLayer(this.getLinksLayerName(), zIndexStartsAt+ 1)
        this.nodeGfxLayer = this.createLayer(this.getNodesLayerName(), zIndexStartsAt + 2)
        
        // add to nodes and links layers to base layer
        this.baseLayer.addChild(this.linkGfxLayer)
        this.baseLayer.addChild(this.nodeGfxLayer)

    }

    getNodesLayerName(){
        return this.layerName + "-" +LAYER_GRAPHICS_TYPES_CONSTANTS.NODES;
    }

    getLinksLayerName(){
        return this.layerName + "-" +LAYER_GRAPHICS_TYPES_CONSTANTS.LINKS;
    }

    createLayer(LayerName: LayerGfxTypes, zIndex: number){
        const layer = this.canvasLayers.canvas.viewport.addChild(new Layer());
        layer.name = LayerName
        layer.zIndex = zIndex
        // this.baseLayer.addChild(layer)
        return layer
    }


    addNodeGfx(gfx: Graphics ) {

        gfx.parentLayer = this.nodeGfxLayer
        this.nodeGfxLayer.addChild(gfx)
        // this.canvasLayers.canvas.viewport.addChild(gfx)
    }

    removeNodeGfx(gfx: Graphics) {
        this.nodeGfxLayer.removeChild(gfx.name)
    }

    // addNodeLabelGfx(gfx: Graphics ) {
    //     this.nodeLabeslLayer.addChild(gfx)
    // }

    addLinkGfx(gfx: Graphics ) {
        gfx.parentLayer = this.linkGfxLayer
        this.linkGfxLayer.addChild(gfx)
        // this.canvasLayers.canvas.viewport.addChild(gfx)
    }

    removeLinkGfx(gfx: Graphics){
        this.linkGfxLayer.removeChild(gfx.name)
    }

    // addLinkLabelGfx(gfx: Graphics ) {
    //     this.linkLabelsLayer.addChild(gfx)
    // }

    // clearAll(){
    //     // this.baseLayer.removeChildren()
    // }
}