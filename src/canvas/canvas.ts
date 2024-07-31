import { DataStore } from "../store"
import { defaultCanvasOptions } from "./defaults"
import { ICanvasOptions } from "./types"
import { deepMerge } from "../utils/merge"
import { ArtBoard } from "../artBoard"
import { NoLayoutComputer } from "../layout/no-layout"


export class GraphCanvas {

  readonly originalOptions: ICanvasOptions
  options: ICanvasOptions
  dataStore: DataStore
  artBoard: ArtBoard
  layout: NoLayoutComputer

  constructor(options: ICanvasOptions) {
    console.log("GraphCanvas.options before", options, defaultCanvasOptions)
    this.originalOptions = options
    this.layout = new NoLayoutComputer(this)
    //@ts-ignore
    const styles = deepMerge(defaultCanvasOptions.styles, options.styles || {})
    defaultCanvasOptions.styles = styles;

    //@ts-ignore
    this.options = deepMerge(defaultCanvasOptions, options);
    console.log("===this.options", this.options)
    // if (options.viewElement){
    //   this.options.viewElement = options.viewElement
    // }

    // renderer  
    this.artBoard = new ArtBoard(this)
    // data store 
    this.dataStore = new DataStore(this);

    // this.options.plugins.forEach((PluginCls: PluginBase )=> {
    //   const div = new PluginCls(this.artBoard);
    //   this.options.viewElement.appendChild(div.render())
    // })
  }

  // start_drawing(){

  // }

}