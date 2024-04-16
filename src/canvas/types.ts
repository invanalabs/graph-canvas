

export type StringOrNumber = String | Number;

export type RendererType = 'webgpu' | 'webgl' 

export interface ShapesIndex {
    [key: string]: string | number | object;
}

export interface ScreenOptions {
    width: number
    height: number
}


export interface CanvasOptions {
    viewDiv: HTMLCanvasElement | HTMLDivElement
    // screen: ScreenOptions
    background?: string | number // use hex instead of number
    renderer?: RendererType // RendereTypes.keys()
    resolution?: number
}