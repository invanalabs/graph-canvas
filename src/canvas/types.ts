// import { BaseShape } from "../structures/nodes/base";
import { Container, Graphics } from "pixi.js";




export interface Properties {
    [key: string]: string | number | object;
}

export type NodeShapes = 'circle'; // | 'square' | 'rectangle' | 'traingle';
export type LinkShapes = 'line'; // | 'quadratic' | 'loop';


export interface CanvasDataBase {
    readonly id: string
    properties?:  Properties
    type: string // label of graph data. ex: Person, Project etc
    label: string // display label 
    shape: NodeShapes | LinkShapes
    shapeGfx?: Container | Graphics
}

export interface INode extends CanvasDataBase{
    shape: NodeShapes
    x?: number,
    y?: number,
}


export interface ILink  extends CanvasDataBase{
    shape: LinkShapes
    source: INode | string;
    target: INode | string;
}


export interface IGraphData {
    nodes : INode[]
    links: ILink[]
}