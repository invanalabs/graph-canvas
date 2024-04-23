import { Graphics, Point, Polygon } from "pixi.js";
import { CanvasNode } from "./types";
import { LinkShapeTypes } from "./types";
import { vec2 } from 'gl-matrix';
import type { Polygon } from `@pixi/core`;

export const getContactPointOnCircle = (
  source: CanvasNode,
  target: CanvasNode,
  padding: number = 2
) => {

  // getCirclePont
  const nodeRadius = target?.gfxInstance?.size + padding
  const arrowheadLength = 0;
  const angle = Math.atan2(target.y - source.y, target.x - source.x);
  let x = target.x - Math.cos(angle) * (nodeRadius + arrowheadLength);
  let y = target.y - Math.sin(angle) * (nodeRadius + arrowheadLength);
  return new Point(x, y)
};


export const getContactPointFromCircle = (
  source: CanvasNode,
  target: CanvasNode,
  padding: number = 2
) => {
  return getContactPointOnCircle(target, source, padding)
}

export const getLinkLabelPosition = (source: CanvasNode, target: CanvasNode, shapeType: LinkShapeTypes) => {

  // if (startX && startY && endX && endY){
  const x = (source.x + target.x) / 2;
  const y = (source.y + target.y) / 2;
  return new Point(x, y);
  // }else{
  //   throw Error(`invalid ${source} and ${target}`);
  // }
}

export const getAngle = (source: CanvasNode, target: CanvasNode): number => {
  // Get the angle between the link line and the horizontal line
  let radian = Math.atan2(target.y - source.y, target.x - source.x);
  return radian * (180 / Math.PI);
};


export const getControlPoint = (
  source: Point,
  target: Point,
  percent: number = 0,
  offset: number = 0
): Point => {
  const point: Point = {
    x: (1 - percent) * source.x + percent * target.x,
    y: (1 - percent) * target.y + percent * target.y
  };

  let tangent: any = [0, 0];
  vec2.normalize(tangent, [
    target.x - source.x,
    target.y - source.y
  ]);

  if (!tangent || (!tangent[0] && !tangent[1])) {
    tangent = [0, 0];
  }
  const perpendicular = [-tangent[1] * offset, tangent[0] * offset]; // 垂直向量
  point.x += perpendicular[0];
  point.y += perpendicular[1];
  return point;
};

export function twoPointDistance(p1: Point, p2: Point) {
  console.log("getPointOnDistanceOverRadius twoPointDistance", p1, p2)
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

export function getPointOnDistanceOverRadius(points: number[], radius: number) {
  console.log("getPointOnDistanceOverRadius,", points, radius)
  const result = [];
  for (let i = 0; i < points.length; i += 2) {
    const x = points[i];
    const y = points[i + 1];
    const point = { x, y };
    result.push(point);
  }
  result.reverse();
  let point = result[0];
  console.log("getPointOnDistanceOverRadius result", result)
  return result.find((n) => {
    return twoPointDistance(n, point) > radius;
  });
}


export const getGraphicsPathPoints = (graphics: Graphics) => {
  // const points: Point[] = []
  const points = (graphics.geometry.graphicsData[0].shape as Polygon)
  // graphics.geometr.graphicsData.forEach(command => {
  //   // Add the points of the command to the points array
  //   if (command.points) {
  //     points.push(...command.points);
  //   }
  // });
  console.log("===points", points)
  return points
}