import { LinkShapeAbstract } from "../../renderer/shapes/abstract"
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
  
  declare gfxInstance: LinkShapeAbstract  

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
    this.style = deepMerge( LinkStyleDefaults,  props?.style || {})
    this.isInteractive = props.isInteractive === undefined ? true : props.isInteractive 
  }

  toJson(): ICanvasLink{
    return {
      id: this.id,
      group: this.group,
      label: this.label,
      properties: this.properties,
      shapeName: this.shapeName,
      source: this.source.id,
      target: this.target.id
      
    }

  }

  setStyle(style: ILinkStyle) {
    this.style = style
  }

  // setState(stateName: IShapeState){
  //   this.state = stateName
  // }

}
