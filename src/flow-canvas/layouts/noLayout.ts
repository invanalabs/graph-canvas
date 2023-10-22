import { CanvasEdge, CanvasNode } from "../core/types";
import { FlowInstanceType } from "../interactions/interactions";


export const defaultLayoutChange = (nodes: CanvasNode[], edges: CanvasEdge[], flowInstance: FlowInstanceType, direction: string) => {
    console.log("=====defaultLayoutChange", nodes, edges)
    return {layoutedNodes: nodes, layoutedEdges: edges}
}