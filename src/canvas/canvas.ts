import type { CanvasOptions, ScreenOptions, StringOrNumber} from "./types";
import { defaultCanvasOptions } from "./defaults";
import * as PIXI from "pixi.js";
import BaseShape from "../shapes/base";


export default class Canvas {
    /*

        mapSize is the entire wor  
    */
    
    readonly options : CanvasOptions
    pixiApp: PIXI.Application
    pixiAppArgs: any
    shapesIndex : Map<StringOrNumber, BaseShape>
    // canvasDiv: HTMLElement

    constructor(options:CanvasOptions = defaultCanvasOptions){
        this.options = options
        console.log("Creating canvas with options: ", this.options); 
        // this.canvasDiv = document.createElement('canvas');           
        this.shapesIndex = new Map()
        let _this = this

        this.pixiApp =  new PIXI.Application();
        this.pixiAppArgs = this.createPIXIAppArgs();
        this.pixiApp.init(this.pixiAppArgs).then(() => {
            console.log("this.pixiApp",  this.pixiApp, this.pixiApp.canvas, this.pixiAppArgs)
            document.body.appendChild(_this.pixiApp.canvas);
        })
        // this.viewport
    }

    createPIXIAppArgs = () => {
        return {
            width: this.options.screen.width,
            height: this.options.screen.height,
            antialias: true,
            autoResize: true,
            preference: this.options.renderer,
            // autoDensity: false,
            // resizeTo: window,
            // view: 
            backgroundColor: this.options.background,
        }         
    }

    setScreenSize = (...{width, height }: ScreenOptions) => {
        this.pixiApp.renderer.resize(width, height);
        // reposition the existing nodes center width/2, height/2
    }

    getGfxCount = () => {
        return this.shapesIndex.size
    }

    addGfx2Canvas = (shape: BaseShape) =>{
        // TODO - track the 
        this.shapesIndex.set(this.getGfxCount(), shape)
        this.pixiApp.stage.addChild(shape.gfxContainer)
    }
    
}