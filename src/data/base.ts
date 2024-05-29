import { ICanvasItemBase, ICanvasItemData, IdString } from "./types"


export default class CanvasItemBase implements ICanvasItemBase {

  readonly id: IdString
  group: String
  label?: String
  data?: ICanvasItemData

  constructor(props: ICanvasItemBase) {
    this.id = props.id
    this.group = props.group
    this.label = props.label
    this.data = props.data
  }

}
