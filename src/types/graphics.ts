import { NodeData, LinkData } from "./data"
import { LinkTemplate, NodeTemplate } from "./templates"
import * as PIXI from "pixi.js"


export interface NodeGraphics extends NodeData {    
    shape: string
    template?: NodeTemplate
    gfx?:  PIXI.Graphics|PIXI.Sprite|PIXI.Container
}

export interface LinkGraphics extends LinkData {
    shape: string
    template?: LinkTemplate
    gfx?:  PIXI.Graphics|PIXI.Sprite|PIXI.Container
}