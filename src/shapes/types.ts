// import BaseShape from "./base";

import { IdString, LinkData, NodeData } from "../data/types";
import { LinkShapeBase, NodeShapeBase } from "./base";

 
export type NodeShapeTypes = 'circle' | 'square' | 'rectangle' | 'traingle';
export type LinkShapeTypes = 'line' | 'quadratic' | 'loop';

 
export interface CanvasNode {
    readonly id: IdString
    type: NodeShapeTypes
    data: NodeData
    shapeInstance?: NodeShapeBase
    // geometry?: any
    x?: number
    y?: number
    vx?: number
    vy?: number
}

export interface CanvasLink {
    readonly id: IdString
    type: LinkShapeTypes
    data: LinkData
    shapeInstance?: LinkShapeBase
    // points?: Array<number> // for complext links with more turning points
    source: IdString | CanvasNode
    target: IdString | CanvasNode
}