import { NodeShapeBase } from "../../renderer/graphics/nodes/base"
import { ICanvasItemBase, ICanvasItemProperties, IdString } from "./types"


export default class CanvasItemBase implements ICanvasItemBase {

  readonly id: IdString
  group: string
  label: string
  properties?: ICanvasItemProperties

  gfxInstance: NodeShapeBase | null

  constructor(props: ICanvasItemBase) {
    this.id = props.id
    this.group = props.group
    this.label = props.label ? props.label : "Anonymous"
    this.properties = props?.properties ? props.properties : {}
    this.gfxInstance = null

  }

  updateProperties(properties: ICanvasItemProperties){
    Object.keys(properties).forEach(k=> this.setProperty(k, properties[k]))
  }

  setProperty(key: string, value: any){
    //@ts-ignore
    this.properties[key] = value
  }

}
