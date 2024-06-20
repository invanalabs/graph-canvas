import { LinkStyleDefaults } from "../../renderer/graphics/links/straight/defaults"
import { ILinkStateTypes, ILinkStyle } from "../../renderer/types"
import CanvasItemBase from "./base"
import { CanvasNode } from "./nodes"
import {  ICanvasLink } from "./types"


export class CanvasLink extends CanvasItemBase implements ICanvasLink {

  readonly source: CanvasNode

  readonly target: CanvasNode
  
  state?: ILinkStateTypes

  style: ILinkStyle

  
  constructor(props: ICanvasLink){
    super(props);
    //@ts-ignore
    this.source = props.source 
    //@ts-ignore
    this.target = props.target

    this.style = LinkStyleDefaults

    this.state = props.state ? props.state : ":default"
  }


}
