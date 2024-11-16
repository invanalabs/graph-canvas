import * as PIXI from 'pixi.js';
import { circleDefauts } from './defaults';
import { ICircleStyle } from './types';
import { IShapeFillStyle } from '../types';
import { deepMerge } from '../../utils';


export class Circle extends PIXI.Graphics {

  options: ICircleStyle

  constructor(options: Partial<ICircleStyle> = circleDefauts) {
    super();
    this.options = deepMerge(circleDefauts, options) as ICircleStyle


    this.drawShape()
    // }
    // this.fill({ color: this.options.fill, alpha: this.options.alpha });

    // this.beginFill(fill, alpha);
    // this.drawCircle(x, y, radius);
    // this.endFill();
  }

  drawShape() {
    // draw circle
    this.circle(this.options.x, this.options.y, this.options.radius);


    // draw fill
    const fillStyle: Partial<IShapeFillStyle> = {
      color: this.options.fill.color,
      alpha: this.options.fill.alpha,
    }
    // if using pattern
    if (this.options.fill.pattern) {
      fillStyle['pattern'] = this.options.fill.pattern
    }
    // if using matrix
    if (this.options.fill.matrix) {
      fillStyle['matrix'] = this.options.fill.matrix
    }
    // if using texture
    if (this.options.fill.texture) {
      fillStyle['texture'] = this.options.fill.texture
    }
    // if using gradient
    if (this.options.fill.gradient) {
      fillStyle['gradient'] = this.options.fill.gradient
    }
    this.fill(fillStyle);

    // draw border if exist
    if (this.options.border) {
      this.stroke({
        width: this.options.border.width,
        color: this.options.border.fill?.color,
        alpha: this.options.fill.alpha,
        alignment: this.options.border.alignment,
        cap: this.options.border.cap,
        join: this.options.border.join,
        miterLimit: this.options.border.miterLimit
      });
    }
  }


  // drawBorder() {
  //   // draw border
  //   this.lineStyle(this.options.border.width, this.options.border.fill.color);
  // }
}