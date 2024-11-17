import * as PIXI from 'pixi.js';
import { INodeStyle, NodeShapeBase, nodeStyleDefaults } from "../base"
import { deepMerge } from '@/utils';


export interface ISymmetricalPolygonStyle extends INodeStyle {
  radius: number
  sideLength: number
  sidesCount: number
}

export const symmetricalPolygonDefaults: ISymmetricalPolygonStyle = {
  ...nodeStyleDefaults,
  sideLength: 10,
  size: 5,
  radius: 2,
  sidesCount: 3
}


export class SymmetricalPolygon extends NodeShapeBase {

  declare style: ISymmetricalPolygonStyle

  constructor(style: Partial<ISymmetricalPolygonStyle> = symmetricalPolygonDefaults,
    options?: PIXI.GraphicsOptions) {
    style = deepMerge(symmetricalPolygonDefaults, style) as ISymmetricalPolygonStyle;
    super(style, options);
  }

  drawBase() {
    console.log('Drawing symmetrical polygon', this.style)
    // Draw the symmetrical polygon
    this.roundPoly(
      this.style.x,
      this.style.y,
      this.style.sideLength * this.style.size,
      this.style.sidesCount,
      this.style.radius,
    )
  }

}