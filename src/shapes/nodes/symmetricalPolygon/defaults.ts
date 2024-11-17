import { ISymmetricalPolygonStyle } from "./types";
import { nodeStyleDefaults } from "../../base";


export const symmetricalPolygonDefaults: ISymmetricalPolygonStyle = {
  ...nodeStyleDefaults,
  sideLength: 10,
  size: 5,
  radius: 2,
  sidesCount: 3
}