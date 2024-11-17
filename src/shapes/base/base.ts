import * as PIXI from 'pixi.js';
import { nodeStyleDefaults } from './defaults';
import { INodeStyle, IShapeFillStyle } from './types';
import { deepMerge } from '../../utils';


export class NodeShapeBase extends PIXI.Graphics {

  options: INodeStyle

  constructor(options: Partial<INodeStyle> = nodeStyleDefaults) {
    super();
    this.options = deepMerge(nodeStyleDefaults, options) as INodeStyle
    this.drawShape()
  }

  drawShape() {

    // draw fill
    if (this.options.fill) {
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
    } else {
      throw new Error("Fill style is required for the node shape")
    }

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