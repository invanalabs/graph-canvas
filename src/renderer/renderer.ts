import * as PIXI from "pixi.js"
import { Viewport } from "pixi-viewport";
import { IRendererOptions } from "./types";
import { defaultCanvasOptions } from "./defaults";
import { deepMerge } from "../utils/merge";


export class Renderer {

  pixiApp: PIXI.Application
  options: IRendererOptions
  viewport!: Viewport

  constructor(options: IRendererOptions) {
    this.options = deepMerge(defaultCanvasOptions, options || {}) as IRendererOptions
    this.pixiApp = new PIXI.Application()
  }

  init = () => {
    const pixiAppArgs = this.generatePIXIAppArgs(this.options)
    return this.pixiApp.init(pixiAppArgs).then(() => {
      this.pixiApp.stage.interactive = true;
      this.pixiApp.stage.hitArea = this.pixiApp.screen;
      this.pixiApp.stage.sortableChildren = true
      this.viewport = this.createViewport(this.pixiApp)
      this.pixiApp.stage.addChild(this.viewport)
    }).finally(() => {
    })
  }

  // get viewport() {
  //   if (this.viewport){
  //     new Error("Renderer(options).init() must be called before accessing this property.")
  //   }
  //   return this.viewport;
  // }

  getCanvasSizeOptions() {
    const divRectangle = this.options.viewElement.getBoundingClientRect();
    if (divRectangle?.width == 0 || divRectangle?.height == 0) {
      console.error("this.canvas.options.viewElement not good", this.options.viewElement)
      throw new Error(`cannot draw canvas in a div with dimensions ${JSON.stringify(divRectangle)}`)
    }
    return {
      screenWidth: divRectangle.width,
      screenHeight: divRectangle.height,
      worldWidth: divRectangle.width * (this.options.stageOptions?.worldScale ?? 1),
      worldHeight: divRectangle.height * (this.options.stageOptions?.worldScale ?? 1),
    }
  }

  generatePIXIAppArgs(options: IRendererOptions) {
    const { width, height } = options.viewElement.getBoundingClientRect()
    const pixiAppArgs: Partial<PIXI.ApplicationOptions> = {
      autoStart: true, // // disable automatic rendering by ticker, render manually instead, only when needed
      autoDensity: true,
      width: width,
      height: height,
      antialias: true,
      preference: options.preference,
      resizeTo: window,
      canvas: options.viewElement,
      resolution: options.stageOptions?.resolution?.stage,
      backgroundColor: options.stageOptions?.background,
      backgroundAlpha: options.stageOptions?.backgroundAlpha,

      //   eventFeatures: {
      //     move: false,
      //     globalMove: false,
      //     click: false,
      //     wheel: false,
      // },
    }
    if (options.stageOptions?.backgroundAlpha === 0) {
      delete pixiAppArgs.canvas
    }
    return pixiAppArgs
  }

  createViewport(pixiApp: PIXI.Application): Viewport {
    const canvasSizeOptions = this.getCanvasSizeOptions()
    const viewport = new Viewport({
      screenWidth: canvasSizeOptions.screenWidth,
      screenHeight: canvasSizeOptions.screenHeight,
      worldWidth: canvasSizeOptions.worldWidth,
      worldHeight: canvasSizeOptions.worldHeight,
      passiveWheel: true,
      events: pixiApp.renderer.events
    })
    viewport.label = "viewport"
    viewport
      .drag()
      .pinch({ percent: 0.5 })
      .wheel()
      .decelerate({
        friction: 0.5,
        bounce: 0.5,
        minSpeed: 300
      })
      // .bounce({ time: 200 })
      .clampZoom({
        minWidth: canvasSizeOptions.screenWidth / 10,
        minHeight: canvasSizeOptions.screenHeight / 10,
        maxWidth: canvasSizeOptions.worldWidth,
        maxHeight: canvasSizeOptions.worldHeight
      })
    // .clamp({ direction: "all" })
    return viewport;
  }

  addGfx(graphics: PIXI.Graphics) {
    this.viewport.addChild(graphics)
  }

  removeGfx(graphics: PIXI.Graphics) {
    this.viewport.removeChild(graphics)
  }

  destroy() {
    this.pixiApp.destroy()
  }

}