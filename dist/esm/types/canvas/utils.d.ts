import { CanvasEdge, CanvasNode } from "./types";
import { Node, Edge } from "vis-network/declarations/network/Network";
declare const convertCanvasNodeToVisNode: (canvasNodes: CanvasNode[]) => Node[];
declare const convertCanvasEdgeToVisEdge: (canvasEdges: CanvasEdge[]) => Edge[];
declare const detectNodeSizeBasedOnEdges: (allNodes: any[], allEdges: any[]) => Node[];
declare const createCanvasNode: (data: any) => CanvasNode;
declare const createCanvasEdge: (data: any) => CanvasEdge;
export { convertCanvasNodeToVisNode, convertCanvasEdgeToVisEdge, detectNodeSizeBasedOnEdges, createCanvasEdge, createCanvasNode };
