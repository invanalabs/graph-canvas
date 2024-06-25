import { FederatedPointerEvent } from "pixi.js";
import { ILinkStateTypes, INodeStateTypes } from "../../renderer/types";
import { CanvasLink, CanvasNode, ICanvasItemProperties, IdString } from "../graph";




export type IUserEvents = "onPointerIn" | "onPointerOut" | "onClicked" | "onUnClicked"  | "onContextMenu" | "onNodeMoved" | "onLinkMoved" 



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
  "node:data:onAdded": NodeEventListener[];
  "node:data:onDeleted": NodeEventListener[];
  "node:data:onPropertiesUpdated": NodeUpdateEventListener[];
  "node:data:onLinksUpdated": NodeEventListener[];
  "node:data:onPositionUpdated": NodeUpdateEventListener[];

  "link:data:onAdded": LinkEventListener[];
  "link:data:onDeleted": LinkEventListener[];
  "link:data:onPropertiesUpdated": LinkUpdateEventListener[];

  "node:gfx:onStateUpdated": NodeStateUpdateEventListener[];
  "link:gfx:onStateUpdated": LinkStateUpdateEventListener[];

  
  
}
