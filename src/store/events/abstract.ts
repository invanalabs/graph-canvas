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

  abstract readonly abstract: ArtBoard;

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

  abstract nodePointerIn: OnNodeGfxEventListener
  abstract nodePointerOut: OnNodeGfxEventListener
  abstract nodeOnClicked: OnNodeGfxEventListener
  abstract nodeOnUnClicked: OnNodeGfxEventListener
  abstract nodeOnContextMenu: OnNodeGfxEventListener
  abstract nodeOnMoved: OnNodeGfxEventListener


  abstract linkPointerIn: OnLinkGfxEventListener
  abstract linkPointerOut: OnLinkGfxEventListener
  abstract linkOnClicked: OnLinkGfxEventListener
  abstract linkOnUnClicked: OnLinkGfxEventListener
  abstract linkOnContextMenu: OnLinkGfxEventListener
  abstract linkOnMoved: OnLinkGfxEventListener


}