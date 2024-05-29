import { Application } from "pixi.js";
import Artboard from "../artboard";
import { ICanvasOptions } from "./types";
import { defaultCanvasOptions } from "./defaults";
import { deepMerge } from "../utils/merge";
import { IViewElementSize } from "../artboard/types";
import { Stage } from "@pixi/layers"
import GraphData from "../data/graph";

/**
   * Generates clean, elegant and interactive data visualisations of connected data.
   *  */
export default class GraphCanvas {

   readonly originalOptions: ICanvasOptions
   options: ICanvasOptions
   artBoard: Artboard
   viewElementSize: IViewElementSize
   pixiApp: Application
   data: GraphData

   constructor(options: ICanvasOptions = defaultCanvasOptions) {
      console.log("GraphCanvas.options before", options, defaultCanvasOptions)
      this.originalOptions = options
      console.log("GraphCanvas.originalOptions", this.originalOptions)
      //@ts-ignore
      this.options = deepMerge(defaultCanvasOptions, options);
      this.options.viewElement = this.originalOptions.viewElement ? this.originalOptions.viewElement : defaultCanvasOptions.viewElement

      console.log("GraphCanvas.options final", this.options)
      this.viewElementSize = this.getCanvasDimensions();
      console.log("this.viewElementSize", this.viewElementSize);
      this.pixiApp = this.createPIXIApp(this.viewElementSize.width, this.viewElementSize.height)
      this.artBoard = new Artboard({ canvas: this })
      this.data = new GraphData(this)
   }

   createPIXIApp = (screenWidth: number, screenHeight: number): Application => {
      /**
       * Create pixi app
       */

      // Ensure the element is appended to the DOM
      //@ts-ignore
      if (!document.body.contains(this.options.viewElement)) {
         //@ts-ignore
         document.body.appendChild(this.options.viewElement);
      }

      const pixiApp = new Application({
         width: screenWidth,
         height: screenHeight,
         view: this.options.viewElement,
         antialias: true,
         // resizeTo: window,
         autoStart: true, // // disable automatic rendering by ticker, render manually instead, only when needed
         autoDensity: true,
         resolution: this.options?.resolution?.canvas, /// 2 for retina displays
         // backgroundColor: this.options.background || 0x2a2c2e, // defaults to dark 
         eventMode: 'static', //  Emit events and is hit tested. Same as interaction = true in v7
      });

      pixiApp.stage = new Stage();

      // The stage will handle the move events
      pixiApp.stage.interactive = true;
      pixiApp.stage.hitArea = pixiApp.screen;
      return pixiApp
   }

   /**
    *  
    * @returns IViewElementSize 
    */
   getCanvasDimensions = (): IViewElementSize => {
      console.log("getCanvasDimensions",this.options.viewElement)
      const element = this.options.viewElement;

      if (this.options.debugMode){
         //@ts-ignore
         element.style.border = "1px solid red"
      }

      if (element) {
         // Ensure the element is visible and rendered
         // @ts-ignore
         if (element?.style?.display === 'none' || element?.style?.visibility === 'hidden') {
            throw new Error(`Cannot draw canvas in a div with style.display='none' or style.visibility='hidden'`);
         }
         // @ts-ignore
         const { width, height } = element.getBoundingClientRect();
         if (width === 0 || height === 0) {
            throw new Error(`Cannot draw canvas in a div with dimensions w:${width}, h:${height}`)
         }
         return { width, height };
      } else {
         throw new Error(`Cannot draw canvas  when viewElement is missing`);
      }

   }

   /**
      * test method
      * @returns returns hello string
      */
   draw(): string {
      return "test"
   }
}
