
import { LinkShapeAbstract, NodeShapeAbstract } from "../../renderer/shapes/abstract"
import { ICanvasItemBase, ICanvasItemProperties, IdString } from "./types"


export default class CanvasItemBase implements ICanvasItemBase {

  readonly id: IdString
  group: string
  label: string | undefined
  properties?: ICanvasItemProperties

  layer: string = "default" // cover this to use LAYER_TYPES_CONSTANTS.keys

  // isLabelVisible: boolean = true
  // isShapeVisible: boolean = true

  isInteractive: boolean = true

  gfxInstance!: NodeShapeAbstract | LinkShapeAbstract  

  constructor(props: ICanvasItemBase) {
    this.id = props.id
    this.group = props.group
    // this.label = props.label ? props.label : `Anonymous - ${this.id}`
    this.label = props.label ? props.label : undefined
    this.properties = props?.properties ? props.properties : {}
    // this.gfxInstance = null
    this.isInteractive = props.isInteractive === undefined ? true : props.isInteractive 
  }

  setGfxInstance(gfxInstance: NodeShapeAbstract | LinkShapeAbstract){
    this.gfxInstance = gfxInstance
  }

  updateProperties(properties: ICanvasItemProperties){
    Object.keys(properties).forEach(k=> this.setProperty(k, properties[k]))
  }

  setProperty(key: string, value: any){
    //@ts-ignore
    this.properties[key] = value
  }

  // reCalculateStyle(){
  //   console.error("reCalculateStyle implemented")
  // }

}
