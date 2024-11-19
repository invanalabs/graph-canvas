import { INodePosition } from "@/shapes/nodes";
import { Graphics } from "pixi.js";


// draw lin between 2 points using pixi.js
export const drawStraightLineShape = (gfx: Graphics, source: INodePosition, target: INodePosition) => {

  gfx.moveTo(source.x, source.y);
  gfx.lineTo(target.x, target.y);
  return gfx;
}