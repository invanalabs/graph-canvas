import { INodeStyle } from "../../base/types";


export interface ISymmetricalPolygonStyle extends INodeStyle {
  radius: number
  sideLength: number
  sidesCount: number
}