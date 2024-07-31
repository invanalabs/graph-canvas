import D3ForceLayoutComputer from "../layout/d3-force"
import DagreLayoutComputer from "../layout/dagre"
import { NoLayoutComputer } from "../layout/no-layout"
import { ExtraSettings, GraphicsStyles } from "../renderer/types"


export interface ICanvasOptions {
  viewElement: HTMLCanvasElement //HTMLDivElement // 
  background?: string | number // use hex instead of number
  // layout: NoLayoutComputer | D3ForceLayoutComputer | DagreLayoutComputer
  resolution?: {
    nodes?: number
    links?: number
    canvas?: number
    labels?: number
    icons?: number
    images?: number
  }
  debugMode?: boolean
  styles?: GraphicsStyles
  extraSettings?: ExtraSettings
  // plugins: PluginBase[]

}