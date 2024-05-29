import CanvasItemBase from "../base"
import { defaultICanvasState } from "../defaults"
import { ICanvasItemStates, ICanvasLink, ICanvasNode, IdString } from "../types"


export class CanvasLink extends CanvasItemBase implements ICanvasLink {

  source: ICanvasNode | IdString
  target: ICanvasNode | IdString
  
  state: ICanvasItemStates
  
  constructor(props: ICanvasLink){
    super(props);

    this.source = props.source
    this.target = props.target

    this.state = props.state ? props.state : defaultICanvasState
  }

}
