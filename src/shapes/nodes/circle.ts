import * as PIXI from 'pixi.js';
import { INodeStyle, NodeShapeBase, nodeStyleDefaults } from "../base";
import { deepMerge } from '@/utils';
// import { deepMerge } from '@/utils';

export const circleDefauts: ICircleStyle = nodeStyleDefaults

export interface ICircleStyle extends INodeStyle { }


export class Circle extends NodeShapeBase {

  declare style: ICircleStyle;

  constructor(style: Partial<ICircleStyle> = circleDefauts, options?: PIXI.GraphicsOptions) {
    // console.log('Circle style', style)
    style = deepMerge(circleDefauts, style) as ICircleStyle;
    super(style, options);
  }

  drawBase(): void {
    this.circle(this.style.x, this.style.y, this.style.size);
  }

}