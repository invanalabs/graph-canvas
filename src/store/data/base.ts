import { ICanvasItemBase, ICanvasItemProperties, IdString } from "./types"


export default class CanvasItemBase implements ICanvasItemBase {

  readonly id: IdString
  group: String
  label: String
  properties?: ICanvasItemProperties

  constructor(props: ICanvasItemBase) {
    this.id = props.id
    this.group = props.group
    this.label = props.label ? props.label : "Anonymous"
    this.properties = props?.properties ? props.properties : {}

  }

}
