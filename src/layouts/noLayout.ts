import { CanvasEdge, CanvasNode, LayoutEngineResponse } from "../core/types";
import { FlowInstanceType } from "../interactions/interactions";


export const defaultLayoutChange = (nodes: CanvasNode[], edges: CanvasEdge[],
    flowInstance: FlowInstanceType, direction: string): LayoutEngineResponse => {
    console.log("=====defaultLayoutChange", nodes, edges, flowInstance, direction)
    return { layoutedNodes: nodes, layoutedEdges: edges }
}


console.log("======defaultLayoutChange", defaultLayoutChange([], [], null, 'opk'));



// function defaultLayoutChange(nodes: CanvasNode[], edges: CanvasEdge[], flowInstance: FlowInstanceType, direction: string)  {
//     console.log("=====defaultLayoutChange", nodes, edges)
//     return {layoutedNodes: nodes, layoutedEdges: edges}
// }
// export defaultLayoutChange