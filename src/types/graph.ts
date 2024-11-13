
// import { Node } from "vis-network";
// import {Node, Edge, Data, Options, NetworkEvents} from "vis-network/declarations/network/Network";


// export type IdType = string | number;
// export type DirectionType = 'source' | 'target';


// export type ICanvasItemProperties= {
//   [key: string]: any
// }

// export interface ICanvasItemBase {
//   readonly id: IdType | string
//   group: string
//   label?: string | undefined
//   properties?: ICanvasItemProperties
//   isInteractive?: boolean
// }

// // export interface ICanvasItemStates {
// //   selected: boolean
// //   hovered: boolean
// // }

// export interface ICanvasLink extends ICanvasItemBase {
//   readonly source: IdString | ICanvasNode 
//   readonly target: IdString |  ICanvasNode
//   state?: any
//   shapeName? : 'straightLine' | 'curvedLine' | 'loopLine' | 'bezierCurvedLine'
// }

// export interface ICanvasNode extends ICanvasItemBase {
//   x?: number | undefined
//   y?: number | undefined
//   shapeName? : 'circle'
//   state?: IShapeState
//   style?: INodeStyle
//   isDraggable?: boolean

//   degree?: {
//     incoming: number,
//     outgoing: number,
//     total: number
//   }

//   icon? : string,
//   image?: string
//   // links?: CanvasLink[]

//   geoPosition?: [number, number]
// }

// export interface IDataStore {
//   nodes: Map<IdString, ICanvasNode>
//   links: Map<IdString, ICanvasLink>

//   canvas: GraphCanvas
// }
