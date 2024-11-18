/*
These functions are used to create just shapes, no filling colors etc.
*/
import * as PIXI from "pixi.js";


export const drawCircleShape = (gfx: PIXI.Graphics, x: number, y: number, radius: number) => {
  gfx.circle(x, y, radius);
}