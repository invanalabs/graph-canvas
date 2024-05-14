import type { CanvasOptions, RendererType} from "./types";
import { defaultCanvasOptions } from "./defaults";
import * as PIXI from "pixi.js";
import GraphData from "../graph";
import Renderer from "./renderer";
import Camera from "../camera";
import { CameraOptions } from "../camera/types";
import TextureManager from "../textures";
import { deepMerge } from "../utils/merge";
import { Viewport } from "pixi-viewport";
import CanvasLayers from "../layers";


export default class GraphCanvas {
    /*
        mapSize is the entire world  
    */
     options : CanvasOptions
    readonly originalOptions : CanvasOptions
    // 
    pixiApp: PIXI.Application
    renderer: Renderer
    camera: Camera;
    worldScale: number = 10;
    viewport: Viewport

    layers: CanvasLayers
    //
    graph: GraphData
    textureManager: TextureManager 

    constructor(options : CanvasOptions = defaultCanvasOptions){
        this.originalOptions = options;

        // resolve all the settings including styles and sizes, so that 
        // this is done only once in the life time and easy to manage.

        const styles = deepMerge(defaultCanvasOptions.styles, options.styles || {})
        defaultCanvasOptions.styles = styles;
        this.options = {...options, ...defaultCanvasOptions}

        console.log(`Creating canvas with options: ${this.options}`); 

        // create texture
        this.textureManager = new TextureManager(this);

        // @ts-ignore
        const divRectangle = this.options.viewDiv?.getBoundingClientRect();
        if (divRectangle?.width == 0 || divRectangle?.height == 0 ){
            throw new Error(`cannot draw canvas in a div with dimensions ${JSON.stringify(divRectangle)}`)
        }
        const canvasSizeOptions: CameraOptions = this.getCanvasSizeOptions(divRectangle?.width, divRectangle?.height);
        console.log("===canvasSizeOptions", canvasSizeOptions)

        // start pixiApp
        this.pixiApp =  this.createPIXIApp(canvasSizeOptions.screenWidth, canvasSizeOptions.worldHeight);

        // setup viewport
        this.viewport = new Viewport({
            events: this.pixiApp.renderer.events, 
            screenWidth : canvasSizeOptions.screenWidth,
            screenHeight: canvasSizeOptions.screenHeight,
            worldWidth : canvasSizeOptions.worldWidth,
            worldHeight: canvasSizeOptions.worldHeight
        })
        this.setUpCamera(canvasSizeOptions)
        this.pixiApp.stage.addChild(this.viewport)



        this.renderer = new Renderer(this);
        this.graph = new GraphData(this);

        const _this = this;

        this.camera = new Camera({
            canvas: this, 
            ...canvasSizeOptions
        });

        this.layers = new CanvasLayers({
            canvas: this,
            ...canvasSizeOptions
        })
        
        // Destroy Pixi app when the window is being unloaded (e.g., when the page is being reloaded)
        window.addEventListener('beforeunload', function() {
            _this.destroyPIXIApp();
        });

        // prevent body scrolling
        // this.pixiApp.view.addEventListener('wheel', event => { event.preventDefault(); });
    }

    getCanvasSizeOptions(screenWidth: number, screenHeight: number) {   
        return {
            screenWidth: screenWidth,
            screenHeight: screenHeight,
            worldWidth: screenWidth * this.worldScale,
            worldHeight: screenHeight * this.worldScale,
        }
    }

    startNew = () => {
        this.camera.viewport.removeChildren();
    }

    setUpCamera(options: CameraOptions) {
        this.viewport
            .drag()
            .pinch({ percent: 1 })
            .wheel()
            .decelerate()
            .clampZoom({
                minWidth: options.screenWidth / 5,
                minHeight: options.screenHeight / 5,
                maxWidth: options.worldWidth,
                maxHeight: options.worldHeight
            })
    }
    createPIXIApp = (screenWidth: number = 800, screenHeight: number=600) => {
        const pixiApp =  new PIXI.Application({
            width: screenWidth,
            height: screenHeight,
            view: this.options.viewDiv,
            antialias: true,
            resizeTo: window,
            autoStart: true, // // disable automatic rendering by ticker, render manually instead, only when needed
            autoDensity: true,
            resolution: this.options.resolution, /// 2 for retina displays
            backgroundColor: this.options.background || 0x2a2c2e, // defaults to dark 
            eventMode : 'static', //  Emit events and is hit tested. Same as interaction = true in v7
        });
        // The stage will handle the move events
        pixiApp.stage.interactive = true;
        pixiApp.stage.hitArea = pixiApp.screen;
        return pixiApp
    }

    destroyPIXIApp = () => {
        if (this.pixiApp) {
            this.pixiApp.destroy(true);
            //@ts-ignore
            this.pixiApp = null;
        }
    }

    updateRendererPreference = (rendererType: RendererType) => {
        this.options.renderer = rendererType;
        alert("not implemented");
        // this.pixiApp. = rendererType
    }

    updateBackground = (newColor: string | number) => {
        this.options.background = newColor
        this.pixiApp.renderer.background.color = newColor
    }
        
}