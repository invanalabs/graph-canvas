import { FederatedPointerEvent} from "pixi.js";
import { CanvasLink, CanvasNode, ICanvasItemProperties, IdString } from "../graph";
import { IShapeState } from "../../renderer/types";




export type ICanvasEvents =   "node:gfx:onPointerIn" |
  "node:gfx:onPointerOut"|
  "node:gfx:onClicked" |
  "node:gfx:onUnClicked" |
  "node:gfx:onContextMenu" |
  // "node:gfx:onMoved" |

  "link:gfx:onPointerIn" |
  "link:gfx:onPointerOut" |
  "link:gfx:onClicked" |
  "link:gfx:onUnClicked" |
  "link:gfx:onContextMenu" |
  "link:gfx:onMoved"



// onNodeAdded
export type OnNodeAddedEventData = { id: IdString, node: CanvasNode, };
export type onNodeAddedEventListener = (event: OnNodeAddedEventData) => void;

// onNodeDeleted
export type OnNodeDeletedEventData = { id: IdString, node: CanvasNode  };
export type onNodeDeletedEventListener = (event: OnNodeDeletedEventData) => void;

// onNodeDeleted
export type OnNodePropertiesUpdatedEventData = { id: IdString, node: CanvasNode, updatedProperties: ICanvasItemProperties};
export type OnNodePropertiesUpdatedEventListener =  (event: OnNodePropertiesUpdatedEventData) => void;

// onNodeLinksUpdae
export type OnNodeLinksUpdatedEventData = { id: IdString, node: CanvasNode, links: CanvasLink[]};
export type OnNodeLinksUpdatedEventListener =  (event: OnNodeLinksUpdatedEventData) => void;

// node:gfx:onPositionUpdated
export type OnNodePositionUpdatedEventData = { id: IdString, node: CanvasNode, x: number, y: number, event: FederatedPointerEvent};
export type OnNodePositionUpdatedEventListener = (event: OnNodePositionUpdatedEventData) => void;


// node:gfx:onStateUpdated
export type OnNodeStateUpdateEventData = { id: IdString, node: CanvasNode, state: IShapeState, setNeighborsToo: boolean, event: FederatedPointerEvent};
export type OnNodeStateUpdateEventListener = (event: OnNodeStateUpdateEventData) => void;

// link:gfx:onStateUpdated
export type OnLinkStateUpdateEventData = { id: IdString, link: CanvasLink, state:  IShapeState, setNeighborsToo: boolean, event: FederatedPointerEvent};
export type OnLinkStateUpdateEventListener = (event: OnLinkStateUpdateEventData) => void;


// link:data:onAdded
export type OnLinkAddedEventData = { id: IdString, link: CanvasLink  };
export type OnLinkAddedEventListener = (event: OnLinkAddedEventData) => void;

// link:data:onDeleted
export type OnLinkDeletedEventData = { id: IdString, link: CanvasLink  };
export type OnLinkDeletedEventListener = (event: OnLinkDeletedEventData) => void;

// link:data:onPropertiesUpdated
export type OnLinkPropertiesUpdateEventData = { id: IdString, link: CanvasLink, updatedProperties: ICanvasItemProperties};
export type OnLinkPropertiesUpdateEventListener  = (event: OnLinkPropertiesUpdateEventData) => void;



// gfx:interactions:
export type OnNodeGfxEventData = { id: IdString, node: CanvasNode, event?: FederatedPointerEvent };
export type OnNodeGfxEventListener  = (event: OnNodeGfxEventData) => void;


export type OnNodeStyleUpdatedEventData = { id: IdString, node: CanvasNode};
export type OnNodeStyleUpdatedEventListener  = (event: OnNodeStyleUpdatedEventData) => void;



export type OnLinkGfxEventData = { id: IdString, link: CanvasLink, event: FederatedPointerEvent };
export type OnLinkGfxEventListener  = (event: OnLinkGfxEventData) => void;


export type OnLinkStyleUpdatedEventData = { id: IdString, link: CanvasLink};
export type OnLinkStyleUpdatedEventListener  = (event: OnLinkStyleUpdatedEventData) => void;

export type OnMessageChangedEventData = { message: string };
export type OnMessageChangedEventListener  = (event: OnMessageChangedEventData) => void;



export interface IDataStoreListeners {
  "node:data:onAdded": onNodeAddedEventListener[];
  "node:data:onDeleted": onNodeDeletedEventListener[];
  "node:data:onPropertiesUpdated": OnNodePropertiesUpdatedEventListener[];
  "node:data:onLinksUpdated": OnNodeLinksUpdatedEventListener[];
  "node:data:onStyleUpdated": OnNodeStyleUpdatedEventListener[];
  "node:data:onPositionUpdated": OnNodePositionUpdatedEventListener[];

  "link:data:onAdded": OnLinkAddedEventListener[];
  "link:data:onDeleted": OnLinkDeletedEventListener[];
  "link:data:onPropertiesUpdated": OnLinkPropertiesUpdateEventListener[];
  "link:data:onStyleUpdated": OnLinkStyleUpdatedEventListener[]


  'node:gfx:onStateUpdated': OnNodeStateUpdateEventListener[];
  'link:gfx:onStateUpdated': OnLinkStateUpdateEventListener[];  

  "node:gfx:onPointerIn": OnNodeGfxEventListener[],
  "node:gfx:onPointerOut": OnNodeGfxEventListener[],
  "node:gfx:onClicked": OnNodeGfxEventListener[],
  "node:gfx:onUnClicked": OnNodeGfxEventListener[],
  "node:gfx:onContextMenu": OnNodeGfxEventListener[],
  // "node:gfx:onMoved": OnNodeGfxEventListener[],

  "link:gfx:onPointerIn": OnLinkGfxEventListener[],
  "link:gfx:onPointerOut": OnLinkGfxEventListener[],
  "link:gfx:onClicked": OnLinkGfxEventListener[],
  "link:gfx:onUnClicked": OnLinkGfxEventListener[],
  "link:gfx:onContextMenu": OnLinkGfxEventListener[],
  "link:gfx:onMoved": OnLinkGfxEventListener[],
  
  "artBoard:onMessageChanged": OnMessageChangedEventListener[]


}

// export type ICanvasEvents = "onPointerIn" | "onPointerOut" | "onClicked" | "onUnClicked"  | "onContextMenu" | "onNodeMoved" | "onLinkMoved" 
