// import { BaseShape } from "../structures/nodes/base";
import { Container, Graphics } from "pixi.js";
import { CanvasSetting } from "../canvas/pixi/types";
import Circle from "../renderer/structures/nodes/circle";
import LinkShape from "../renderer/structures/links";



export interface GraphCanvasSetting {
    canvas: CanvasSetting
}


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
    shapeInstance: Circle | LinkShape
    shapeGfx?: Container | Graphics
}

export interface INode extends CanvasDataBase{
    shape: NodeShapes
    x: number,
    y: number,
    vx?: number,
    vy?: number,
    width?: number,
    height?: number
}


export interface ILink  extends CanvasDataBase{
    shape: LinkShapes
    source: INode | number;
    target: INode | number;
}


export interface IGraphData {
    nodes : INode[]
    links: ILink[]
}