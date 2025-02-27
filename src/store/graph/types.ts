
import { GraphCanvas } from "../../canvas";
import { ILinkStyle, INodeStyle, IShapeState } from "../../renderer/types";
import { CanvasNode } from "./nodes";


export type IdString = number | string;

export type ICanvasItemProperties = {
  [key: string]: any 
}

export interface ICanvasItemBase {
  readonly id: IdString | string
  group: string
  label?: string | undefined
  properties?: ICanvasItemProperties

  // visible: boolean // should the item be visible on the canvas
  isLabelVisible?: boolean
  // isShapeVisible: boolean

  isInteractive?: boolean
  isDraggable?: boolean

  // style?: ILinkStyle | INodeStyle

  // reCalculateStyle(): void
}

// export interface ICanvasItemStates {
//   selected: boolean
//   hovered: boolean
// }

export interface ICanvasLink extends ICanvasItemBase {

  readonly source: IdString | CanvasNode | string
  // source?: CanvasNode
  // readonly targetId: IdString
  readonly target: IdString |  CanvasNode | string
  // state?: ICanvasItemStates
  shapeName? : 'straightLine' | 'curvedLine' | 'loopLine' | 'bezierCurvedLine'
  state?: IShapeState
  style?: ILinkStyle


}

export interface ICanvasNode extends ICanvasItemBase {
  x?: number | undefined
  y?: number | undefined
  shapeName? : 'circle'
  state?: IShapeState
  style?: INodeStyle
  
  degree?: {
    incoming: number,
    outgoing: number,
    total: number
  }

  icon? : string,
  image?: string
  // links?: CanvasLink[]

  geoPosition?: [number, number]
}

export interface IDataStore {
  nodes: Map<IdString, ICanvasNode>
  links: Map<IdString, ICanvasLink>

  canvas: GraphCanvas
}
