import GraphCanvas from "../canvas/canvas";
import GraphLayer from "./graphLayer";
import { Container, Graphics } from "pixi.js";
import { CanvasLayersOptions, LayerGfxTypes, LayerTypes } from "./types";
import { LAYER_TYPES_CONSTANTS, LAYER_GRAPHICS_TYPES_CONSTANTS } from "./constants";
import { Viewport } from "pixi-viewport";


export default class CanvasLayers {
    // canvas
    canvas: GraphCanvas
    // viewport: Viewport
    // layer
    frontLayer: GraphLayer
    dataLayer: GraphLayer
    annotationLayer: GraphLayer

    constructor(options: CanvasLayersOptions ) {
        this.canvas = options.canvas;
        // this.viewport = this.canvas.viewport
        // setup viewport
        // this.viewport = new Viewport({
        //     events: options.canvas.pixiApp.renderer.events, 
        //     screenWidth : options.screenWidth,
        //     screenHeight: options.screenHeight,
        //     worldWidth : options.worldWidth,
        //     worldHeight: options.worldHeight
        // })
        // this.setUpCamera(options)
        // this.canvas.pixiApp.stage.addChild(this.viewport)

        // create layers
        this.frontLayer = new GraphLayer(this, LAYER_TYPES_CONSTANTS.FRONT);
        this.dataLayer = new GraphLayer(this, LAYER_TYPES_CONSTANTS.DATA);
        this.annotationLayer = new GraphLayer(this, LAYER_TYPES_CONSTANTS.ANNOTATIONS);
    }

    // setUpCamera(options) {
    //     this.viewport
    //         .drag()
    //         .pinch({ percent: 1 })
    //         .wheel()
    //         .decelerate()
    //         // .clamp({ direction: 'all', underflow: 'center' })// 
    //         .clampZoom({
    //             minWidth: options.screenWidth / 5,
    //             minHeight: options.screenHeight / 5,
    //             maxWidth: options.worldWidth,
    //             maxHeight: options.worldHeight
    //         })
    // }

    createLayer(LayerName: LayerTypes) {
        const layer = new Container();
        layer.name = LayerName
        this.canvas.viewport.addChild(layer)
        return layer
    }

    private addGfxToLayer(gfx: Graphics, gfxType: LayerGfxTypes,  layer: GraphLayer){
        if (gfxType === LAYER_GRAPHICS_TYPES_CONSTANTS.NODE_SHAPES){
            layer.addNodeShapeGfx(gfx)
        }
        else if (gfxType === LAYER_GRAPHICS_TYPES_CONSTANTS.NODE_LABELS){
            layer.addNodeLabelGfx(gfx)
        }
        else if (gfxType === LAYER_GRAPHICS_TYPES_CONSTANTS.LINK_SHAPES){
            layer.addLinkShapeGfx(gfx)
        }
        else if (gfxType === LAYER_GRAPHICS_TYPES_CONSTANTS.LINK_LABELS){
            layer.addLinkLabelGfx(gfx)
        }
        else{
            console.error(`Failed to add ${gfx} because gfxType=${gfxType} is not supported`)
        }
    }

    addGfxToFrontLayer(gfx: Graphics, gfxType: LayerGfxTypes) {

    }

    addGfxToDataLayer(gfx: Graphics, gfxType: LayerGfxTypes) {
        console.log("addGfxToDataLayer triggered", gfxType,  this.dataLayer)
        // this.addGfxToLayer(gfx, gfxType, this.dataLayer)
        this.canvas.camera.viewport.addChild(gfx)
    }

    // addGfxToAnnotationLayer(gfx: Graphics) {

    // }

    removeGfxToFrontLayer(gfx: Graphics, gfxType: LayerGfxTypes){

    }

    removeGfxToDataLayer(gfx: Graphics, gfxType: LayerGfxTypes){

    }

    // removeGfxToAnnotationLayer(gfx: Graphics){

    // }

}