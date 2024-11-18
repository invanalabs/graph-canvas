import { INodeStyle } from "./types";


export const nodeStyleDefaults: INodeStyle = {
  x: 0,
  y: 0,
  size: 20,
  fill: {
    color: 0x0C88CF,
    alpha: 1
  },
  border: {
    width: 4,
    alignment: 0,
    // cap?: LineCap;
    // /** The line join style to use. */
    // join?: LineJoin;
    // /** The miter limit to use. */
    // miterLimit?: number;
    fill: { color: 0x555555, alpha: 1 }
  }
}