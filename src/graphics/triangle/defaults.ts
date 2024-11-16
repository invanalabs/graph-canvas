import { ITriangleStyle } from "./types";
import { nodeStyleDefaults } from "../base";


export const triangleDefaults: ITriangleStyle = {
  ...nodeStyleDefaults,
  sideSize: 10,
  size: 5,
  radius: 2
}