import { CanvasLink, CanvasNode } from "../store"
import { Graphics } from "pixi.js"


export abstract class AbstractNodeTemplate {

  abstract createShapeGfx(node: CanvasNode) : Graphics
  abstract createLabelGfx(node: CanvasNode) : Graphics

  abstract setAnimation(isAnimated: boolean): null

} 


export abstract class AbstractLinkTemplate {

  abstract createShapeGfx(node: CanvasLink) : Graphics
  abstract createLabelGfx(node: CanvasLink) : Graphics

  abstract setAnimation(isAnimated: boolean): null

} 