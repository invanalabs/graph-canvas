

export type IdString = Number | String;

export type ICanvasItemProperties = {
  [key: string]: any;
}

export interface ICanvasItemBase {
  readonly id: IdString
  group: String
  label: String
  data?: ICanvasItemProperties,
}

export interface ICanvasItemStates {
  selected: boolean
  hovered: boolean
}

export interface ICanvasLink extends ICanvasItemBase {

  readonly sourceId: IdString
  // source?: ICanvasNode

  readonly targetId: IdString
  // target?: ICanvasNode

  state?: ICanvasItemStates
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

  state?: ICanvasItemStates
  // links?: CanvasLink[]
}

export interface ICanvasData {
  nodes: Map<IdString, ICanvasNode>
  links: Map<IdString, ICanvasLink>
}

export type ICanvasDataEvents = "nodeAdded" | "nodeUpdated" | "nodeDeleted" | "linkAdded" | "linkUpdated" | "linkRemoved";

export type NodeEventData = { key: IdString, value: ICanvasNode | undefined };
export type LinkEventData = { key: IdString, value: ICanvasLink | undefined };

export type NodeEventListener = (data: NodeEventData) => void;
export type LinkEventListener = (data: LinkEventData) => void;

export interface ICanvasDataListeners {
  nodeAdded: NodeEventListener[];
  nodeUpdated: NodeEventListener[];
  "nodeUpdated:links": NodeEventListener[];
  nodeDeleted: NodeEventListener[];
  linkAdded: LinkEventListener[];
  linkUpdated: LinkEventListener[];
  linkDeleted: LinkEventListener[];
}
