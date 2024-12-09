import { Edge, Node, ReactFlowInstance } from "reactflow";
import FindNeighbors from "./neighbours";

const findNeighbors = new FindNeighbors();

export default class CanvasInteractionActions {

    highlightNodeAndNeighbors = (event: React.MouseEvent, node: Node, flowInstance: ReactFlowInstance) => {
        const edges = flowInstance.getEdges();
        const allEdges = findNeighbors.getNextBothEdges(node.id, edges);
        allEdges.forEach((edge: Edge) => {
            this.highlightEdgeNeighbors(event, edge, flowInstance);
        });
    }

    unHighlightNodeAndNeighbors = (event: React.MouseEvent, node: Node, flowInstance: ReactFlowInstance) => {
        const edges = flowInstance.getEdges();
        const allEdges = findNeighbors.getNextBothEdges(node.id, edges);
        allEdges.forEach((edge: Edge) => {
            this.unHighlightEdgeNeighbors(event, edge, flowInstance);
        });
    }

    highlightEdgeNeighbors = (event: React.MouseEvent, edge: Edge, flowInstance: ReactFlowInstance) => {
        console.log("highlightEdgeNeighbors", edge, event);
        const sourceNode = flowInstance.getNode(edge.source);
        const targetNode = flowInstance.getNode(edge.target);

        if (sourceNode) {
            this.highlightNode(sourceNode, flowInstance);
        }

        if (targetNode) {
            this.highlightNode(targetNode, flowInstance);
        }

        this.highlightEdge(edge, flowInstance);
    }

    unHighlightEdgeNeighbors = (event: React.MouseEvent, edge: Edge, flowInstance: ReactFlowInstance) => {
        console.log("unHighlightEdgeNeighbors", edge, event);
        const sourceNode = flowInstance.getNode(edge.source);
        const targetNode = flowInstance.getNode(edge.target);

        if (sourceNode) {
            this.unHighlightNode(sourceNode, flowInstance);
        }

        if (targetNode) {
            this.unHighlightNode(targetNode, flowInstance);
        }

        this.unHighlightEdge(edge, flowInstance);
    }

    highlightNode = (node: Node, flowInstance: ReactFlowInstance) => {
        console.log("highlightNode", node, flowInstance);
        const el = document.querySelector(".react-flow__node[data-id='" + node.id + "']");
        if (el) {
            (el as HTMLElement).style.borderColor = "green";
        }
    }

    unHighlightNode = (node: Node, flowInstance: ReactFlowInstance) => {
        console.log("unHighlightNode", node, flowInstance);
        const el = document.querySelector(".react-flow__node[data-id='" + node.id + "']");
        if (el) {
            (el as HTMLElement).style.borderColor = "var(--canvas-border)";
        }
    }

    highlightEdge = (edge: Edge, flowInstance: ReactFlowInstance) => {
        flowInstance?.setEdges((eds) =>
            eds.map((edg) => {
                if (edg.id === edge.id) {
                    edg.style = { strokeWidth: 2 };
                    edg.animated = true;
                }
                return edg;
            })
        );
    }

    unHighlightEdge = (edge: Edge, flowInstance: ReactFlowInstance) => {
        flowInstance?.setEdges((eds) =>
            eds.map((edg) => {
                if (edg.id === edge.id) {
                    edg.style = { strokeWidth: 1 };
                    edg.animated = false;
                }
                return edg;
            })
        );
    }
}