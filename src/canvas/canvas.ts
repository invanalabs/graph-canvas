import type { CanvasOptions} from "./types";
import { defaultCanvasOptions } from "./defaults";
import * as PIXI from "pixi.js";
import GraphData from "./data";
import { LinkShapeBase, NodeShapeBase } from "../graphics/base";
import Renderer from "./renderer";
import Camera from "./camera";
import { CameraOptions } from "./camera/types";

export default class GraphCanvas {
    /*
        mapSize is the entire world  
    */
    readonly options : CanvasOptions
    pixiApp: PIXI.Application
    graph: GraphData
    renderer: Renderer
    camera: Camera;
    worldScale: number = 3;

    constructor(options : CanvasOptions = defaultCanvasOptions){
        this.options = {...options, ...defaultCanvasOptions}
        console.log(`Creating canvas with options: ${this.options}`); 
        this.renderer = new Renderer(this);
        this.graph = new GraphData(this);
        // if (this.options.viewDiv){
        //     this.options.viewDiv.appendChild(this.pixiApp.view);
        // }

        // @ts-ignore
        const divRectangle = this.options.viewDiv?.getBoundingClientRect();
        if (divRectangle?.width === 0 || divRectangle?.height === 0 ){
            // throw new Error(`cannot draw canvas in a div with dimensions ${JSON.stringify(divRectangle)}`)
        }
        const canvasSizeOptions: CameraOptions = this.getCanvasSizeOptions(divRectangle?.width, divRectangle?.height);
        this.pixiApp =  this.createPIXIApp(canvasSizeOptions.screenWidth, canvasSizeOptions.worldHeight);
        setTimeout(() => console.log("loaded"), 300)

        if (divRectangle?.width == 0 || divRectangle?.height == 0 ){
            throw new Error(`cannot draw canvas in a div with dimensions ${JSON.stringify(divRectangle)}`)
        }
        console.log("===canvasSizeOptions", canvasSizeOptions)
        this.camera = new Camera({
            events: this.pixiApp.renderer.events, 
            ...canvasSizeOptions
        });
        this.camera.setUpCamera();

        this.pixiApp.stage.addChild(this.camera)
        this.pixiApp.start();
        this.startNew();   

        // Destroy Pixi app when the window is being unloaded (e.g., when the page is being reloaded)
        // window.addEventListener('beforeunload', function() {
        //     _this.destroyPIXIApp();
        // });


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
        this.camera.removeChildren();
        // this.camera.addChild(this.debugBorderGfx);
    }
    
    createPIXIApp = (screenWidth: number = 800, screenHeight: number=600) => {
        const pixiApp =  new PIXI.Application()
        pixiApp.init({
            width: screenWidth,
            height: screenHeight,
            canvas: this.options.viewDiv,
            antialias: true,
            resizeTo: window,
            autoStart: true, // // disable automatic rendering by ticker, render manually instead, only when needed
            autoDensity: true,
            resolution: window.devicePixelRatio, /// 2 for retina displays
            backgroundColor: this.options.background || 0x2a2c2e, // defaults to dark 
            eventMode : 'static', //  Emit events and is hit tested. Same as interaction = true in v7
        }).then(()=> {
            // The stage will handle the move events
            pixiApp.stage.interactive = true;
            pixiApp.stage.hitArea = pixiApp.screen;
        });
        console.log("==pixiApp", pixiApp.canvas)

        return pixiApp
    }

    destroyPIXIApp = () => {
        if (this.pixiApp) {
            this.pixiApp.destroy(true);
            //@ts-ignore
            this.pixiApp = null;
        }
    }

    addGfx = (shape: NodeShapeBase| LinkShapeBase) =>{
        console.log("addGfx", shape)
        this.camera.addChild(shape.gfxContainer) // TODO: try setChildIndex
    }

    removeGfx = (shape: NodeShapeBase | LinkShapeBase)=> {
        this.camera.removeChild(shape.gfxContainer)
    }

    clear(){
        this.camera.removeChildren();
    }
    
}