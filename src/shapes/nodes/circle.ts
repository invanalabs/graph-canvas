import * as PIXI from 'pixi.js';
import { INodeStyle, NodeShapeBase, nodeStyleDefaults } from ".";
import { deepMerge } from '@/utils';
import { drawCircleShape } from '@/shapes/utils';


export const circleDefauts: ICircleStyle = nodeStyleDefaults

export interface ICircleStyle extends INodeStyle { }


export class Circle extends NodeShapeBase {

  declare style: ICircleStyle;

  constructor(style: Partial<ICircleStyle> = circleDefauts, options?: PIXI.GraphicsOptions) {
    style = deepMerge(circleDefauts, style) as ICircleStyle;
    super(style, options);
  }

  drawBase(gfx: PIXI.Graphics): void {
    // This means that gfx.drawCircle(0, 0, 50) will
    // draw a circle centered at (0, 0) within the graphics
    // object's local coordinates.
    drawCircleShape(gfx, 0, 0, this.style.size);

  }

}