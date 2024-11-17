import { circleDefauts } from './defaults';
import { ICircleStyle } from './types';
import { IShapeFillStyle } from '../../base/types';
import { deepMerge } from '../../../utils';
import { NodeShapeBase } from '../../base';


export class Circle extends NodeShapeBase {

  options: ICircleStyle

  constructor(options: Partial<ICircleStyle> = circleDefauts) {
    super();
    this.options = deepMerge(circleDefauts, options) as ICircleStyle

    // draw circle
    this.circle(this.options.x, this.options.y, this.options.size);
    this.drawShape()
  }


}