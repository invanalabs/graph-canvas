import { rectangleDefaults } from './defaults';
import { IRectangleStyle } from './types';
import { deepMerge } from '../../utils';
import { NodeShapeBase } from '../base';


export class Rectangle extends NodeShapeBase {

  options: IRectangleStyle

  constructor(options: Partial<IRectangleStyle> = rectangleDefaults) {
    super();
    this.options = deepMerge(rectangleDefaults, options) as IRectangleStyle

    // draw circle
    this.roundRect(
      this.options.x,
      this.options.y,
      this.options.width * this.options.size,
      this.options.height * this.options.size,
      this.options.radius
    );
    this.drawShape()
  }


}