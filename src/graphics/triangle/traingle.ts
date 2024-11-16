import { triangleDefaults } from './defaults';
import { ITriangleStyle } from './types';
import { deepMerge } from '../../utils';
import { NodeShapeBase } from '../base';


export class Triangle extends NodeShapeBase {

  options: ITriangleStyle

  constructor(options: Partial<ITriangleStyle> = triangleDefaults) {
    super();
    this.options = deepMerge(triangleDefaults, options) as ITriangleStyle

    // Draw the triangle
    this.roundPoly(
      this.options.x,
      this.options.y,
      this.options.sideSize * this.options.size,
      3,
      this.options.radius,
    )
    this.drawShape()
  }


}