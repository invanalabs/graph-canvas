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

  worldScale: number = 20

  constructor(canvas: GraphCanvas) {
    this.canvas = canvas
    // this.isLabelsVisible = false
    // setup pixi app
    // const _this = this;
    // this.pixiApp = this.start_drawing();
    this.pixiApp = new PIXI.Application()
    // this.start_drawing().then(()=>{
    //   this.renderer = new Renderer(_this)
    //   this.camera = new Camera(_this)
    //   this.events = new DefaultEventEmitter(_this)
    //   this.setUpRenderOnEventListers()
    // })

    // prevent body scrolling
    this.canvas.options.viewElement.addEventListener('wheel', event => {
      event.preventDefault()
    }, { passive: false });


    // this.cull = new Cull();
    // this.updateCull()
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


  // updateCull() {
  //   this.cull.cull(this.pixiApp.renderer.screen);
  // }

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
      view: this.canvas.options.viewElement,
      antialias: true,
      resizeTo: window,
      // preference: "webgpu",
      autoStart: true, // // disable automatic rendering by ticker, render manually instead, only when needed
      autoDensity: true,
      resolution: window.devicePixelRatio, /// 2 for retina displays
      backgroundColor: this.canvas.options.background,
      // eventMode: 'static', //  Emit events and is hit tested. Same as interaction = true in v7
    }

    return this.pixiApp.init(pixiAppArgs).then(() => {
      // this.options.viewDiv.appendChild(pixiApp.canvas);
      // pixiApp.stage.eventMode = 'static';
      // pixiApp.stage.hitArea = pixiApp.screen;
      this.pixiApp.stage.interactive = true;
      this.pixiApp.stage.hitArea = _this.pixiApp.screen;
      this.pixiApp.stage.sortableChildren = true
      // setup viewport
      // console.log("===_this.pixiApp.stage", _this.pixiApp.stage, this, this.viewport)

    }).finally(() => {
      this.viewport = this.createViewport()
      this.pixiApp.stage.addChild(this.viewport)
      this.renderer = new Renderer(this)
      this.camera = new Camera(this)
      // this.camera.fitView()
      this.events = new DefaultEventEmitter(this)
      this.setUpRenderOnEventListers()

    })
    // return this.pixiApp


    // pixiApp.stage = new Stage();
    // The stage will handle the move events
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
    console.debug("===labelVisiblitythreshold", zoomScale, labelVisiblitythreshold, this.isLabelsVisible, (zoomScale < labelVisiblitythreshold))
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
    viewport.name = "viewport"
    viewport
      .drag()
      .pinch({ percent: 0.5 })
      .wheel()
      .decelerate()
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
      // console.log("zoomed event", event.viewport.scaled, event)
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