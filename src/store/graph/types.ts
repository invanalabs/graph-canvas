import { ILinkStateTypes, INodeStateTypes } from "../../renderer/types";
import { CanvasLink } from "./links";
import { CanvasNode } from "./nodes";


export type IdString = Number | string;

export type ICanvasItemProperties = {
  [key: string]: any;
}

export interface ICanvasItemBase {
  readonly id: IdString
  group: string
  label: string | undefined
  properties?: ICanvasItemProperties,
}

// export interface ICanvasItemStates {
//   selected: boolean
//   hovered: boolean
// }

export interface ICanvasLink extends ICanvasItemBase {

  readonly source: IdString | CanvasNode
  // source?: CanvasNode
  // readonly targetId: IdString
  readonly target: IdString |  CanvasNode
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

export type LinkEventData = { id: IdString, link: CanvasLink  };
export type LinkUpdateEventData = { id: IdString, link: CanvasLink, updatedProperties: ICanvasItemProperties};

export type NodeEventListener = (data: NodeEventData) => void;
export type NodeUpdateEventListener = (data: NodeUpdateEventData) => void;

export type LinkEventListener = (data: LinkEventData) => void;
export type LinkUpdateEventListener = (data: LinkUpdateEventData) => void;

export interface IDataStoreListeners {
  nodeAdded: NodeEventListener[];
  "nodeUpdated:links": NodeEventListener[];
  "nodeUpdated:properties": NodeUpdateEventListener[];
  "nodeUpdated:position": NodeUpdateEventListener[];
  nodeDeleted: NodeEventListener[];
  linkAdded: LinkEventListener[];
  "linkUpdated:properties": LinkUpdateEventListener[];
  linkDeleted: LinkEventListener[];
}
