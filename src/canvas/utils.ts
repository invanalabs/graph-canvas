import {CanvasEdge, CanvasNode} from "./types";
import {Node, Edge, Data, Options, NetworkEvents} from "vis-network/declarations/network/Network";
import {copyObject} from "../eventStore/utils";

const convertCanvasNodeToVisNode = (canvasNodes: CanvasNode[]): Node[] => {
    let nodes: Node[] = []
    canvasNodes.forEach(canvasNode => {
        let node: Node = copyObject(canvasNode)
        node.group = canvasNode.label
        nodes.push(node)
    })
    return nodes
}

const convertCanvasEdgeToVisEdge = (canvasEdges: CanvasEdge[]):Edge[] => {
    let edges: Edge[] = []
    canvasEdges.forEach(canvasEdge => {
        let edge: Edge = copyObject(canvasEdge)
        // edge.group = canvasEdge.label
        edges.push(edge)
    })
    return edges
}
export {convertCanvasNodeToVisNode, convertCanvasEdgeToVisEdge}