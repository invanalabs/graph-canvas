import * as PIXI from 'pixi.js';
import { linkOptionsDefaults } from './defaults';
import { ILinkStyle, ILinkOptions, ILinkFillStyle } from './types';
import { deepMerge } from '@/utils';
import { isEmptyObject } from '@/utils/validation';


export abstract class LinkShapeBase extends PIXI.Graphics {

  options: ILinkOptions

  imageSprite: PIXI.Sprite | null = null;
  iconSprite: PIXI.Sprite | null = null;


  constructor(options: Partial<ILinkOptions> = linkOptionsDefaults) {
    super(options.renderOptions);
    this.options = deepMerge(linkOptionsDefaults, options || {}) as ILinkOptions
    this.drawBase(this)
    this.setShapeStyle(this.options.style)
  }

  /*
  *  Abstract method to draw the base shape like straight, curved, lines etc.
  */
  abstract drawBase(gfx: PIXI.Graphics): void;


  /*
  * This will set the style of the shape like fill, border, etc.
  */
  setShapeStyle(style: Partial<ILinkStyle> = {}) {
    console.log('Setting shape style', style)
    if (isEmptyObject(style)) {
      style = this.options.style
    }
    // draw fill
    if (style.fill && isEmptyObject(style.fill) === false) {
      const fillStyle = {
        width: style.thickness,
        color: style.fill.color,
        alpha: style.fill.alpha,
      }
      this.stroke(fillStyle);
    } else {
      throw new Error("Fill style is required for the node shape")
    }

  }

}