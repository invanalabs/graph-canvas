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


const convertCanvasEdgeToVisEdge = (canvasEdges: CanvasEdge[]): Edge[] => {
    let edges: Edge[] = []
    canvasEdges.forEach(canvasEdge => {
        let edge: Edge = copyObject(canvasEdge)
        // edge.group = canvasEdge.label
        edges.push(edge)
    })
    return edges
}


const detectNodeSizeBasedOnEdges = (allNodes: any[], allEdges: any[]) => {
    // add value to nodes
    let nodeLinkStats = {}
    allNodes.forEach((node: Node) => {
        // @ts-ignore
        nodeLinkStats[node.id] = 0
    })
    allEdges.forEach((edge: Edge) => {
        // @ts-ignore
        nodeLinkStats[edge.from] += 1
        // @ts-ignore
        nodeLinkStats[edge.to] += 1
    })
    let updatedNodesArray: Node[] = []
    allNodes.forEach((node: Node) => {
        // @ts-ignore
        let _ = copyObject(node)
        // @ts-ignore
        _.value = nodeLinkStats[node.id]
        updatedNodesArray.push(_)
    })

    return updatedNodesArray;
}

export {convertCanvasNodeToVisNode, convertCanvasEdgeToVisEdge,
    detectNodeSizeBasedOnEdges}