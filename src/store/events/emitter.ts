import { ArtBoard } from "../../artBoard";
import { CanvasLink } from "../graph";
import { EventEmitterAbstract } from "./abstract";
import { OnLinkAddedEventData, OnLinkDeletedEventData, OnLinkGfxEventData, 
  OnLinkPropertiesUpdateEventData, OnLinkStateUpdateEventData, OnMessageChangedEventData, OnNodeAddedEventData, 
   OnNodeDeletedEventData, OnNodeGfxEventData, OnNodeLinksUpdatedEventData,  
   OnNodePropertiesUpdatedEventData, OnNodeStateUpdateEventData } from "./types";


export class DefaultEventEmitter extends EventEmitterAbstract {

  artBoard: ArtBoard

  constructor(artBoard: ArtBoard) {
    super()
    this.artBoard = artBoard
  }

  onNodeAdded = ({ id, node }: OnNodeAddedEventData) => {
    // console.log("emitter:onNodeAdded", id, node);
    this.artBoard.renderer.renderNode(node)
  }

  onNodeDeleted = ({ id, node }: OnNodeDeletedEventData) => {
    console.debug("emitter:onNodeDeleted", id, node);
  }
  

  onNodePropertiesUpdated = ({id, node}: OnNodePropertiesUpdatedEventData) => {
    console.debug("emitter:onNodePropertiesUpdated", id, node);
  }

  onNodeLinksUpdated = ({id, node, links}: OnNodeLinksUpdatedEventData) => {
    console.log("emitter:onNodeLinksUpdated", id, node);
    // node.setProperty
    

    // 
    // const style = node.style
    // style.size = (style.size  * 0.5) * node.links.length
    // node.setStyle(style)
    // node.gfxInstance?.redraw()
    // node.gfxInstance?.reDrawNeighbors()
  }


  onLinkAdded = ({ id, link }: OnLinkAddedEventData) => {
    // console.log("emitter:onLinkdded", id, link);
    this.artBoard.renderer.renderLink(link)
  }

  onLinkDeleted = ({ id, link }: OnLinkDeletedEventData) => {
    console.debug("emitter:onLinkDeleted", id, link);
  }

  onLinkPropertiesUpdated = ({ id, link }: OnLinkPropertiesUpdateEventData) => {
    console.debug("emitter:onLinkPropertiesUpdated", id, link);
  }

  // states
  onNodeStateUpdated = ({id, node, state, event, setNeighborsToo}: OnNodeStateUpdateEventData) => {
    if (node){
      node.gfxInstance?.applyStateUpdate(setNeighborsToo, event);
    }
  }

  onLinkStateUpdated = ({id, link, state, event, setNeighborsToo}: OnLinkStateUpdateEventData) => {
    if (link){
      link.gfxInstance?.applyStateUpdate(setNeighborsToo, event);
    }
  }

  onNodePointerIn = ({ id, node, event }: OnNodeGfxEventData) => {
    console.debug("emitter:onNodePointerIn", id, node);
    if (node && event){
      node.gfxInstance?.pointerIn(event);
    }
  }

  onNodePointerOut = ({ id, node }: OnNodeGfxEventData) => {
    console.error("emitter:onNodePointerOut", id, node);
  }

  onNodeClicked = ({ id, node }: OnNodeGfxEventData) => {
    console.error("emitter:onNodeClicked", id, node);
  }

  onNodeUnClicked = ({ id, node }: OnNodeGfxEventData) => {
    console.error("emitter:onNodeUnClicked", id, node);
  }

  onNodeContextMenu = ({ id, node }: OnNodeGfxEventData) => {
    console.error("emitter:onNodeContextMenu", id, node);
  }

  onNodeMoved = ({ id, node }: OnNodeGfxEventData) => {
    // console.log("node:gfx:onMoved updatedto", id, node.x, node.y);
    node.gfxInstance?.setPosition(node.x, node.y);
    // redraw links too 
    node.links.forEach((link_: CanvasLink) => {
      const link = this.artBoard.canvas.dataStore.links.get(link_.id)
      if (link)
        link.gfxInstance?.redraw();
    })
  }

  onLinkPointerIn = ({ id, link }: OnLinkGfxEventData) => {
    console.error("emitter:onLinkPointerIn", id, link);
  }

  onLinkPointerOut = ({ id, link }: OnLinkGfxEventData) => {
    console.error("emitter:onLinkPointerOut", id, link);
  }

  onLinkClicked = ({ id, link }: OnLinkGfxEventData) => {
    console.error("emitter:onLinkClicked", id, link);
  }

  onLinkUnClicked = ({ id, link }: OnLinkGfxEventData) => {
    console.error("emitter:onLinkUnClicked", id, link);
  }

  onLinkContextMenu = ({ id, link }: OnLinkGfxEventData) => {
    console.error("emitter:onLinkContextMenu", id, link);
  }

  onLinkMoved = ({ id, link }: OnLinkGfxEventData) => {
    console.error("emitter:onLinkMoved", id, link);
  }
  
  // onMessageChanged = ({message}: OnMessageChangedEventData)=>{
  //   this.artBoard.canvas.dataStore.updateMessage(message)
  // }

}
