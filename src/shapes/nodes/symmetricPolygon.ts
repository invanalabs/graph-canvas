import { deepMerge } from "@/utils"
import { INodeStyle, NodeShapeBase, nodeStyleDefaults } from "../base"


export interface ISymmetricalPolygonStyle extends INodeStyle {
  radius: number
  sideLength: number
  sidesCount: number
}

export const symmetricalPolygonDefaults: ISymmetricalPolygonStyle = {
  ...nodeStyleDefaults,
  sideLength: 10,
  size: 5,
  radius: 2,
  sidesCount: 3
}


export class SymmetricalPolygon extends NodeShapeBase {

  style: ISymmetricalPolygonStyle

  constructor(style: Partial<ISymmetricalPolygonStyle> = symmetricalPolygonDefaults) {
    super();
    this.style = deepMerge(symmetricalPolygonDefaults, style) as ISymmetricalPolygonStyle

    this.drawBase()
    this.setShapeStyle()
  }

  drawBase() {
    // Draw the symmetrical polygon
    this.roundPoly(
      this.style.x,
      this.style.y,
      this.style.sideLength * this.style.size,
      this.style.sidesCount,
      this.style.radius,
    )
  }

}