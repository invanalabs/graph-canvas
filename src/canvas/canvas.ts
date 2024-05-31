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
    this.options = deepMerge(defaultCanvasOptions, options);
    console.log("===this.options", this.options)
    // data store 
    this.dataStore = new DataStore();
    // renderer  
    this.artBoard = new ArtBoard(this)
  }

  draw(){

  }

}