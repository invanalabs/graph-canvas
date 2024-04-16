// import BaseShape from "./base";
 

export type NodeShapeTypes = 'circle' | 'square' | 'rectangle' | 'traingle';
export type LinkShapeTypes = 'line' | 'quadratic' | 'loop';


// export type GeometryType = Array<number>

// export interface CanvasDataBase {
//     readonly id: string
//     properties?:  Properties
//     type: string // label of graph data. ex: Person, Project etc
//     label: string // display label 
//     shape: NodeShapeTypes | LinkShapeTypes
//     shapeInstance: Circle | LinkShape
//     shapeGfx?: Container | Graphics
// }

export interface NodeShape {
    type: NodeShapeTypes
    geometry: any
    x: number,
    y: number,
    vx?: number,
    vy?: number,
    // width?: number,
    // height?: number
}


export interface LinkShape {
    type: LinkShapeTypes
    source: NodeShape | number;
    target: NodeShape | number;
}


 