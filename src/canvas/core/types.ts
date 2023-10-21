import React from "react";
import { Node, Edge, ConnectionLineType, XYPosition, NodeTypes, EdgeTypes } from "reactflow"

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
    icon?: any, 
    body?: any,
    commentText?: string // TODO - move this to seperate CommentNode type 
    properties?: object
}
// export type MyCustomCSS=  Modify<React.CSSProperties,   {
//     'absolute': string;
//   }>
export type NodeStyles  = {
    shape: React.CSSProperties,
    header: React.CSSProperties,
    body: React.CSSProperties,
    nodeContainerTargeHandleStyle?: React.CSSProperties,
    nodeContainerSourceHandleStyle?: React.CSSProperties
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
    style?: React.CSSProperties,
    canvasNodeTemplates?: NodeTypes,
    canvasEdgeTemplates?: EdgeTypes 
}


export interface NodeBaseProps {
    id: string;
    label: string;
    selected: boolean;
    nodeStyles?: NodeStyles;
    header? : React.ReactNode;
    body?: React.ReactNode;
  }
  