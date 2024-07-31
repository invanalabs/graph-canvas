import { Graphics, Point } from "pixi.js";
import { vec2 } from 'gl-matrix';
import type { Polygon } from "pixi.js";
import { ILinkShapeStyles } from "../types";
import { CanvasNode } from "../../../store";


export const getContactPointOnCircle = (
  source: CanvasNode,
  target: CanvasNode,
  padding: number = 2
) => {

  // console.debug("====target", target, padding)
  // getCirclePont
  const nodeRadius = target?.style?.size + padding ? target?.style?.size : 20
  // console.debug("===nodeRadius", nodeRadius)
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
  // padding = padding * -1;
  return getContactPointOnCircle(target, source, padding * -1)
}

export const getLinkLabelPosition = (source: CanvasNode, target: CanvasNode, shapeType: ILinkShapeStyles) => {
  return getCenterBetweenTwoPoints(source, target, shapeType)
}

export const getCenterBetweenTwoPoints = (source: CanvasNode, target: CanvasNode, shapeType: ILinkShapeStyles) => {
  console.debug("getCenterBetweenTwoPoints", source.x, source.y, target.x, target.y)
  // if (startX && startY && endX && endY){
    const centerX = (source.x + target.x) / 2;
    const centerY = (source.y + target.y) / 2;
    return new Point(centerX, centerY);
    // }else{
    //   throw Error(`invalid ${source} and ${target}`);
    // }
}


export const getCenterOfRectangle = (width: number, height: number, x: number, y:number)=> {
  const centerX = x + width / 2;
  const centerY = y + height / 2;
  return new Point(centerX, centerY)
}

export const getAngle = (source: CanvasNode, target: CanvasNode): number => {
  // Get the angle between the link line and the horizontal line
  const radian = Math.atan2(target.y - source.y, target.x - source.x);
  return radian * (180 / Math.PI);
};


export const getControlPoint = (
  source: Point,
  target: Point,
  percent: number = 0,
  offset: number = 0
): Point => {
  const point: Point = new Point(
    (1 - percent) * source.x + percent * target.x,
    (1 - percent) * target.y + percent * target.y
  );

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
  console.debug("getPointOnDistanceOverRadius twoPointDistance", p1, p2)
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

export function getPointOnDistanceOverRadius(points: number[], radius: number) {
  console.debug("getPointOnDistanceOverRadius,", points, radius)
  const result = [];
  for (let i = 0; i < points.length; i += 2) {
    const x = points[i];
    const y = points[i + 1];
    const point = { x, y };
    result.push(point);
  }
  result.reverse();
  let point = result[0];
  console.debug("getPointOnDistanceOverRadius result", result)
  return result.find((n) => {
    return twoPointDistance(n, point) > radius;
  });
}


export const getGraphicsPathPoints = (graphics: Graphics) => {
  // const points: Point[] = []
  //@ts-ignore
  const points = (graphics.geometry.graphicsData[0].shapeName as Polygon)
  // graphics.geometr.graphicsData.forEach(command => {
  //   // Add the points of the command to the points array
  //   if (command.points) {
  //     points.push(...command.points);
  //   }
  // });
  console.debug("===points", points)
  return points
}