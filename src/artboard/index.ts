import GraphCanvas from "../canvas"
import { IArtBoardOptions } from "./types"
import { Viewport } from "pixi-viewport"
// import { deepMerge } from "../utils/merge"
// import Camera from "../camera"

/*
Base Cavnas 
*/
class Artboard {

  readonly originalOptions: IArtBoardOptions
  canvas: GraphCanvas
  options: IArtBoardOptions
  viewport: Viewport
  // camera: Camera
  worldScale: number = 5

  constructor(options: IArtBoardOptions) {
    this.canvas = options.canvas
    this.originalOptions = options
    this.options = options;
    this.worldScale = 5;
    this.viewport = this.setUpViewport()
    // this.camera = new Camera({artBoard: this});

  }

  setUpViewport = (): Viewport => {

    const viewport = new Viewport({
      events: this.options.canvas.pixiApp.renderer.events,
      screenWidth: this.options.canvas.viewElementSize.width,
      screenHeight: this.options.canvas.viewElementSize.height,
      worldWidth: this.options.canvas.viewElementSize.width * this.worldScale,
      worldHeight: this.options.canvas.viewElementSize.height * this.worldScale
    })

    viewport
      .drag()
      .pinch({ percent: 1 })
      .wheel()
      .decelerate()
      .clampZoom({
        minWidth: this.options.canvas.viewElementSize.width,
        minHeight: this.options.canvas.viewElementSize.height,
        maxWidth: this.options.canvas.viewElementSize.width * this.worldScale,
        maxHeight: this.options.canvas.viewElementSize.height * this.worldScale
      })


    viewport.on("zoomed-end", event => {
      console.log("zoomed-end event", event)
    })

    viewport.on("zoomed", event => {
      console.log("zoomed event", event)
    })
    return viewport
  }

  clear(){

  }
}


export default Artboard