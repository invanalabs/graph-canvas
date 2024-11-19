import { INodePosition } from "@/shapes/nodes";
import { Graphics } from "pixi.js";


// draw lin between 2 points using pixi.js
export const drawStraightLineShape = (gfx: Graphics, source: INodePosition, target: INodePosition) => {

  gfx.moveTo(source.x, source.y);
  gfx.lineTo(target.x, target.y);
  return gfx;
}

export const drawBezierCurveLineShape = (gfx: Graphics, source: INodePosition, target: INodePosition,
  curvature: number = 100) => {
  const bezierRatio = 0.2; // Adjust this ratio as needed
  const controlPointX1 = source.x + (target.x - source.x) * bezierRatio + curvature;
  const controlPointY1 = source.y;
  const controlPointX2 = target.x - (target.x - source.x) * bezierRatio - curvature;
  const controlPointY2 = target.y;

  gfx.moveTo(source.x, source.y);
  gfx.bezierCurveTo(
    controlPointX1, controlPointY1,
    controlPointX2, controlPointY2,
    target.x, target.y
  );
}

export const drawCubicBezierCurveLineShape = (gfx: Graphics, source: INodePosition, target: INodePosition,
  roundnessRatio: number = 0.7) => {
  const roundness = (target.y - source.y) * roundnessRatio;
  const controlPointX1 = source.x + (target.x - source.x) / 3;
  const controlPointY1 = source.y + roundness;
  const controlPointX2 = target.x - (target.x - source.x) / 3;
  const controlPointY2 = target.y - roundness;

  gfx.moveTo(source.x, source.y);
  gfx.bezierCurveTo(
    controlPointX1, controlPointY1,
    controlPointX2, controlPointY2,
    target.x, target.y
  );
}
