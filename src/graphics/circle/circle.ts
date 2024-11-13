import * as PIXI from 'pixi.js';
import { circleDefauts } from './defaults';
import { ICircleOptions } from './types';
import { deepMerge } from '../../utils';


export class Circle extends PIXI.Graphics {

  options: ICircleOptions

  constructor(options: Partial<ICircleOptions> = circleDefauts) {
    super();
    this.options = deepMerge(circleDefauts, options) as ICircleOptions

    // const {
    //   x = 0,
    //   y = 0,
    //   radius = 50,
    //   fill = 0xff0000,
    //   alpha = 1
    // } = options;

    this.circle(this.options.x, this.options.y, this.options.radius);
    this.fill({ color: this.options.fill, alpha: this.options.alpha });

    // this.beginFill(fill, alpha);
    // this.drawCircle(x, y, radius);
    // this.endFill();
  }
}