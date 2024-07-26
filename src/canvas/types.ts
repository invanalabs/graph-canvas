// import { ICanvas } from "pixi.js";

// import { PluginBase } from "../plugins/base"
import { ExtraSettings, GraphicsStyles } from "../renderer/types"

export interface ICanvasOptions {
  viewElement: HTMLCanvasElement //HTMLDivElement // 
  background?: string | number // use hex instead of number
  resolution?: {
    nodes: number
    links: number
    canvas: number
    labels: number
    icons: number
    images: number
  }
  debugMode?: boolean
  styles?: GraphicsStyles
  extraSettings?: ExtraSettings
  // plugins: PluginBase[]

}