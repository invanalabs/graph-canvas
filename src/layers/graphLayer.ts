import { Container, Graphics } from "pixi.js";
import { LayerGfxTypes, LayerTypes } from "./types";
import {LAYER_GRAPHICS_TYPES_CONSTANTS} from "./constants";
import CanvasLayers from ".";


export default class GraphLayer {

    /*
        This is used for data, annotations and front layers 
    */

    layers: CanvasLayers
    baseLayer : Container

    nodeShapesLayer: Container
    nodeLabeslLayer: Container

    linkShapesLayer: Container
    linkLabelsLayer: Container


    constructor(layers: CanvasLayers, layerName: LayerTypes){
        this.layers = layers;

        // base layer 
        this.baseLayer = new Container();
        this.baseLayer.name = layerName
        this.layers.viewport.addChild(this.baseLayer)

        // for nodes
        this.nodeShapesLayer = this.createLayer(LAYER_GRAPHICS_TYPES_CONSTANTS.NODE_SHAPES)
        this.nodeLabeslLayer = this.createLayer(LAYER_GRAPHICS_TYPES_CONSTANTS.NODE_LABELS)

        // for links
        this.linkShapesLayer = this.createLayer(LAYER_GRAPHICS_TYPES_CONSTANTS.LINK_SHAPES)
        this.linkLabelsLayer = this.createLayer(LAYER_GRAPHICS_TYPES_CONSTANTS.LINK_LABELS)

    }

    createLayer(LayerName: LayerGfxTypes){
        const layer = new Container();
        layer.name = LayerName
        this.baseLayer.addChild(layer)
        return layer
    }


    addNodeShapeGfx(gfx: Graphics ) {
        this.nodeShapesLayer.addChild(gfx)
    }

    addNodeLabelGfx(gfx: Graphics ) {
        this.nodeLabeslLayer.addChild(gfx)
    }

    addLinkShapeGfx(gfx: Graphics ) {
        this.linkShapesLayer.addChild(gfx)
    }

    addLinkLabelGfx(gfx: Graphics ) {
        this.linkLabelsLayer.addChild(gfx)
    }

    clearAll(){
        this.baseLayer.removeChildren()
    }
}