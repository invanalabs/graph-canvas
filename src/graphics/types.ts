// import BaseShape from "./base";

// import { IdString, LinkData, NodeData } from "../data/types";
import { LinkStyleType, NodeStateTypesList, LinkStateTypesList, NodeStyleType } from "../canvas/types";
import { LayerTypes } from "../layers/types";
import { LinkShapeBase } from "./links/base";
 import { NodeShapeBase } from "./nodes/base";

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

    state?: NodeStateTypesList

    layer?: LayerTypes

    degree?: {
        incoming: number,
        outgoing: number,
        total: number
    }

}

export interface CanvasLink extends CanvasItemBase {
    shape: LinkShapeTypes
    source: IdString  | CanvasNode
    target:  IdString | CanvasNode
    gfxInstance?: LinkShapeBase
    curvature?: number
    style?: LinkStyleType

    state?: LinkStateTypesList

    layer?: LayerTypes


    // points?: Array<number> // for complext links with more turning points
}