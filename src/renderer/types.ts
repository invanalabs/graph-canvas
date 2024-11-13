

export interface IStageOptions {
  background: string | number
  backgroundAlpha?: number
  worldScale?: number
  resolution?: {
    nodes?: number
    links?: number
    stage?: number
    labels?: number
    icons?: number
    images?: number
    svgImages?: number
  }
}


export interface IRendererOptions {
  viewElement: HTMLCanvasElement
  preference?: 'webgl' | 'webgpu'
  debugMode?: boolean
  stageOptions?: IStageOptions
}