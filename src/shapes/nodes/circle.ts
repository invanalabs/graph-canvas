import * as PIXI from 'pixi.js';
import { INodeStyle, NodeShapeBase, nodeStyleDefaults } from "../base";
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
    drawCircleShape(gfx, this.style.x, this.style.y, this.style.size);
    // drawCircleShape(gfx, 0, 0, this.style.size);

  }

}