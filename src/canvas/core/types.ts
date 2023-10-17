import { Node, Edge } from "reactflow"


export type NodeField = {
    id: string,
    name: string,
    data_type: string
}
export type CanvasNodeData = {
    // data property in the Node 
    name: string,
    fields: NodeField[]
}
export type CanvasNode = Node & {
    data: CanvasNodeData
}

export type CanvasEdge = Edge;

export type CanvasNodeProps = {
    id: string,
    data: CanvasNodeData,
    selected: boolean
}

export type FlowCanvasProps = {
    children: React.ReactNode,
    initialNodes: CanvasNode[],
    initialEdges: CanvasEdge[]
}

export type StringOrNull = string | null | undefined;