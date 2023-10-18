import { Node, Edge, ConnectionLineType } from "reactflow"


export type NodeField = {
    id: string,
    label: string,
    data_type: string
}
export type CanvasNodeData = {
    // data property in the Node 
    label: string,
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

export type StringOrNull = string | null | undefined;

export type CanvasEdgeSettings = {
    type: ConnectionLineType;
    markerEnd?: object
    markerStart?: string
    animated?: boolean
    style?: object
}

export type CanvasNodeSettings = {
    type: string;
    style?: object
}

export type CanvasSettingsType = {
    edges: CanvasEdgeSettings
    nodes: CanvasNodeSettings
}

export type FlowCanvasProps = {
    children: React.ReactNode,
    initialNodes: CanvasNode[],
    initialEdges: CanvasEdge[],
    canvasSettings: CanvasSettingsType
}


export interface NodeProps {
    id: string;
    label: string;
    selected: boolean;
    color?: string;
    content: React.ReactNode;
  }
  