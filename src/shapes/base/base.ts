import * as PIXI from 'pixi.js';
import { nodeStyleDefaults } from './defaults';
import { INodeStyle, IShapeFillStyle } from './types';
import { deepMerge } from '../../utils';
import { isEmptyObject } from '@/utils/validation';


export abstract class NodeShapeBase extends PIXI.Graphics {

  style: INodeStyle

  constructor(style: Partial<INodeStyle> = nodeStyleDefaults) {
    super();
    this.style = deepMerge(nodeStyleDefaults, style) as INodeStyle
    this.drawBase()
    this.setShapeStyle(this.style)
  }

  /*
  *  Abstract method to draw the base shape like circle, rectangle, etc.
  */
  abstract drawBase(): void;

  /*
  * This will set the style of the shape like fill, border, etc.
  */
  setShapeStyle(style: Partial<INodeStyle> = {}) {

    if (isEmptyObject(style)) {
      style = this.style
    }
    // draw fill
    if (style.fill) {
      const fillStyle: Partial<IShapeFillStyle> = {
        color: style.fill.color,
        alpha: style.fill.alpha,
      }
      // if using pattern
      if (style.fill.pattern) {
        fillStyle['pattern'] = style.fill.pattern
      }
      // if using matrix
      if (style.fill.matrix) {
        fillStyle['matrix'] = style.fill.matrix
      }
      // if using texture
      if (style.fill.texture) {
        fillStyle['texture'] = style.fill.texture
      }
      // if using gradient
      if (style.fill.gradient) {
        fillStyle['gradient'] = style.fill.gradient
      }
      this.fill(fillStyle);
    } else {
      throw new Error("Fill style is required for the node shape")
    }

    // draw border if exist
    if (style.border) {
      this.stroke({
        width: style.border.width,
        color: style.border.fill?.color,
        alpha: style.fill.alpha,
        alignment: style.border.alignment,
        cap: style.border.cap,
        join: style.border.join,
        miterLimit: style.border.miterLimit
      });
    }
  }


  // drawBorder() {
  //   // draw border
  //   this.lineStyle(style.border.width, style.border.fill.color);
  // }
}