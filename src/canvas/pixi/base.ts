import { Application, Graphics } from 'pixi.js';
import { CanvasSetting } from './types';
import StateCtrl from '../../state/model';
import Camera from './camera';
 

export interface CanvasOption  {
    screenWidth : number,
    screenHeight: number,
    worldWidth : number,
    worldHeight: number
}

export default class CanvasBase {
    // for drawing shapes

    protected app: Application;
    stateCtrl: StateCtrl;

    // camera
    camera: Camera;
    worldScale: number = 2;
 
    canvasOptions: CanvasOption;
    debug_mode : boolean;

    protected settings: CanvasSetting;
    // viewportSettings: CViewportSetting;
    debugBorderGfx :Graphics;


    constructor(settings: CanvasSetting, stateCtrl: StateCtrl) {
        console.log("CanvasBase settings", settings)
        if (!settings.containerDiv) {
            throw ("containerDiv cannot be null")
        }
        this.debug_mode = true;
        this.stateCtrl = stateCtrl;
        this.settings = settings; // overall canvas settings 

        // for debug 
        this.debugBorderGfx = new Graphics();

        // @ts-ignore
        const divRectangle = this.settings.containerDiv?.getBoundingClientRect();
        if (divRectangle?.width === 0 || divRectangle?.height === 0 ){
            throw (`cannot draw canvas in a div with dimensions ${JSON.stringify(divRectangle)}`)
        }

        this.canvasOptions = this.getDefaultOptions(divRectangle?.width, divRectangle?.height);
        this.app = this.createApp( this.canvasOptions.screenWidth, this.canvasOptions.screenHeight);

        this.camera = new Camera({  events: this.app.renderer.events, ...this.canvasOptions });
        this.camera.setUpCamera();

        this.app.stage.addChild(this.camera)
        this.app.start();

        this.clear();
    }


    clear(){
        this.camera.removeChildren();
        this.camera.addChild(this.debugBorderGfx);
    }
    

    resetState = () => {

    }


    getDefaultOptions(screenWidth: number, screenHeight: number) {   
        return {
            screenWidth: screenWidth,
            screenHeight: screenHeight,
            worldWidth: screenWidth * this.worldScale,
            worldHeight: screenHeight * this.worldScale,
        }
    }


    setDebug = (debug_mode: boolean) => {  this.debug_mode = debug_mode; }
    debugOn = () => { this.debug_mode = true; }
    debugOff = () => { this.debug_mode = false; }

    createApp( screenWidth: number, screenHeight: number ){
        const app = new Application({
            width: screenWidth,
            height: screenHeight,
            view: this.settings.containerDiv,
            antialias: true,
            resizeTo: window,
            autoStart: true, // // disable automatic rendering by ticker, render manually instead, only when needed
            autoDensity: false,
            resolution: window.devicePixelRatio, /// 2 for retina displays
            backgroundColor: this.settings.backgroundColor || 0x2a2c2e, // defaults to dark 
            eventMode : 'static' //  Emit events and is hit tested. Same as interaction = true in v7
        });
   
        // The stage will handle the move events
        app.stage.interactive = true;
        app.stage.hitArea = app.screen;


        
        // prevent body scrolling
        // @ts-ignore
        app.view.addEventListener('wheel', event => { event.preventDefault(); });
        return app;
    }

   
 
}