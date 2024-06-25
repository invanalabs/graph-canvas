import { FederatedPointerEvent } from "pixi.js";
import { ILinkStateTypes, INodeStateTypes } from "../../renderer/types";
import { CanvasLink } from "./links";
import { CanvasNode } from "./nodes";


export type IdString = number | string;

export type ICanvasItemProperties = {
  [key: string]: any;
}

export interface ICanvasItemBase {
  readonly id: IdString | string
  group: string
  label?: string | undefined
  properties?: ICanvasItemProperties,
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
  state?: ILinkStateTypes


}

// export interface ICanvasNodeLinksStats {
//   // 
//   byDirection: { [key in "incoming" | "outgoing"]: ICanvasLink[] },
//   // byGroup: ICanvasNodeLinksStats,
//   all: ICanvasLink[]
// }

export interface ICanvasNode extends ICanvasItemBase {
  x?: number | undefined
  y?: number | undefined

  state?: INodeStateTypes
  // links?: CanvasLink[]
}

export interface IDataStore {
  nodes: Map<IdString, ICanvasNode>
  links: Map<IdString, ICanvasLink>
}

export type NodeEventData = { id: IdString, node: CanvasNode  };
export type NodeUpdateEventData = { id: IdString, node: CanvasNode, updatedProperties: ICanvasItemProperties};

export type INodeStateUpdateEventData = { id: IdString, node: CanvasNode, state: INodeStateTypes, setNeighborsToo: boolean, event: FederatedPointerEvent};
export type ILinkStateUpdateEventData = { id: IdString, link: CanvasLink, state:  ILinkStateTypes, setNeighborsToo: boolean, event: FederatedPointerEvent};

export type LinkEventData = { id: IdString, link: CanvasLink  };
export type LinkUpdateEventData = { id: IdString, link: CanvasLink, updatedProperties: ICanvasItemProperties};

export type NodeEventListener = (data: NodeEventData) => void;
export type NodeUpdateEventListener = (data: NodeUpdateEventData) => void;
export type NodeStateUpdateEventListener = (data: INodeStateUpdateEventData) => void;


export type LinkEventListener = (data: LinkEventData) => void;
export type LinkUpdateEventListener = (data: LinkUpdateEventData) => void;
export type LinkStateUpdateEventListener = (data: ILinkStateUpdateEventData) => void;

export interface IDataStoreListeners {
  "node:added": NodeEventListener[];
  "node:deleted": NodeEventListener[];
  "node:properties:updated": NodeUpdateEventListener[];
  "node:links:updated": NodeEventListener[];
  "node:position:updated": NodeUpdateEventListener[];

  "link:added": LinkEventListener[];
  "link:deleted": LinkEventListener[];
  "link:properties:updated": LinkUpdateEventListener[];

  "gfx:node:state:updated": NodeStateUpdateEventListener[];
  "gfx:link:state:updated": LinkStateUpdateEventListener[];
  
}
