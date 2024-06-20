import * as PIXI from "pixi.js"
import { Viewport } from "pixi-viewport";
import { GraphCanvas } from "../canvas";


export class ArtBoardBase {

  canvas: GraphCanvas
  pixiApp: PIXI.Application
  viewport: Viewport

  worldScale: number = 5

  constructor(canvas: GraphCanvas) {
    this.canvas = canvas
    // setup pixi app
    this.pixiApp = this.createPIXIApp();
    // setup viewport
    this.viewport = this.createViewport()
    this.pixiApp.stage.addChild(this.viewport)
  }

  getCanvasSizeOptions() {
    const divRectangle = this.canvas.options.viewElement.getBoundingClientRect();
    if (divRectangle?.width == 0 || divRectangle?.height == 0) {
      console.error("this.canvas.options.viewElement not good", this.canvas.options.viewElement)
      throw new Error(`cannot draw canvas in a div with dimensions ${JSON.stringify(divRectangle)}`)
    }
    return {
      screenWidth: divRectangle.width,
      screenHeight: divRectangle.height,
      worldWidth: divRectangle.width * this.worldScale,
      worldHeight: divRectangle.height * this.worldScale,
    }
  }

  
  createPIXIApp = (): PIXI.Application => {
    console.log("createPIXIApp this.options", this.canvas.options)
    const { screenWidth, screenHeight } = this.getCanvasSizeOptions()
    const pixiApp = new PIXI.Application({
      width: screenWidth,
      height: screenHeight,
      view: this.canvas.options.viewElement,
      antialias: true,
      // resizeTo: window,
      autoStart: true, // // disable automatic rendering by ticker, render manually instead, only when needed
      autoDensity: true,
      resolution: window.devicePixelRatio, /// 2 for retina displays
      backgroundColor: this.canvas.options.background,
      eventMode: 'static', //  Emit events and is hit tested. Same as interaction = true in v7
    });
    // pixiApp.stage = new Stage();
    // The stage will handle the move events
    pixiApp.stage.interactive = true;
    pixiApp.stage.hitArea = pixiApp.screen;
    return pixiApp
  }

  createViewport(): Viewport {
    const canvasSizeOptions = this.getCanvasSizeOptions()
    console.log("--canvasSizeOptions", canvasSizeOptions)
    const viewport = new Viewport({
      events: this.pixiApp.renderer.events,
      screenWidth: canvasSizeOptions.screenWidth,
      screenHeight: canvasSizeOptions.screenHeight,
      worldWidth: canvasSizeOptions.worldWidth,
      worldHeight: canvasSizeOptions.worldHeight
    })

    viewport
      .drag()
      .pinch({ percent: 1 })
      .wheel()
      .decelerate()
      .clampZoom({
        minWidth: canvasSizeOptions.screenWidth / 5,
        minHeight: canvasSizeOptions.screenHeight / 5,
        maxWidth: canvasSizeOptions.worldWidth,
        maxHeight: canvasSizeOptions.worldHeight
      })


    viewport.on("zoomed-end", event => {
      console.log("zoomed-end event", event)
    })

    viewport.on("zoomed", event => {
      console.log("zoomed event", event)
    })
    return viewport;
  }


}