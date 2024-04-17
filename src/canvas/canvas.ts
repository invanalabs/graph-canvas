import type { CanvasOptions} from "./types";
import { defaultCanvasOptions } from "./defaults";
import * as PIXI from "pixi.js";
import GraphData from "./data";
import { LinkShapeBase, NodeShapeBase } from "../graphics/base";

export default class GraphCanvas {
    /*
        mapSize is the entire world  
    */
    readonly options : CanvasOptions
    pixiApp: PIXI.Application
    graph: GraphData
    
    constructor(options : CanvasOptions = defaultCanvasOptions){
        this.options = {...options, ...defaultCanvasOptions}
        console.log("Creating canvas with options: ", this.options); 
        // this.canvasDiv = document.createElement('div').setAttribute("id", options.canvasId);           
        this.graph = new GraphData(this);
        this.pixiApp =  this.createPIXIApp()
    }

    createPIXIApp = () => {
        // const {width, height} = this.options.viewDiv.style;
        const pixiApp =  new PIXI.Application();
        const pixiAppArgs = {
            // width: width,
            // height: height,
            antialias: true,
            autoResize: true,
            preference: this.options.renderer,
            // autoDensity: false,
            // resolution: this.options.resolution,
            resizeTo: this.options.viewDiv,
            backgroundColor: this.options.background,
        } 
        pixiApp.init(pixiAppArgs).then(() => {
            this.options.viewDiv.appendChild(pixiApp.canvas);
            pixiApp.stage.eventMode = 'static';
            pixiApp.stage.hitArea = pixiApp.screen;
        })
        return pixiApp
    }

    addGfx = (shape: NodeShapeBase| LinkShapeBase) =>{
        this.pixiApp.stage.addChild(shape.gfxContainer) // TODO: try setChildIndex
    }

    removeGfx = (shape: NodeShapeBase | LinkShapeBase)=> {
        this.pixiApp.stage.removeChild(shape.gfxContainer)
    }

    clear(){
        this.pixiApp.stage.removeChildren();
    }
    
}