import type { Graphics, Sprite } from 'pixi.js';


export type ShapeGraphics = Graphics | Sprite

export interface ShapeRendereFn {
    (ctx: any): ShapeGraphics
}

export interface ShapeFont {
    face: string // FontAwesome or Ionicons or Arial
    size: number
    weight: 'bold' | 'italic' | 'normal'
}

export interface ShapeLabel {
    color: string
    position: 'TL' | 'TR' | 'BL' | 'BR' | 'center'
    font: ShapeFont
}

export interface NodeIcon extends ShapeFont {
    code: string // '\uf007'
}

export interface NodeBackground {
    color: string
    image?: string
    icon?: NodeIcon
}

export interface ShapeBorder {
    color: string
    width: number
}

export interface ShapeTemplate {
    color: string
    border: ShapeBorder
    label: ShapeLabel
    rendererFn?: ShapeRendereFn
}