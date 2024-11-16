import { IRectangleStyle } from "./types";
import { nodeStyleDefaults } from "../base";


export const rectangleDefaults: IRectangleStyle = {
  ...nodeStyleDefaults,
  size: 5,
  width: 40,
  height: 10,
  radius: 3,
}