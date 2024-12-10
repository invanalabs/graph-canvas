import { CanvasEdge, CanvasNode, LayoutEngineResponse } from "../core/types";
import { FlowInstanceType } from "../interactions/interactions";
import { LayoutEngine } from "./abstract";


export default class NoLayoutEngine extends LayoutEngine {

  getLayoutedElements(
    nodes: CanvasNode[],
    edges: CanvasEdge[],
    flowInstance: FlowInstanceType,
    direction: string
  ): LayoutEngineResponse {
    console.log("=====NoLayoutEngine", nodes, edges, flowInstance, direction);
    return { layoutedNodes: nodes, layoutedEdges: edges };
  }
}