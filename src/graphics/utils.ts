import { Point} from "pixi.js";
import { CanvasNode } from "./types";


export const getCirclePont = (
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