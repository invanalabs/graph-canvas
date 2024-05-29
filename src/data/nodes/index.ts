import CanvasItemBase from "../base"
import { defaultICanvasState } from "../defaults"
import { ICanvasItemStates, ICanvasLink, ICanvasNode } from "../types"


export class CanvasNode extends CanvasItemBase implements ICanvasNode {

  x: number | undefined
  y: number | undefined

  links: ICanvasLink[]
  degree?: {
    incoming: number
    outgoing: number
  }
  
  state: ICanvasItemStates

  constructor(props: ICanvasNode){
    super(props)

    // position
    this.x = props.x
    this.y = props.y

    this.links = [];
    this.degree = {
      incoming : 0,
      outgoing: 0
    }

    this.state = props.state ? props.state : defaultICanvasState

  }

}
