import { CanvasEdge, CanvasNode } from "../../canvas/types";
declare const getSchemaLinksFromCanvasData: (nodes: CanvasNode[], edges: CanvasEdge[]) => {
    nodes: {};
    edges: unknown[];
};
declare const getSchemaNodesAndEdgesFromCanvasData: (nodes: CanvasNode[], edges: CanvasEdge[]) => {
    nodes: CanvasNode[];
    edges: CanvasEdge[];
};
export { getSchemaNodesAndEdgesFromCanvasData, getSchemaLinksFromCanvasData };
