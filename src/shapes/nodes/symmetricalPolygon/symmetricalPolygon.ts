import { symmetricalPolygonDefaults } from './defaults';
import { ISymmetricalPolygonStyle } from './types';
import { deepMerge } from '../../../utils';
import { NodeShapeBase } from '../../base';


export class SymmetricalPolygon extends NodeShapeBase {

  options: ISymmetricalPolygonStyle

  constructor(options: Partial<ISymmetricalPolygonStyle> = symmetricalPolygonDefaults) {
    super();
    this.options = deepMerge(symmetricalPolygonDefaults, options) as ISymmetricalPolygonStyle

    // Draw the symmetrical polygon
    this.roundPoly(
      this.options.x,
      this.options.y,
      this.options.sideLength * this.options.size,
      this.options.sidesCount,
      this.options.radius,
    )
    this.drawShape()
  }


}