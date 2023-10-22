import { Edge, Node, ReactFlowInstance } from "reactflow"
import { CanvasNode } from "../core/types";
import CanvasInteractionActions from "./actions";


type FlowInstanceType = ReactFlowInstance | undefined | null;
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
        if (flowInstance){
            canvasInteractionActions.highlightEdge(edge, flowInstance)
        }
    }
    onEdgeMouseLeave = (event: React.MouseEvent, edge: Edge, flowInstance: FlowInstanceType) => {
        console.log("==onEdgeMouseLeave", event, edge, flowInstance, flowInstance?.getEdges());
        if (flowInstance){
            canvasInteractionActions.unHighlightEdge(edge, flowInstance)
        }
    }
    onEdgeContextMenu = (event: React.MouseEvent, edge: Edge) => { }



    onNodeClick = (event: React.MouseEvent, edge: Edge) => { }
    onNodeDoubleClick = (event: React.MouseEvent, edge: Edge) => { }
    onNodeMouseEnter = (event: React.MouseEvent, node: Node, flowInstance: FlowInstanceType) => {
        console.log("==onNodeMouseEnter", event, node, flowInstance, flowInstance?.getNodes());
        if (flowInstance) {canvasInteractionActions.highlightNodeAndNeighbors(event, node, flowInstance)}  
    }

    onNodeMouseLeave = (event: React.MouseEvent, node: Node, flowInstance: FlowInstanceType) => { 
        console.log("==onNodeMouseLeave", event, node, flowInstance, flowInstance?.getNodes());
        if (flowInstance) {canvasInteractionActions.unHightlightNodeAndNeighbors(event, node, flowInstance)}             
    }
    onNodeContextMenu = (event: React.MouseEvent, edge: Edge) => { }


    onSelectionContextMenu = (event: React.MouseEvent, nodes: Node[]) => { }


    onPaneClick = (event: React.MouseEvent, flowInstance: FlowInstanceType)=>{ // Called when user clicks directly on the canvas

    }
}