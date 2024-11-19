import * as PIXI from 'pixi.js';
import { nodeStyleDefaults } from './defaults';
import { INodeStyle, INodeFillStyle } from './types';
import { deepMerge } from '@/utils';
import { isEmptyObject } from '@/utils/validation';


export abstract class NodeShapeBase extends PIXI.Graphics {

  style: INodeStyle

  imageSprite: PIXI.Sprite | null = null;
  iconSprite: PIXI.Sprite | null = null;


  constructor(style: Partial<INodeStyle> = nodeStyleDefaults, options?: PIXI.GraphicsOptions) {
    super(options);
    this.style = deepMerge(nodeStyleDefaults, style || {}) as INodeStyle
    this.drawBase(this)
    // this.pivot.set(0.5);
    this.setShapeStyle(this.style)
    if (this.x && this.y) {
      this.setPosition(this.x, this.y)
    }
  }

  /*
  *  Abstract method to draw the base shape like circle, rectangle, etc.
  */
  abstract drawBase(gfx: PIXI.Graphics): void;

  setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;

    if (this.imageSprite) {
      this.imageSprite.x = x;
      this.imageSprite.y = y;
    }
    // this.pivot.set(0.5);

  }

  /*
  * This will set the style of the shape like fill, border, etc.
  */
  setShapeStyle(style: Partial<INodeStyle> = {}) {
    console.log('Setting shape style', style)
    if (isEmptyObject(style)) {
      style = this.style
    }
    // draw fill
    if (style.fill && isEmptyObject(style.fill) === false) {
      const fillStyle: Partial<INodeFillStyle> = {
        color: style.fill.color,
        alpha: style.fill.alpha,
      }
      // if using pattern
      // if (style.fill.pattern) {
      //   fillStyle['pattern'] = style.fill.pattern
      // }
      // // if using matrix
      // if (style.fill.matrix) {
      //   fillStyle['matrix'] = style.fill.matrix
      // }
      // // if using texture
      // if (style.fill.texture) {
      //   fillStyle['texture'] = style.fill.texture
      // }
      // // if using gradient
      // if (style.fill.gradient) {
      //   fillStyle['gradient'] = style.fill.gradient
      // }

      this.fill(fillStyle);

      // if using imageUrl
      if (style.fill.imageUrl) {
        this.createShapeFillImage(style)
      }
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

  createShapeFillImage(style: Partial<INodeStyle>) {
    if (!style.fill?.imageUrl) {
      throw new Error("Image URL is required when calling this method")
    }
    const imageUrl = style.fill.imageUrl
    const texturePromise = PIXI.Assets.load(imageUrl);

    // console.log("this.width, this.height", this.width, this.height)
    // // When the promise resolves, we have the texture!
    texturePromise.then((texture) => {

      this.imageSprite = PIXI.Sprite.from(texture);
      this.imageSprite.anchor.set(0.5);

      // Keeping the aspect ratio of the image
      const aspectRatio = this.imageSprite.texture.width / this.imageSprite.texture.height;
      const textureWidth = this.width + (this.style.border?.width || 0);
      if (aspectRatio > 1) {
        // Landscape image
        this.imageSprite.width = textureWidth;
        this.imageSprite.height = textureWidth / aspectRatio;
      } else {
        // Portrait or square image
        this.imageSprite.height = textureWidth;
        this.imageSprite.width = textureWidth * aspectRatio;
      }


      // Create mask
      const mask = new PIXI.Graphics();
      this.drawBase(mask);
      mask.fill({ color: this.style.fill.color, alpha: this.style.fill.alpha });
      // Apply the mask to the sprite
      this.imageSprite.mask = mask;
      // Add the sprite and the mask to the stage
      this.addChild(mask);
      this.addChild(this.imageSprite);
    })
  }

  // drawBorder() {
  //   // draw border
  //   this.lineStyle(style.border.width, style.border.fill.color);
  // }
}