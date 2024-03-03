import { Viewport } from "pixi-viewport";
import { INode } from "../../canvas/types";
import { Application } from "pixi.js";


interface ZoomToOptions {
    top: number,
    left: number,
    x: number,
    y: number
}

interface ScreenOptions {
    width: number,
    height: number
}

interface CamerOptions {
    screenWidth : number,
    screenHeight: number,
    worldWidth : number,
    worldHeight: number
}

export default class Camera {

    // this will control the viewport 

    protected options: CamerOptions;
    protected app: Application;
    // overall data map size
    protected world: ScreenOptions;
    // screen size for viewer
    protected screen: ScreenOptions;
    // zoom to a specific position in the world
    protected zoomTo: ZoomToOptions;

    viewport: Viewport;

    worldScale: number;

    constructor(app: Application, screenWidth: number, screenHeight: number, worldScale: number = 2) {
        // scale the world 2x
        this.worldScale = worldScale;
        this.app = app;
        this.options = this.getDefaultOptions(screenWidth, screenHeight);

        this.world = { width: this.options.worldWidth, height: this.options.worldHeight };
        this.screen = { width: this.options.screenWidth, height: this.options.screenHeight};

        this.zoomTo = this.getDefaultZoomTo();
        this.viewport = this.createViewPort();
        this.app.stage.addChild(this.viewport); // add viewport to stage        
    }

    getScreen(){
        return this.screen
    }

    getDefaultOptions(screenWidth: number, screenHeight: number) {   
        return {
            screenWidth: screenWidth,
            screenHeight: screenHeight,
            worldWidth: screenWidth * this.worldScale,
            worldHeight: screenHeight * this.worldScale,
        }
    }

    getDefaultZoomTo = () => {
        return  { 
            top: this.world.width / (this.worldScale * 2), 
            left: this.world.height / (this.worldScale * 2),
            x: this.screen.width,  y: this.screen.height 
        };
    }

    createViewPort = () => {
        const viewport = new Viewport({
            screenWidth: this.screen.width,
            screenHeight: this.screen.height,
            worldWidth: this.world.width,
            worldHeight: this.world.height,
            events: this.app.renderer.events,
            // backgroundColor: this.settings.backgroundColor
        });
        viewport
            .drag().pinch({ percent: 1 }).wheel().decelerate()
            .clampZoom({ 
                minWidth: this.screen.width / 4,
                minHeight:  this.screen.height / 4,
                maxWidth: this.world.width *2 ,
                maxHeight: this.world.height * 2 
            });

        return viewport
    }

    setZoomTo = (zoomToOptions : ZoomToOptions) => {
        this.zoomTo = zoomToOptions;
    }

    zoomToCoordinates = (zoomToOptions: ZoomToOptions) => {
        console.debug("zoomToCoordinates ", zoomToOptions);
        // this.viewport
    }

    zoomToScreen = (zoomToOptions: ZoomToOptions) => {
        console.debug("zoomToScreen ", zoomToOptions);
        this.zoomTo = { 
            top: this.world.width / (this.worldScale * 2), 
            left: this.world.height / (this.worldScale * 2),
            x: this.screen.width,  y: this.screen.height 
        };
    }
 
    zoomToWorld = ()=>{
        console.debug("zoomToWorld ");

        // zoomTo center
        // this.zoomTo()
    }

    fitNodesToScreen = (nodes: INode[])=> {
        console.debug("fitNodesToScreen", nodes)
    }
    
} 