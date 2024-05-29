import GraphCanvas from "../canvas"


export interface IArtBoardOptions {
  canvas: GraphCanvas
}

export interface IViewElementSize {
  width: number
  height: number
}

export interface IViewportOptions  {
  screenWidth : number
  screenHeight: number
  worldWidth : number
  worldHeight: number
}