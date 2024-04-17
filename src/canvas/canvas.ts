import type { CanvasOptions, ScreenOptions, StringOrNumber} from "./types";
import { defaultCanvasOptions } from "./defaults";
import * as PIXI from "pixi.js";
import BaseShape from "../graphics/base";


export default class GraphCanvas {
    /*
        mapSize is the entire world  
    */
    
    readonly options : CanvasOptions
    pixiApp: PIXI.Application
    pixiAppArgs: any
    shapesIndex : Map<StringOrNumber, BaseShape>
    // canvasDiv: HTMLElement

    constructor(options : CanvasOptions = defaultCanvasOptions){
        this.options = {...options, ...defaultCanvasOptions}
        console.log("Creating canvas with options: ", this.options); 
        // this.canvasDiv = document.createElement('div').setAttribute("id", options.canvasId);           
        this.shapesIndex = new Map()
        let _this = this

        this.pixiApp =  new PIXI.Application();
        this.pixiAppArgs = this.createPIXIAppArgs();
        this.pixiApp.init(this.pixiAppArgs).then(() => {
            this.options.viewDiv.appendChild(_this.pixiApp.canvas);
        })
    }

    createPIXIAppArgs = () => {
        const {width, height} = this.options.viewDiv.style
        return {
            width: width,
            height: height,
            antialias: true,
            autoResize: true,
            preference: this.options.renderer,
            // autoDensity: false,
            // resolution: this.options.resolution,
            resizeTo: this.options.viewDiv,
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

    clear(){
        this.pixiApp.stage.removeChildren();
    }

}