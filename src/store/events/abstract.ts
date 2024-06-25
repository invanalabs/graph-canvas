import { ArtBoard } from "../../artBoard";
import {
  OnLinkAddedEventListener, OnLinkDeletedEventListener,
  OnLinkGfxEventListener, OnLinkPropertiesUpdateEventListener,
  OnLinkStateUpdateEventListener, onNodeAddedEventListener,
  onNodeDeletedEventListener, OnNodeGfxEventListener,
  OnNodeLinksUpdatedEventListener, OnNodePropertiesUpdatedEventListener,
  OnNodeStateUpdateEventListener
} from "./types";


export abstract class EventEmitterAbstract {

  abstract readonly artBoard: ArtBoard;

  /* this will  */

  abstract onNodeAdded: onNodeAddedEventListener;
  abstract onNodeDeleted: onNodeDeletedEventListener;
  abstract onNodePropertiesUpdated: OnNodePropertiesUpdatedEventListener;
  abstract onNodeLinksUpdated: OnNodeLinksUpdatedEventListener;

  abstract onLinkAdded: OnLinkAddedEventListener;
  abstract onLinkDeleted: OnLinkDeletedEventListener;
  abstract onLinkPropertiesUpdated: OnLinkPropertiesUpdateEventListener

  abstract onNodeStateUpdated: OnNodeStateUpdateEventListener;
  abstract onLinkStateUpdated: OnLinkStateUpdateEventListener;

  abstract onNodePointerIn: OnNodeGfxEventListener
  abstract onNodePointerOut: OnNodeGfxEventListener
  abstract onNodeClicked: OnNodeGfxEventListener
  abstract onNodeUnClicked: OnNodeGfxEventListener
  abstract onNodeContextMenu: OnNodeGfxEventListener
  abstract onNodeMoved: OnNodeGfxEventListener


  abstract onLinkPointerIn: OnLinkGfxEventListener
  abstract onLinkPointerOut: OnLinkGfxEventListener
  abstract onLinkClicked: OnLinkGfxEventListener
  abstract onLinkUnClicked: OnLinkGfxEventListener
  abstract onLinkContextMenu: OnLinkGfxEventListener
  abstract onLinkMoved: OnLinkGfxEventListener


}