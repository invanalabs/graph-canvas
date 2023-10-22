import React from "react";
import { Node, Edge, ConnectionLineType, XYPosition, NodeTypes, EdgeTypes } from "reactflow"
import { CanvasNodeStylingOptions } from "../styling/types";
import DagreLayoutEngine from "../layouts/dagre";
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
    fields?: NodeField[]
    icon?: any, 
    body?: any,
    commentText?: string // TODO - move this to seperate CommentNode type 

    //
    label: string  // display label
    properties?: object
    type? : string // this equal to node label in graph ex: Person, Project, 
    stylingOptions?: CanvasNodeStylingOptions // coloring options
    templateOptions?: object // config to get the pre-defined templatefields data from all properties
    templateData?: object // template fields with data // 
    // different between properties and templateData is, templateData is subset of all 
    // the properties data.


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
    canvasEdgeTemplates?: EdgeTypes ,
    onLayoutChange?: any
}


export interface BaseNodeProps {
    id: string;
    label: string;
    selected: boolean;
    nodeStyles?: NodeStyles;
    header? : React.ReactNode;
    body?: React.ReactNode;
  }
  