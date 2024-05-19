import GraphCanvas from "../canvas/canvas"

export interface CameraOptions  {
    canvas: GraphCanvas
    screenWidth : number
    screenHeight: number
    worldWidth : number
    worldHeight: number
    zoomLevel: number
}


export interface ZoomToOptions {
    top: number,
    left: number,
    x: number,
    y: number
}
