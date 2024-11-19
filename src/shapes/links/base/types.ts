import { INodePosition } from "@/shapes/nodes";
import { ColorSource, GraphicsOptions } from "pixi.js";



export interface ILinkFillStyle {
  /** The color to use for the fill. */
  color?: ColorSource
  // gradient?: FillGradient
  // pattern?: FillPattern
  /** The alpha value to use for the fill. */
  alpha?: number;
}


export interface ILinkStyle {
  thickness?: number;
  fill: ILinkFillStyle;
}

export interface ILinkOptions {
  source: INodePosition
  target: INodePosition
  style: ILinkStyle
  renderOptions?: GraphicsOptions
}
