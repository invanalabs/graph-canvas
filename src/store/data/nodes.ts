import CanvasItemBase from "./base"
import { defaultICanvasState } from "./defaults"
import { CanvasLink } from "./links"
import { ICanvasItemProperties, ICanvasItemStates, ICanvasNode } from "./types"


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

  updateProperties(properties: ICanvasItemProperties){
    Object.keys(properties).forEach(k=> this.setProperty(k, properties[k]))
  }

  setProperty(key: string, value: any){
    //@ts-ignore
    this.properties[key] = value
  }


}
