import { LinkShapeBase } from "../../renderer/shapes/links/base"
import { LinkStyleDefaults } from "../../renderer/shapes/links/defaults"
import { IShapeState, ILinkStyle } from "../../renderer/types"
import { deepMerge } from "../../utils/merge"
import CanvasItemBase from "./base"
import { CanvasNode } from "./nodes"
import {  ICanvasLink } from "./types"


export class CanvasLink extends CanvasItemBase implements ICanvasLink {

  readonly source: CanvasNode

  readonly target: CanvasNode
  
  gfxInstance: LinkShapeBase | undefined = undefined

  state: IShapeState = ":default"

  style: ILinkStyle

  shapeName: 'straightLine' | 'curvedLine' | 'loopLine' | 'bezierCurvedLine'


  constructor(props: ICanvasLink){
    super(props);
    //@ts-ignore
    this.source = props.source 
    //@ts-ignore
    this.target = props.target

    this.state = props.state ? props.state : ":default"
    this.shapeName = props.shapeName? props.shapeName :  "straightLine"

        // this.style = NodeStyleDefaults 
    this.style = deepMerge( LinkStyleDefaults,  props?.style || {})
  }


}
