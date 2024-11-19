import * as PIXI from 'pixi.js';
import { deepMerge } from '@/utils';
import { ILinkOptions, linkOptionsDefaults, LinkShapeBase, } from './base';
import { drawStraightLineShape } from './base/utils';



export interface IStraightLineOptions extends ILinkOptions { }

export const straightLineOptionsDefauts: IStraightLineOptions = linkOptionsDefaults

export class StraightLine extends LinkShapeBase {

  declare options: IStraightLineOptions;

  constructor(options: Partial<IStraightLineOptions> = straightLineOptionsDefauts,) {
    options = deepMerge(straightLineOptionsDefauts, options) as IStraightLineOptions;
    super(options);
  }

  drawBase(gfx: PIXI.Graphics): void {
    // This means that gfx.drawCircle(0, 0, 50) will
    // draw a circle centered at (0, 0) within the graphics
    // object's local coordinates.
    drawStraightLineShape(gfx, this.options.source, this.options.target)

  }

}