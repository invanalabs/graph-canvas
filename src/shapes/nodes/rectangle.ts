import * as PIXI from 'pixi.js';
import { INodeStyle, NodeShapeBase, nodeStyleDefaults } from "../base"
import { deepMerge } from '@/utils';

export interface IRectangleStyle extends INodeStyle {
  radius: number
  width: number
  height: number
}


export const rectangleDefaults: IRectangleStyle = {
  ...nodeStyleDefaults,
  size: 5,
  width: 40,
  height: 10,
  radius: 3,
}

export class Rectangle extends NodeShapeBase {

  declare style: IRectangleStyle

  constructor(style: Partial<IRectangleStyle>, options?: PIXI.GraphicsOptions) {
    style = deepMerge(rectangleDefaults, style) as IRectangleStyle;
    super(style, options);
  }

  drawBase(): void {
    // draw circle
    this.roundRect(
      this.style.x,
      this.style.y,
      this.style.width * this.style.size,
      this.style.height * this.style.size,
      this.style.radius
    );
  }

}