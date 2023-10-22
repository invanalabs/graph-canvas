import { Edge, Node, ReactFlowInstance } from "reactflow"
import { CanvasNode } from "./core/types";



type FlowInstanceType = ReactFlowInstance | undefined | null;

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
        flowInstance?.setEdges((eds) =>
            eds.map((edg) => {
                if (edg.id === edge.id) {
                    edg.style = { stroke: "red" };
                }
                return edg;
            })
        );
    }
    onEdgeMouseLeave = (event: React.MouseEvent, edge: Edge, flowInstance: FlowInstanceType) => {
        console.log("==onEdgeMouseLeave", event, edge, flowInstance, flowInstance?.getEdges());
        flowInstance?.setEdges((eds) =>
            eds.map((edg) => {
                if (edg.id === edge.id) {
                    edg.style = { stroke: "#ccc" };
                }
                return edg;
            })
        );
    }
    onEdgeContextMenu = (event: React.MouseEvent, edge: Edge) => { }



    onNodeClick = (event: React.MouseEvent, edge: Edge) => { }
    onNodeDoubleClick = (event: React.MouseEvent, edge: Edge) => { }
    onNodeMouseEnter = (event: React.MouseEvent, node: Node, flowInstance: FlowInstanceType) => {
        console.log("==onNodeMouseEnter", event, node, flowInstance, flowInstance?.getNodes());
        const el = document.querySelector(".react-flow__node[data-id='"+ node.id+"']");
        console.log("=====onNodeMouseEnter el", el)
        if (el){
            el.style.borderColor = "red";
        }
    }

    onNodeMouseLeave = (event: React.MouseEvent, node: Node, flowInstance: FlowInstanceType) => { 
        console.log("==onNodeMouseLeave", event, node, flowInstance, flowInstance?.getNodes());
        const el = document.querySelector(".react-flow__node[data-id='"+ node.id+"']");
        console.log("=====onNodeMouseLeave el", el)
        if (el){
            el.style.borderColor =  "var(--canvas-border)";
        }
    }
    onNodeContextMenu = (event: React.MouseEvent, edge: Edge) => { }


    onSelectionContextMenu = (event: React.MouseEvent, nodes: Node[]) => { }
}