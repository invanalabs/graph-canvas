import { LinkShapeBase } from "../../renderer/shapes/links/base"
import { NodeShapeBase } from "../../renderer/shapes/nodes/base"
import { ICanvasItemBase, ICanvasItemProperties, IdString } from "./types"


export default class CanvasItemBase implements ICanvasItemBase {

  readonly id: IdString
  group: string
  label: string | undefined
  properties?: ICanvasItemProperties

  layer: string = "default" // cover this to use LAYER_TYPES_CONSTANTS.keys

  gfxInstance: NodeShapeBase | LinkShapeBase | undefined = undefined

  constructor(props: ICanvasItemBase) {
    this.id = props.id
    this.group = props.group
    // this.label = props.label ? props.label : `Anonymous - ${this.id}`
    this.label = props.label ? props.label : undefined
    this.properties = props?.properties ? props.properties : {}
    // this.gfxInstance = null
  }

  setGfxInstance(gfxInstance: NodeShapeBase | LinkShapeBase){
    this.gfxInstance = gfxInstance
  }

  updateProperties(properties: ICanvasItemProperties){
    Object.keys(properties).forEach(k=> this.setProperty(k, properties[k]))
  }

  setProperty(key: string, value: any){
    //@ts-ignore
    this.properties[key] = value
  }

}
