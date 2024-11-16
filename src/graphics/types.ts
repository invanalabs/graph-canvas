import {
  ColorSource, FillGradient,
  Matrix, Texture, FillPattern, StrokeStyle,
  LineCap, LineJoin
} from "pixi.js";


export interface IShapeFillStyle {
  /** The color to use for the fill. */
  color?: ColorSource
  gradient?: FillGradient
  pattern?: FillPattern
  /** The alpha value to use for the fill. */
  alpha?: number;
  /** The texture to use for the fill. */
  texture?: Texture | null;
  /** The matrix to apply. */
  matrix?: Matrix | null;
}

export interface IShapeBorderStyle {
  /** The width of the stroke. */
  width?: number;
  /** The alignment of the stroke.
   * 0: The stroke is aligned inside the shape.
   * 0.5: The stroke is centered on the shape's edge (default).
   * 1: The stroke is aligned outside the shape.
   */
  alignment?: number;
  /** The line cap style to use. */
  cap?: LineCap;
  /** The line join style to use. */
  join?: LineJoin;
  /** The miter limit to use. */
  miterLimit?: number;

  fill?: IShapeFillStyle;
}

export interface IShapeStyle {
  fill: IShapeFillStyle;
  border?: IShapeBorderStyle;
}

export interface INodeStyle extends IShapeStyle {
  size: number;
  x: number;
  y: number;
}

export interface ILinkStyle extends IShapeStyle {
  thickness?: number;
}
