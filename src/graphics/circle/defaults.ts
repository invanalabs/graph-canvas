import { ICircleStyle } from "./types";


export const circleDefauts: ICircleStyle = {
  x: 100,
  y: 100,
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

    fill: { color: 0xffffff, alpha: 1 }
  }
}