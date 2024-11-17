import * as PIXI from 'pixi.js';
import { nodeStyleDefaults } from './defaults';
import { INodeStyle, IShapeFillStyle } from './types';
import { deepMerge } from '../../utils';
import { isEmptyObject } from '@/utils/validation';


export class NodeShapeBase extends PIXI.Graphics {

  options: INodeStyle

  constructor(options: Partial<INodeStyle> = nodeStyleDefaults) {
    super();
    this.options = deepMerge(nodeStyleDefaults, options) as INodeStyle
    this.drawShape(this.options)
  }

  drawShape(options: Partial<INodeStyle> = {}) {

    if (isEmptyObject(options)) {
      options = this.options
    }
    // draw fill
    if (options.fill) {
      const fillStyle: Partial<IShapeFillStyle> = {
        color: options.fill.color,
        alpha: options.fill.alpha,
      }
      // if using pattern
      if (options.fill.pattern) {
        fillStyle['pattern'] = options.fill.pattern
      }
      // if using matrix
      if (options.fill.matrix) {
        fillStyle['matrix'] = options.fill.matrix
      }
      // if using texture
      if (options.fill.texture) {
        fillStyle['texture'] = options.fill.texture
      }
      // if using gradient
      if (options.fill.gradient) {
        fillStyle['gradient'] = options.fill.gradient
      }
      this.fill(fillStyle);
    } else {
      throw new Error("Fill style is required for the node shape")
    }

    // draw border if exist
    if (options.border) {
      this.stroke({
        width: options.border.width,
        color: options.border.fill?.color,
        alpha: options.fill.alpha,
        alignment: options.border.alignment,
        cap: options.border.cap,
        join: options.border.join,
        miterLimit: options.border.miterLimit
      });
    }
  }


  // drawBorder() {
  //   // draw border
  //   this.lineStyle(options.border.width, options.border.fill.color);
  // }
}