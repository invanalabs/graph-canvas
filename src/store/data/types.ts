

export type IdString = Number | String;

export type ICanvasItemProperties = {
  [key: string]: any;
}

export interface ICanvasItemBase {
  readonly id: IdString
  group: String
  label: String
  properties?: ICanvasItemProperties,
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

export type NodeEventData = { id: IdString, node: ICanvasNode | undefined };
export type NodeUpdateEventData = { id: IdString, node: ICanvasNode, updatedProperties: ICanvasItemProperties};

export type LinkEventData = { id: IdString, link: ICanvasLink | undefined };
export type LinkUpdateEventData = { id: IdString, link: ICanvasLink, updatedProperties: ICanvasItemProperties};

export type NodeEventListener = (data: NodeEventData) => void;
export type NodeUpdateEventListener = (data: NodeUpdateEventData) => void;

export type LinkEventListener = (data: LinkEventData) => void;
export type LinkUpdateEventListener = (data: LinkUpdateEventData) => void;

export interface ICanvasDataListeners {
  nodeAdded: NodeEventListener[];
  "nodeUpdated:links": NodeEventListener[];
  "nodeUpdated:properties": NodeUpdateEventListener[];
  nodeDeleted: NodeEventListener[];
  linkAdded: LinkEventListener[];
  "linkUpdated:properties": LinkUpdateEventListener[];
  linkDeleted: LinkEventListener[];
}
