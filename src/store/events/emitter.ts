import { ArtBoard } from "../../artBoard";
import { CanvasLink } from "../graph";
import { EventEmitterAbstract } from "./abstract";
import { OnLinkAddedEventData, OnLinkDeletedEventData, OnLinkGfxEventData, 
  OnLinkPropertiesUpdateEventData, OnLinkStateUpdateEventData,  OnLinkStyleUpdatedEventData,  OnMessageChangedEventData,  OnNodeAddedEventData, 
   OnNodeDeletedEventData, OnNodeGfxEventData, OnNodeLinksUpdatedEventData,  
   OnNodePropertiesUpdatedEventData, OnNodeStateUpdateEventData, 
   OnNodeStyleUpdatedEventData} from "./types";


export class DefaultEventEmitter extends EventEmitterAbstract {

  artBoard: ArtBoard

  constructor(artBoard: ArtBoard) {
    super()
    this.artBoard = artBoard
  }

  onNodeAdded = ({ id, node }: OnNodeAddedEventData) => {
    console.log("emitter:onNodeAdded", id, node)
    this.artBoard.canvas.layout.computeLayout([node,],[])
  }

  onNodeDeleted = ({ id, node }: OnNodeDeletedEventData) => {
    console.log("emitter:onNodeDeleted", id, node);
  }
  
  onNodePropertiesUpdated = ({id, node}: OnNodePropertiesUpdatedEventData) => {
    console.log("emitter:onNodePropertiesUpdated", id, node);
  }

  onNodeLinksUpdated = ({id, node, links}: OnNodeLinksUpdatedEventData) => {
    console.log("emitter:onNodeLinksUpdated", id, node);
    // node.setProperty
    // TODO - update style
    
    // Create scales

    // if (this.artBoard.canvas.options.extraSettings?.nodeSizeBasedOn === "degree"){
    //   const sizeScale = d3.scaleSqrt()
    //   // const sizeScale = d3.scaleLinear()
    //   .domain(d3.extent(this.artBoard.canvas.dataStore.getNodes(), d => d.degree?.total))
    //   .range([12, 50]);
  
    //   console.log("=====sizeScale", sizeScale)
  
    //   // // 
    //   const style = node.style
    //   style.size = sizeScale(node.degree?.total)
    //   // style.size = style.size +  ( this.artBoard.canvas.dataStore.nodes.size/(node.links.length  * 0.9) )
    //   node.setStyle(style)
    // }

    // node.gfxInstance.data = node;
    // this.artBoard.canvas.dataStore.trigger('node:data:onStyleUpdated', { id: node.id, node: node })
    // node.gfxInstance?.redraw()
    // node.gfxInstance?.reDrawNeighbors() 
  }

  onNodeStyleUpdated = ({id, node}: OnNodeStyleUpdatedEventData) => {
    console.log("emitter:onNodeStyleUpdated", id)
    node.gfxInstance?.redraw()
    node.gfxInstance?.reDrawNeighbors()
  }

  onLinkStyleUpdated = ({id, link}: OnLinkStyleUpdatedEventData) => {
    console.log("emitter:onLinkStyleUpdated", id)
    link.gfxInstance?.redraw()
  }

  onLinkAdded = ({ id, link }: OnLinkAddedEventData) => {
    console.log("emitter:onLinkAdded", id, link);
    // this.artBoard.renderer.renderLink(link)
    this.artBoard.canvas.layout.computeLayout([],[link])

  }

  onLinkDeleted = ({ id, link }: OnLinkDeletedEventData) => {
    console.log("emitter:onLinkDeleted", id, link);
  }

  onLinkPropertiesUpdated = ({ id, link }: OnLinkPropertiesUpdateEventData) => {
    console.log("emitter:onLinkPropertiesUpdated", id, link);
  }

  // states
  onNodeStateUpdated = ({id, node, state, event, setNeighborsToo}: OnNodeStateUpdateEventData) => {
    console.log("emitter:onNodeStateUpdated", id, state, node);
    if (node){
      node.gfxInstance?.applyStateUpdate(setNeighborsToo, event);
    }
  }

  onLinkStateUpdated = ({id, link, state, event, setNeighborsToo}: OnLinkStateUpdateEventData) => {
    console.log("emitter:onLinkStateUpdated", id, state, link);
    if (link){
      link.gfxInstance?.applyStateUpdate(setNeighborsToo, event);
    }
  }

  onNodePointerIn = ({ id, node, event }: OnNodeGfxEventData) => {
    console.log("emitter:onNodePointerIn", id, node);
    if (node && event){
      node.gfxInstance?.pointerIn(event);
    }
  }

  onNodePointerOut = ({ id, node }: OnNodeGfxEventData) => {
    console.log("emitter:onNodePointerOut", id, node);
  }

  onNodeClicked = ({ id, node }: OnNodeGfxEventData) => {
    console.log("emitter:onNodeClicked", id, node);
  }

  onNodeUnClicked = ({ id, node }: OnNodeGfxEventData) => {
    console.log("emitter:onNodeUnClicked", id, node);
  }

  onNodeContextMenu = ({ id, node }: OnNodeGfxEventData) => {
    console.log("emitter:onNodeContextMenu", id, node);
  }

  onNodePositionUpdated = ({ id, node }: OnNodeGfxEventData) => {
    console.log("emitter:onNodePositionUpdated", id, node.x, node.y);
    // node.gfxInstance?.setPosition(node.x, node.y);
    node.updateNodePosition(node.x, node.y)
    // redraw links too 
    node.neighbors.links.forEach((link_: CanvasLink) => {
      const link = this.artBoard.canvas.dataStore.links.get(link_.id)
      if (link)
        link.gfxInstance?.redraw();
    })

    // this.artBoard.canvas.layout.reComputeLayout()
  }

  onLinkPointerIn = ({ id, link }: OnLinkGfxEventData) => {
    console.log("emitter:onLinkPointerIn", id, link);
  }

  onLinkPointerOut = ({ id, link }: OnLinkGfxEventData) => {
    console.log("emitter:onLinkPointerOut", id, link);
  }

  onLinkClicked = ({ id, link }: OnLinkGfxEventData) => {
    console.log("emitter:onLinkClicked", id, link);
  }

  onLinkUnClicked = ({ id, link }: OnLinkGfxEventData) => {
    console.log("emitter:onLinkUnClicked", id, link);
  }

  onLinkContextMenu = ({ id, link }: OnLinkGfxEventData) => {
    console.log("emitter:onLinkContextMenu", id, link);
  }

  onLinkMoved = ({ id, link }: OnLinkGfxEventData) => {
    console.log("emitter:onLinkMoved", id, link);
  }
  
  onMessageChanged = ({message}: OnMessageChangedEventData)=>{
    this.artBoard.canvas.dataStore.updateMessage(message)
  }

}
