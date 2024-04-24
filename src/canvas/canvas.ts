import type { CanvasOptions} from "./types";
import { defaultCanvasOptions } from "./defaults";
import * as PIXI from "pixi.js";
import GraphData from "./data";
import { LinkShapeBase, NodeShapeBase } from "../graphics/base";
import Renderer from "./renderer";

export default class GraphCanvas {
    /*
        mapSize is the entire world  
    */
    readonly options : CanvasOptions
    pixiApp: PIXI.Application
    graph: GraphData
    renderer: Renderer
    
    constructor(options : CanvasOptions = defaultCanvasOptions){
        this.options = {...options, ...defaultCanvasOptions}
        console.log(`Creating canvas with options: ${this.options}`); 
        this.renderer = new Renderer(this);
        this.graph = new GraphData(this);
        this.pixiApp =  this.createPIXIApp();

        const _this = this;
        // Destroy Pixi app when the window is being unloaded (e.g., when the page is being reloaded)
        window.addEventListener('beforeunload', function() {
            _this.destroyPIXIApp();
        });
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
            autoDensity: true,
            resolution: this.options.resolution,
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

    destroyPIXIApp = () => {
        if (this.pixiApp) {
            this.pixiApp.destroy(true);
            //@ts-ignore
            this.pixiApp = null;
        }
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