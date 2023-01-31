import {CanvasEdge, CanvasNode} from "./types";
import {Node, Edge, Data, Options, NetworkEvents} from "vis-network/declarations/network/Network";
import {copyObject} from "../eventStore/utils";
import { nodeStateSufix } from "./defaults";


const convertCanvasNodeToVisNode = (canvasNodes: CanvasNode[]): Node[] => {
    let nodes: Node[] = []
    canvasNodes.forEach(canvasNode => {
        let node: Node = copyObject(canvasNode)
        node.group = canvasNode.label + "-" + nodeStateSufix.DEFAULT
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

const createCanvasNode = (data: any): CanvasNode => {
    return {
        id: data.id,
        label: data.label,
        properties: data.properties
    }
}

const createCanvasEdge = (data: any): CanvasEdge => {
    return {
        id: data.id,
        from: data.from,
        to: data.to,
        label: data.label,
        properties: data.properties
    }
}

export {
    convertCanvasNodeToVisNode, convertCanvasEdgeToVisEdge,
    detectNodeSizeBasedOnEdges, createCanvasEdge, createCanvasNode
}