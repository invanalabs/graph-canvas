import { ICanvas } from "pixi.js"


export interface ICanvasOptions {
  viewElement: ICanvas // HTMLCanvasElement | HTMLDivElement // 
  background?: string | number // use hex instead of number
  resolution?: {
    nodes: number
    links: number 
    canvas: number
    labels: number
  }
  debugMode: boolean
}