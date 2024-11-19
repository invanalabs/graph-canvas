import * as PIXI from 'pixi.js';
import { deepMerge } from '@/utils';
import { ILinkOptions, linkOptionsDefaults, LinkShapeBase, } from './base';
import { drawBezierCurveLineShape, drawCubicBezierCurveLineShape } from './base/utils';


export interface IBezierCurveLineOptions extends ILinkOptions { }

export const straightLineOptionsDefauts: IBezierCurveLineOptions = linkOptionsDefaults

export class BezierCurveLine extends LinkShapeBase {

  declare options: IBezierCurveLineOptions;

  constructor(options: Partial<IBezierCurveLineOptions> = straightLineOptionsDefauts,) {
    options = deepMerge(straightLineOptionsDefauts, options) as IBezierCurveLineOptions;
    super(options);
  }

  drawBase(gfx: PIXI.Graphics): void {
    // This means that gfx.drawCircle(0, 0, 50) will
    // draw a circle centered at (0, 0) within the graphics
    // object's local coordinates.
    drawCubicBezierCurveLineShape(gfx, this.options.source, this.options.target)

  }

}