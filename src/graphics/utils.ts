import { Point} from "pixi.js";
import { CanvasNode } from "./types";
import { LinkShapeTypes } from "./types";


export const getContactPointOnCircle = (
    source: CanvasNode,
    target: CanvasNode,
    padding: number = 2
  ) => {

    const nodeRadius = target?.gfxInstance?.size  +  padding
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
  ) =>{
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
  source: CanvasNode,
  target: CanvasNode,
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
