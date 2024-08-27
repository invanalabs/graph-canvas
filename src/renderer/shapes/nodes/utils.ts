import { CanvasNode } from "../../../store"


export const getSizeBasedOnDegree=( node: CanvasNode): number=>{
  const nodeSize = node.style.size as number;
  const nodeDegree = node.degree?.total as number
  return nodeSize * Math.log(nodeDegree + 1)
}