import { ILinkStateTypes } from "../../renderer/types"
import CanvasItemBase from "./base"
import { CanvasNode } from "./nodes"
import {  ICanvasLink, IdString } from "./types"


export class CanvasLink extends CanvasItemBase implements ICanvasLink {

  readonly sourceId: IdString
  readonly source: CanvasNode

  readonly targetId: IdString
  readonly target: CanvasNode
  
  state?: ILinkStateTypes
  
  constructor(props: ICanvasLink){
    super(props);

    this.sourceId = props.sourceId
    this.targetId = props.targetId

    //@ts-ignore
    this.source = props.source 
    //@ts-ignore
    this.target = props.target

    this.state = props.state ? props.state : ":default"
  }

}
