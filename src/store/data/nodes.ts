import CanvasItemBase from "./base"
import { defaultICanvasState } from "./defaults"
import { CanvasLink } from "./links"
import { ICanvasItemStates, ICanvasNode } from "./types"


export class CanvasNode extends CanvasItemBase implements ICanvasNode {

  x?: number | undefined
  y?: number | undefined

  links: CanvasLink[] = [];

  state?: ICanvasItemStates

  constructor(props: ICanvasNode){
    super(props)
    // position
    this.x = props.x
    this.y = props.y

    this.state = props.state ? props.state : defaultICanvasState
    this.links  =  []
  }

  setLinks(links: CanvasLink[]){
    this.links = links
  }

  // get links(): ICanvasLink[]{
  //   return this._links
  // }

  // getDegree = () => {

  // }

}
