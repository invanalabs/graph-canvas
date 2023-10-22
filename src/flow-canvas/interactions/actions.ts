import { Edge, Node, ReactFlowInstance, getConnectedEdges } from "reactflow";
import FindNeighbors from "./neighbours";

const findNeighbors = new FindNeighbors()

export default class CanvasInteractionActions {

    highlightNodeAndNeighbors= (event: React.MouseEvent,node: Node, flowInstance: ReactFlowInstance)=> {
        const edges = flowInstance.getEdges();
        const allEdges = findNeighbors.getNextBothEdges(node.id, edges);
        const _this = this;
        allEdges.forEach((edge: Edge)=>{
            _this.highlightNode(flowInstance.getNode(edge.source), flowInstance);
            _this.highlightNode(flowInstance.getNode(edge.target), flowInstance);
            _this.highlightEdge(edge, flowInstance)
        })
    }

    unHightlightNodeAndNeighbors = (event: React.MouseEvent,node: Node, flowInstance: ReactFlowInstance)=>{
        const edges = flowInstance.getEdges();
        const allEdges = findNeighbors.getNextBothEdges(node.id, edges);
        const _this = this;
        allEdges.forEach((edge: Edge)=>{
            _this.unHighlightNode(flowInstance.getNode(edge.source), flowInstance);
            _this.unHighlightNode(flowInstance.getNode(edge.target), flowInstance);
            _this.unHighlightEdge(edge, flowInstance);
        })
        
    }

    // hightlightEdgeNeighbors




    // unHighlightEdgeNeighbors 

 

    highlightNode= (node: Node, flowInstance: ReactFlowInstance)=> {
        const el = document.querySelector(".react-flow__node[data-id='"+ node.id+"']");
        if (el){
            el.style.borderColor = "green";
        }
    }

    unHighlightNode = ( node: Node, flowInstance: ReactFlowInstance)=>{
        const el = document.querySelector(".react-flow__node[data-id='"+ node.id+"']");
        console.log("=====onNodeMouseLeave el", el)
        if (el){
            el.style.borderColor =  "var(--canvas-border)";
        }
    }



    highlightEdge= (edge: Edge, flowInstance: ReactFlowInstance)=> {
        flowInstance?.setEdges((eds) =>
            eds.map((edg) => {
                if (edg.id === edge.id) {
                    // edg.style = { stroke: "green" };
                    edg.animated = true
                }
                return edg;
            })
        );
    }
    unHighlightEdge = (edge: Edge, flowInstance: ReactFlowInstance)=> {
        flowInstance?.setEdges((eds) =>
        eds.map((edg) => {
            if (edg.id === edge.id) {
                // edg.style = { stroke: "#ccc" };
                edg.animated = false
            }
            return edg;
        })
    );
    }






    // showNodeContextMenu

    // showEdgeContextMenu

    // hideNodeContextMenu

    // hideEdgeContextMenu



}