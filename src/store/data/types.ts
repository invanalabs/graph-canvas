
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
  source: ICanvasNode | IdString
  target: ICanvasNode | IdString

  state: ICanvasItemStates
}

export interface ICanvasNode extends ICanvasItemBase {
  x?: number | undefined
  y?: number | undefined

  state: ICanvasItemStates

  links: ICanvasLink[]
  degree?: {
    incoming: number
    outgoing: number
  }
}

export interface ICanvasData {
  nodes: Map<IdString, ICanvasNode>
  links: Map<IdString, ICanvasLink>
}

export type ICanvasDataEvents = "nodeAdded" | "nodeUpdated" | "nodeDeleted" | "linkAdded" | "linkUpdated" | "linkRemoved";

export type NodeEventData = { key: string, value: any };
export type LinkEventData = { key: string, value: any };

export type NodeEventListener = (data: NodeEventData) => void;
export type LinkEventListener = (data: LinkEventData) => void;

export interface ICanvasDataListeners {
  nodeAdded: NodeEventListener[];
  nodeUpdated: NodeEventListener[];
  nodeDeleted: NodeEventListener[];
  linkAdded: LinkEventListener[];
  linkUpdated: LinkEventListener[];
  linkDeleted: LinkEventListener[];
}
