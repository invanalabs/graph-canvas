import {
  ColorSource, LineCap, LineJoin
} from "pixi.js";


export interface INodeFillStyle {
  /** The color to use for the fill. */
  color?: ColorSource
  // gradient?: FillGradient
  // pattern?: FillPattern
  /** The alpha value to use for the fill. */
  alpha?: number;
  /** The texture to use for the fill. */
  // texture?: Texture | null;
  // /** The matrix to apply. */
  // matrix?: Matrix | null;
  imageUrl?: string;
}

export interface IShapeBorderStyle {
  /** The width of the stroke. */
  width?: number;
  /** The alignment of the stroke.
   * 0: The stroke is aligned inside the shape.
   * 0.5: The stroke is centered on the shape's edge (default).
   * 1: The stroke is aligned outside the shape.
   **/
  alignment?: number;
  /** The line cap style to use. */
  cap?: LineCap;
  /** The line join style to use. */
  join?: LineJoin;
  /** The miter limit to use. */
  miterLimit?: number;

  fill?: INodeFillStyle;
}

export interface IShapeStyle {
  fill: INodeFillStyle;
  border?: IShapeBorderStyle;
}

export interface INodePosition {
  x: number
  y: number
}

export interface INodeStyle extends IShapeStyle {
  size: number;
  x: number;
  y: number;
}
