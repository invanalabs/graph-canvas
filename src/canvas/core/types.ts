import { Node, Edge, ConnectionLineType, XYPosition, NodeTypes } from "reactflow"
import { CSSProperties } from "styled-components";

//https://stackoverflow.com/a/55032655/3448851
// Example usage : Modify<Node, { a: string}> // to override `a` data type
type Modify<T, R> = Omit<T, keyof R> & R;

export type NodeField = {
    id: string
    label: string
    data_type?: string
}
export type CanvasNodeData = {
    // data property in the Node 
    label: string
    fields?: NodeField[]
}


export type CanvasNode = Modify<Node, {
    data: CanvasNodeData
    position?: XYPosition
    // fields?: NodeField[]
}>

export type CanvasEdge = Edge;

export type CanvasNodeProps = {
    id: string
    data: CanvasNodeData
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
    children?: React.ReactNode,
    initialNodes: CanvasNode[],
    initialEdges?: CanvasEdge[],
    canvasSettings?: CanvasSettingsType,
    style?: CSSProperties,
    canvasNodeTemplates?: NodeTypes 
}


export interface NodeProps {
    id: string;
    label: string;
    selected: boolean;
    color?: string;
    content: React.ReactNode;
  }
  