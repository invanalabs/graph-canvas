import React from "react";
import { Node, Edge, ConnectionLineType, XYPosition, NodeTypes, EdgeTypes } from "reactflow"
import { CanvasNodeStylingOptions } from "../styling/types";
// import DagreLayoutEngine from "../layouts/dagre";
import CanvasInteractions, { FlowInstanceType } from "../interactions/interactions";
import { ContextMenuType } from "../components/ContextMenu/types";
import { LayoutEngine } from "../layouts/abstract";
//https://stackoverflow.com/a/55032655/3448851
// Example usage : Modify<Node, { a: string}> // to override `a` data type
type Modify<T, R> = Omit<T, keyof R> & R;

export type NodeField = {
    id: string
    label: string
    data_type?: string
}

export type CanvasIcon = React.ReactNode

export type CanvasNodeData = {
    // data property in the Node 
    fields?: NodeField[]
    icon?: CanvasIcon, 
    body?: React.ReactNode,
    commentText?: string // TODO - move this to seperate CommentNode type 

    //
    label?: string  // display label
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
    data?: CanvasNodeData
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

export type LayoutEngineResponse  = {
    layoutedNodes: CanvasNode[]
    layoutedEdges: CanvasEdge[]

}

export type LayoutEngineFuncProps = {
    nodes: CanvasNode[], 
    edges: CanvasEdge[], 
    flowInstance: FlowInstanceType, 
    direction: string
}

export type FlowCanvasProps = {
    initialNodes: CanvasNode[],
    initialEdges?: CanvasEdge[],

    layoutEngine?: LayoutEngine,

    // onLayoutChange ?: (
    //     nodes: CanvasNode[], 
    //     edges: CanvasEdge[], 
    //     flowInstance: FlowInstanceType, 
    //     direction: string 
    // ) => LayoutEngineResponse,
    children?: React.ReactNode,
    canvasSettings?: CanvasSettingsType,
    style?: React.CSSProperties,
    canvasNodeTemplates?: NodeTypes,
    canvasEdgeTemplates?: EdgeTypes ,
    // onLayoutChange?: (nodes: CanvasNode[], edges: CanvasEdge[], flowInstance: ReactFlowInstance, direction: string) => {} | null,
    canvasInteractions?: CanvasInteractions,
    NodeContextMenu?: React.FC<ContextMenuType>
    EdgeContextMenu?: React.FC<ContextMenuType>
    hideAttribution?: boolean
}


export interface BaseNodeProps {
    id: string;
    label?: string;
    selected: boolean;
    nodeStyles?: NodeStyles;
    header? : React.ReactNode;
    body?: React.ReactNode;
  }
  