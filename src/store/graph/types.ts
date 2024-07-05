
import { IShapeState } from "../../renderer/types";
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

}

export interface ICanvasNode extends ICanvasItemBase {
  x?: number | undefined
  y?: number | undefined
  shapeName? : 'circle'
  state?: IShapeState

  icon? : string,
  image?: string
  // links?: CanvasLink[]
}

export interface IDataStore {
  nodes: Map<IdString, ICanvasNode>
  links: Map<IdString, ICanvasLink>
}
