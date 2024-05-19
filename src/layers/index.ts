import GraphCanvas from "../canvas/canvas";
import GraphLayer from "./graphLayer";
import { Container, Graphics } from "pixi.js";
import { CanvasLayersOptions, LayerGfxTypes, LayerTypes } from "./types";
import { LAYER_TYPES_CONSTANTS, LAYER_GRAPHICS_TYPES_CONSTANTS } from "./constants";
import BaseShape from "../graphics/base";
import { NodeShapeBase } from "../graphics/nodes/base";
import { LinkShapeBase } from "../graphics/links/base";
import { CanvasLink, CanvasNode } from "../graphics/types";



export default class CanvasLayers {
    // canvas
    canvas: GraphCanvas
    // viewport: Viewport
    // layer
    geoLayer: GraphLayer
    frontLayer: GraphLayer
    dataLayer: GraphLayer
    annotationLayer: GraphLayer

    constructor(options: CanvasLayersOptions ) {
        this.canvas = options.canvas;
        // create layers
        // z-index from 0
        this.geoLayer = new GraphLayer(this, LAYER_TYPES_CONSTANTS.MAP, 0);
        // z-index from 5
        this.dataLayer = new GraphLayer(this, LAYER_TYPES_CONSTANTS.DATA, 5);
        // z-index from 10
        this.annotationLayer = new GraphLayer(this, LAYER_TYPES_CONSTANTS.ANNOTATIONS, 10);
        // z-index from 15
        this.frontLayer = new GraphLayer(this, LAYER_TYPES_CONSTANTS.FRONT, 15);

    }

    createLayer(LayerName: LayerTypes) {
        const layer = new Container();
        layer.name = LayerName;
        this.canvas.viewport.addChild(layer)
        return layer
    }

    private addGfxToLayer(item: CanvasNode | CanvasLink, gfxType: LayerGfxTypes,  layer: GraphLayer){
        if (gfxType === LAYER_GRAPHICS_TYPES_CONSTANTS.NODES){
            item.layer = layer.nodeGfxLayer.name
            layer.addNodeGfx(item.gfxInstance.gfxContainer)
        }
        else if (gfxType === LAYER_GRAPHICS_TYPES_CONSTANTS.LINKS){
            item.layer = layer.nodeGfxLayer.name
            layer.addLinkGfx(item.gfxInstance.gfxContainer)
        }
        else{
            console.error(`Failed to add ${gfx} because gfxType=${gfxType} is not supported`)
        }
    }

    addGfxToFrontLayer(item: CanvasNode | CanvasLink, gfxType: LayerGfxTypes) {
        console.log("addGfxToFrontLayer triggered", gfxType,  this.dataLayer)
        this.addGfxToLayer(item, gfxType, this.frontLayer)
        // this.canvas.camera.viewport.addChild(gfx)
    }

    addToDataLayer(item: CanvasNode | CanvasLink, gfxType: LayerGfxTypes) {
        console.log("addToDataLayer triggered", gfxType,  this.dataLayer)
        this.addGfxToLayer(item, gfxType, this.dataLayer)
        // this.canvas.camera.viewport.addChild(gfx)
    }

    private remoGfxFromLayer(item: CanvasNode | CanvasLink, gfxType: LayerGfxTypes,  layer: GraphLayer){
        if (gfxType === LAYER_GRAPHICS_TYPES_CONSTANTS.NODES){
            item.layer = null
            layer.removeNodeGfx(gfx)
        }
        else if (gfxType === LAYER_GRAPHICS_TYPES_CONSTANTS.LINKS){
            item.layer = null
            layer.removeLinkGfx(gfx)
        }
        else{
            console.error(`Failed to add ${gfx} because gfxType=${gfxType} is not supported`)
        }
    }


    removeGfxFromFrontLayer(item: CanvasNode | CanvasLink,  gfxType: LayerGfxTypes){
        this.remoGfxFromLayer(item, gfxType, this.frontLayer)
    }

    removeGfxFromDataLayer(gitem: CanvasNode | CanvasLink,  gfxType: LayerGfxTypes){
        this.remoGfxFromLayer(item, gfxType, this.dataLayer)
    }

    moveGfxToFrontLayer(item: CanvasNode | CanvasLink,  gfxType: LayerGfxTypes){


        // remove from existing layer
        if (item.layer === LAYER_TYPES_CONSTANTS.DATA){
            this.removeGfxFromDataLayer(item, gfxType)
        }
        else if (item.layer === LAYER_TYPES_CONSTANTS.FRONT){
            console.error("Failed to move the gfx to frontLayer, its already in frontLayer");
        }
        // add to new layer 
        this.addGfxToLayer(item, gfxType, this.frontLayer)


        if (gfxType === LAYER_GRAPHICS_TYPES_CONSTANTS.NODES || gfxType === LAYER_GRAPHICS_TYPES_CONSTANTS.LINKS){
            console.error(`Failed to move ${item} because gfxType=${gfxType} is not supported`)
        }
    }

    moveGfxToDataLayer(item: CanvasNode | CanvasLink, gfxType: LayerGfxTypes,){
        // remove from existing layer
        if (item.layer === LAYER_TYPES_CONSTANTS.FRONT){
            this.removeGfxFromFrontLayer(item, gfxType)
        }
        else if (item.layer === LAYER_TYPES_CONSTANTS.DATA){
            console.error("Failed to move the gfx to dataLayer, its already in dataLayer");
        }
        // add to new layer 
        this.addGfxToLayer(item, gfxType, this.dataLayer)


        if (gfxType === LAYER_GRAPHICS_TYPES_CONSTANTS.NODES || gfxType === LAYER_GRAPHICS_TYPES_CONSTANTS.LINKS){
            console.error(`Failed to move ${item} because gfxType=${gfxType} is not supported`)
        }
    }

    // moveGfxToAnnotationLayer(gfx: Graphics){
        
    // }

    // addGfxToAnnotationLayer(gfx: Graphics) {

    // }


    // removeGfxToAnnotationLayer(gfx: Graphics){

    // }

}