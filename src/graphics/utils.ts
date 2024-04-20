import { Point} from "pixi.js";
import { CanvasNode } from "./types";
import { LinkShapeTypes } from "./types";


export const getContactPointOnCircle = (
    source: CanvasNode,
    target: CanvasNode,
    nodeRadius : number
  ) => {
    const arrowheadLength = 0;
    const angle = Math.atan2(target.y - source.y, target.x - source.x);
    let x = target.x - Math.cos(angle) * (nodeRadius + arrowheadLength);
    let y = target.y - Math.sin(angle) * (nodeRadius + arrowheadLength);
    return new Point(x, y)
};

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
