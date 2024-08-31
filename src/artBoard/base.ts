import * as PIXI from "pixi.js"
import { Viewport } from "pixi-viewport";
import { GraphCanvas } from "../canvas";
import { Camera } from "./camera";
import { Renderer } from "../renderer/renderer";
import { DefaultEventEmitter } from "../store/events/emitter";
import { EventEmitterAbstract } from "../store/events/abstract";
import { CanvasLink, CanvasNode } from "../store";


export class ArtBoardBase {

  canvas: GraphCanvas
  pixiApp: PIXI.Application
  viewport: Viewport
  renderer: Renderer
  camera: Camera
  events: EventEmitterAbstract
  isLabelsVisible: boolean = true
  isDestroyed: boolean = false
  worldScale: number = 20

  constructor(canvas: GraphCanvas) {
    this.canvas = canvas
    this.pixiApp = new PIXI.Application()
    // prevent body scrolling
    this.canvas.options.viewElement.addEventListener('wheel', event => {
      event.preventDefault()
    }, { passive: false });
  }


  setUpRenderOnEventListers() {
    this.canvas.dataStore.on('node:data:onAdded', this.events.onNodeAdded);
    this.canvas.dataStore.on('node:data:onDeleted', this.events.onNodeDeleted);
    this.canvas.dataStore.on('node:data:onLinksUpdated', this.events.onNodeLinksUpdated);
    this.canvas.dataStore.on('node:data:onStyleUpdated', this.events.onNodeStyleUpdated);

    this.canvas.dataStore.on('node:data:onPositionUpdated', this.events.onNodePositionUpdated);
    this.canvas.dataStore.on('node:gfx:onStateUpdated', this.events.onNodeStateUpdated)

    // add link:data:onAdded event listener
    this.canvas.dataStore.on('link:data:onAdded', this.events.onLinkAdded);
    this.canvas.dataStore.on('link:data:onDeleted', this.events.onLinkDeleted);
    this.canvas.dataStore.on('link:gfx:onStateUpdated', this.events.onLinkStateUpdated)
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

  init = () => {

    const _this = this;
    // console.log("start_drawing this.options", this.canvas.options)
    const { screenWidth, screenHeight } = this.getCanvasSizeOptions()
    const pixiAppArgs = {
      width: screenWidth,
      height: screenHeight,
      // canvas: this.canvas.options.viewElement,
      antialias: true,
      resizeTo: this.canvas.options.viewElement,
      // preference: "webgpu",
      autoStart: true, // // disable automatic rendering by ticker, render manually instead, only when needed
      autoDensity: true,
      resolution: window.devicePixelRatio, /// 2 for retina displays
      backgroundColor: this.canvas.options.background,
      backgroundAlpha: this.canvas.options.backgroundAlpha,
    }

    return this.pixiApp.init(pixiAppArgs).then(() => {
      this.pixiApp.stage.interactive = true;
      this.pixiApp.stage.hitArea = _this.pixiApp.screen;
      this.pixiApp.stage.sortableChildren = true
    }).finally(() => {
      this.viewport = this.createViewport()
      this.pixiApp.stage.addChild(this.viewport)
      this.renderer = new Renderer(this)
      this.camera = new Camera(this)
      this.events = new DefaultEventEmitter(this)
      this.setUpRenderOnEventListers()
    })
  }

  hideNodeLabels = () => {
    console.log("hideNodeLabels")
    this.canvas.dataStore.getNodes().forEach((node: CanvasNode) => {
      node.gfxInstance?.hideLabel()
    })
  }

  showNodeLabels = () => {
    console.log("showNodeLabels")

    this.canvas.dataStore.getNodes().forEach((node: CanvasNode) => {
      node.gfxInstance?.showLabel()
    })
  }

  hideLinkLabels = () => {
    this.canvas.dataStore.getLinks().forEach((link: CanvasLink) => {
      link.gfxInstance?.hideLabel()
    })
  }

  showLinkLabels = () => {
    this.canvas.dataStore.getLinks().forEach((link: CanvasLink) => {
      link.gfxInstance?.showLabel()
    })
  }

  showLabelsBasedOnZoom = (zoomScale: number) => {
    const labelVisiblitythreshold = this.canvas.options.extraSettings?.labelVisibilityZoomThreshold as number
    if (labelVisiblitythreshold) {
      if (zoomScale < labelVisiblitythreshold) {
        if (this.isLabelsVisible === true) {
          // hide label
          this.hideNodeLabels()
          this.hideLinkLabels()
          this.isLabelsVisible = false
        }
      } else {
        // show labels
        if (this.isLabelsVisible === false) {
          this.showNodeLabels()
          this.showLinkLabels()
          this.isLabelsVisible = true
        }
      }
    }
  }

  createViewport(): Viewport {
    const canvasSizeOptions = this.getCanvasSizeOptions()
    const viewport = new Viewport({
      screenWidth: canvasSizeOptions.screenWidth,
      screenHeight: canvasSizeOptions.screenHeight,
      worldWidth: canvasSizeOptions.worldWidth,
      worldHeight: canvasSizeOptions.worldHeight,
      passiveWheel: true,
      events: this.pixiApp.renderer.events
    })
    viewport.label = "viewport"
    viewport
      .drag()
      .pinch({ percent: 0.5 })
      .wheel()
      .decelerate({
        friction: 0.5,
        bounce: 0.5,
        // minSpeed?: number;
      })
      // .bounce({time: 200})
      .clampZoom({
        minWidth: canvasSizeOptions.screenWidth / 10,
        minHeight: canvasSizeOptions.screenHeight / 10,
        maxWidth: canvasSizeOptions.worldWidth,
        maxHeight: canvasSizeOptions.worldHeight
      })

    // viewport.on("zoomed-end", event => {
    //   console.log("zoomed-end event", event)
    //   // this.showLabelsBasedOnZoom(event.viewport.scaled)
    // })

    viewport.on("zoomed", event => {
      // this.showLabelsBasedOnZoom(event.viewport.scaled)
      this.camera.onSetZoomLevel(event.viewport.scaled)
    })
    return viewport;
  }

  loadFont = (fontName: string, src: string) => {
    PIXI.Assets.addBundle('fonts', [
      { alias: fontName, src: src }
    ]);
    return PIXI.Assets.loadBundle('fonts')
  }


}