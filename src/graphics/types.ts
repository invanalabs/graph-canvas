// import BaseShape from "./base";

// import { IdString, LinkData, NodeData } from "../data/types";
import { LinkStyleType, NodeStyleType } from "../canvas/types";
import { LinkShapeBase, NodeShapeBase } from "./base";

 
export type NodeShapeTypes = 'circle' | 'square' | 'rectangle' | 'traingle';

export type LinkShapeTypes = 'line' | 'quadratic' | 'loop';

export type IdString = Number | String;

export type Properties  = {
    [key: string]: string | number | object;
}

export type CanvasItemBase = {
    readonly id: IdString
    group: String
    label?: String
    properties?: Properties,
}

 
export interface CanvasNode extends CanvasItemBase {
    shape: NodeShapeTypes
    gfxInstance?: NodeShapeBase
    // geometry?: any
    x?: number
    y?: number

    style?: NodeStyleType
    degree?: {
        incoming: number,
        outgoing: number,
        total: number
    }
    // vx?: number
    // vy?: number
}

export interface CanvasLink extends CanvasItemBase {
    shape: LinkShapeTypes
    source: IdString  | CanvasNode
    target:  IdString | CanvasNode
    gfxInstance?: LinkShapeBase
    curvature?: number
    style?: LinkStyleType

    // points?: Array<number> // for complext links with more turning points
}