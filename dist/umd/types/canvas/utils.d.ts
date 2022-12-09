import { CanvasEdge, CanvasNode } from "./types";
import { Node, Edge } from "vis-network/declarations/network/Network";
declare const convertCanvasNodeToVisNode: (canvasNodes: CanvasNode[]) => Node[];
declare const convertCanvasEdgeToVisEdge: (canvasEdges: CanvasEdge[]) => Edge[];
export { convertCanvasNodeToVisNode, convertCanvasEdgeToVisEdge };
