import { FederatedPointerEvent, Point } from "pixi.js";
import { ILinkStateTypes, INodeStateTypes } from "../../renderer/types";
import { CanvasLink, CanvasNode, ICanvasItemProperties, IdString } from "../graph";




export type IUserEvents = "onPointerIn" | "onPointerOut" | "onClicked" | "onUnClicked"  | "onContextMenu" | "onNodeMoved" | "onLinkMoved" 


// onNodeAdded
export type OnNodeAddedEventData = { id: IdString, node: CanvasNode  };
export type onNodeAddedEventListener = (event: OnNodeAddedEventData) => void;

// onNodeDeleted
export type OnNodeDeletedEventData = { id: IdString, node: CanvasNode  };
export type onNodeDeletedEventListener = (event: OnNodeDeletedEventData) => void;

// onNodeDeleted
export type OnNodePropertiesUpdatedEventData = { id: IdString, node: CanvasNode, updatedProperties: ICanvasItemProperties};
export type OnNodePropertiesUpdatedEventListener =  (event: OnNodeDeletedEventData) => void;


// onNodeLinksUpdae
export type OnNodeLinksUpdatedEventData = { id: IdString, node: CanvasNode, links: CanvasLink[]};
export type OnNodeLinksUpdatedEventListener =  (event: OnNodeLinksUpdatedEventData) => void;

// onNodePositionUpdated
export type OnNodePositionUpdatedEventData = { id: IdString, node: CanvasNode, newPosition: Point};
export type OnNodePositionUpdatedEventListener =  (event: OnNodePositionUpdatedEventData) => void;



// node:gfx:onStateUpdated
export type INodeStateUpdateEventData = { id: IdString, node: CanvasNode, state: INodeStateTypes, setNeighborsToo: boolean, event: FederatedPointerEvent};
export type NodeStateUpdateEventListener = (event: INodeStateUpdateEventData) => void;

// link:gfx:onStateUpdated
export type ILinkStateUpdateEventData = { id: IdString, link: CanvasLink, state:  ILinkStateTypes, setNeighborsToo: boolean, event: FederatedPointerEvent};
export type LinkStateUpdateEventListener = (event: ILinkStateUpdateEventData) => void;


// link:data:onAdded
export type OnLinkAddedEventData = { id: IdString, link: CanvasLink  };
export type OnLinkAddedEventListener = (data: OnLinkAddedEventData) => void;

// link:data:onDeleted
export type OnLinkDeletedEventData = { id: IdString, link: CanvasLink  };
export type OnLinkDeletedEventListener = (data: OnLinkDeletedEventData) => void;

// link:data:onPropertiesUpdated
export type OnLinkPropertiesUpdateEventData = { id: IdString, link: CanvasLink, updatedProperties: ICanvasItemProperties};
export type OnLinkPropertiesUpdateEventListener  = (data: OnLinkPropertiesUpdateEventData) => void;


export interface IDataStoreListeners {
  "node:data:onAdded": onNodeAddedEventListener[];
  "node:data:onDeleted": onNodeDeletedEventListener[];
  "node:data:onPropertiesUpdated": OnNodePropertiesUpdatedEventListener[];
  "node:data:onLinksUpdated": OnNodeLinksUpdatedEventListener[];
  "node:data:onPositionUpdated": OnNodePositionUpdatedEventListener[];

  "link:data:onAdded": OnLinkAddedEventListener[];
  "link:data:onDeleted": OnLinkDeletedEventListener[];
  "link:data:onPropertiesUpdated": OnLinkPropertiesUpdateEventData[];

  "node:gfx:onStateUpdated": NodeStateUpdateEventListener[];
  "link:gfx:onStateUpdated": LinkStateUpdateEventListener[];  
}
