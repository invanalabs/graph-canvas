/* eslint-disable @typescript-eslint/no-unused-vars */
import { Edge, Node, ReactFlowInstance } from "reactflow"
import CanvasInteractionActions from "./actions";


export type FlowInstanceType = ReactFlowInstance | undefined | null;
const canvasInteractionActions = new CanvasInteractionActions();


export default class CanvasInteractions {

    // https://reactflow.dev/docs/api/react-flow-props/
    onEdgeClick = (event: React.MouseEvent, edge: Edge, flowInstance?: FlowInstanceType) => {
        console.log("==onEdgeClick", event, edge, flowInstance, flowInstance?.getEdges());
        flowInstance?.setEdges((eds) =>
            eds.map((edg) => {
                if (edg.id === edge.id) {
                    edg.animated = true;
                }
                return edg;
            })
        );
    }

    // onEdgeDoubleClick = (event: React.MouseEvent, edge: Edge) => { }
    onEdgeMouseEnter = (event: React.MouseEvent, edge: Edge, flowInstance: FlowInstanceType) => {
        console.log("==onEdgeMouseEnter", event, edge, flowInstance, flowInstance?.getEdges());
        if (flowInstance) {
            canvasInteractionActions.highlightEdgeNeighbors(event, edge, flowInstance)
        }
    }

    onEdgeMouseLeave = (event: React.MouseEvent, edge: Edge, flowInstance: FlowInstanceType) => {
        console.log("==onEdgeMouseLeave", event, edge, flowInstance, flowInstance?.getEdges());
        if (flowInstance) {
            canvasInteractionActions.unHighlightEdgeNeighbors(event, edge, flowInstance)
        }
    }

    onNodeClick = (event: React.MouseEvent, edge: Edge) => {
        console.log("==onNodeClick", event, edge);
    }

    onNodeDoubleClick = (event: React.MouseEvent, edge: Edge) => {
        console.log("==onNodeDoubleClick", event, edge);
    }
    onNodeMouseEnter = (event: React.MouseEvent, node: Node, flowInstance: FlowInstanceType) => {
        console.log("==onNodeMouseEnter", node.id);
        if (flowInstance) { canvasInteractionActions.highlightNodeAndNeighbors(event, node, flowInstance) }
    }

    onNodeMouseLeave = (event: React.MouseEvent, node: Node, flowInstance: FlowInstanceType) => {
        console.log("==onNodeMouseLeave", node.id);
        if (flowInstance) { canvasInteractionActions.unHighlightNodeAndNeighbors(event, node, flowInstance) }
    }

    onNodeContextMenu = (event: React.MouseEvent, node: Node) => {
        console.log("==onNodeContextMenu", event, node);
    }

    // onEdgeContextMenu = (event: React.MouseEvent, edge: Edge) => { }

    // onSelectionContextMenu = (event: React.MouseEvent, nodes: Node[]) => { }

    onPaneClick = (event: React.MouseEvent, flowInstance: FlowInstanceType) => { // Called when user clicks directly on the canvas
        console.log("==onPaneClick", event, flowInstance);
    }

}