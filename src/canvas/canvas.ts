import { DataStore } from "../store"
import { defaultCanvasOptions } from "./defaults"
import { ICanvasOptions } from "./types"
import { deepMerge } from "../utils/merge"
import { ArtBoard } from "../artBoard"


export class GraphCanvas {

  readonly originalOptions: ICanvasOptions
  options: ICanvasOptions
  dataStore: DataStore
  artBoard: ArtBoard

  constructor(options: ICanvasOptions) {
    console.log("GraphCanvas.options before", options, defaultCanvasOptions)
    this.originalOptions = options
    //@ts-ignore

    const styles = deepMerge(defaultCanvasOptions.styles, options.styles || {})
    defaultCanvasOptions.styles = styles;


    this.options = deepMerge(defaultCanvasOptions, options);
    console.log("===this.options", this.options)
    // if (options.viewElement){
    //   this.options.viewElement = options.viewElement
    // }

    // renderer  
    this.artBoard = new ArtBoard(this)
    // data store 
    this.dataStore = new DataStore(this);
  }

  // start_drawing(){

  // }

}