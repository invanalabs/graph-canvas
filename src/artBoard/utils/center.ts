import { CanvasNode } from "../../store";
import { Point } from "pixi.js"


export const getNodesPOV = (nodes: CanvasNode[]) => {
  // Zooms out so all or selected nodes fit on the canvas.  
  const nodesX = nodes.map((node: CanvasNode) => node.x);
  const nodesY = nodes.map((node: CanvasNode) => node.y);

  // @ts-ignore
  const minX = Math.min(...nodesX);
  // @ts-ignore
  const maxX = Math.max(...nodesX);
  // @ts-ignore
  const minY = Math.min(...nodesY);
  // @ts-ignore
  const maxY = Math.max(...nodesY);

  const min = new Point(minX, minY);
  const max = new Point(maxX, maxY)
  return { min, max }
}


export const getCenter = (nodes: CanvasNode[], padding: number = 50) => {

  const { min, max } = getNodesPOV(nodes)

  const graphWidth = Math.abs(max.x - min.x) + (padding * 2);
  const graphHeight = Math.abs(max.y - min.y);

  // draw a debug box
  const center = new Point(
    min.x + graphWidth / 2,
    min.y + graphHeight / 2
  );
  // const start = min;
  return { center, max, min, graphWidth, graphHeight }
}
