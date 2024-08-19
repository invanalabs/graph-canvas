import { ArtBoard } from "../../../artBoard";
import { CanvasLink, CanvasNode } from "../../../store";
import { NodeShapeAbstract } from "../abstract";
import * as PIXI from 'pixi.js';
import { deepMerge } from "../../../utils/merge";
import { NodeStyleDefaults } from "./circle/defaults";
import { NodeContainerChildNames } from "../constants";


export const ZIndexOrder = {
  DATA_LAYER_LINKS: 4,
  DATA_LAYER_NODES: 5,
  
  FRONT_LAYER_LINKS: 9,
  FRONT_LAYER_NODES: 10,

  ANNOTATIONS_LAYER_LINKS: 14,
  ANNOTATIONS_LAYER_NODE: 15

}

export class NodeShapeBase extends NodeShapeAbstract {

  declare originalData: CanvasNode;
  declare data: CanvasNode;

  declare dragPoint: PIXI.Point
  private dragData: PIXI.FederatedPointerEvent | null = null;

  declare labelGfx: PIXI.Graphics
  declare shapeGfx: PIXI.Graphics

  declare drawShape
  declare drawLabel
  


  constructor(data: CanvasNode, artBoard: ArtBoard) {
    super(data, artBoard)
    this.data = this.processData(data)
    this.containerGfx.name = `node-${this.data.id}`
    // setup intractions
    // this.setupInteractionTriggers()
    this.data.setGfxInstance(this);
    // console.log("this.data.gfxInstance ", this.data, this.data.gfxInstance)


    // Bind event handlers to this instance
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragMove = this.onDragMove.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }



  processData = (data: CanvasNode) => {
    //@ts-ignore
    data.style = data.style ? deepMerge(NodeStyleDefaults, data.style) : NodeStyleDefaults
    return data
  }

  setPosition = (x: number, y: number) => {
    // console.log("setPosition", x, y)
    this.containerGfx.position.set(x, y);
  }

  // layers
  moveToDataLayer(): void {
    // console.error("not implemented")
    this.containerGfx.zIndex = ZIndexOrder.DATA_LAYER_NODES;
    // this.canvas.layers.moveGfxToDataLayer(this.data, LAYER_GRAPHICS_TYPES_CONSTANTS.NODES)
  }

  moveToFrontLayer(): void {
    // console.error("not implemented")
    // this.canvas.layers.moveGfxToFrontLayer(this.data, LAYER_GRAPHICS_TYPES_CONSTANTS.NODES)
    this.containerGfx.zIndex = ZIndexOrder.FRONT_LAYER_NODES;
  }

  // moveToMapLayer(): void{
  //   // console.error("not implemented")
  // }


  triggerInactive = (event?: PIXI.FederatedPointerEvent) => {
    // console.debug(`triggerInactive triggered on node - ${this.data.id}`);
    this.containerGfx.alpha = 0.2
  }

  triggerDefault = (event?: PIXI.FederatedPointerEvent) => {
    // console.debug(`triggerDefault triggered on node - ${this.data.id}`);
    this.containerGfx.alpha = 1;
    this.containerGfx.visible = true
  }

  // triggerHidden = (event?: PIXI.FederatedPointerEvent) => {
  //   this.containerGfx.visible = false;
  // }

  triggerSelected = (event?: PIXI.FederatedPointerEvent) => {
    // console.debug(`Selected triggered on node - ${this.data.id}`);
    if (this.shapeGfx) {
      const shapeSelectedBorder = this.shapeGfx.getChildByName(NodeContainerChildNames.shapeSelectedBorder)
      if (shapeSelectedBorder) {
        shapeSelectedBorder.visible = true
      }
      this.triggerHighlighted(event, true)
    }
    // this.moveToFrontLayer();
  }

  triggerUnSelected = (event?: PIXI.FederatedPointerEvent) => {
    // console.debug(`UnSelected triggered on node - ${this.data.id}`);
    if (this.shapeGfx) {
      const shapeSelectedBorder = this.shapeGfx.getChildByName(NodeContainerChildNames.shapeSelectedBorder)
      if (shapeSelectedBorder) {
        shapeSelectedBorder.visible = false
      }
      this.triggerUnHighlighted(event, true)
    }
    // this.moveToDataLayer()
  }

  triggerHighlighted = (event?: PIXI.FederatedPointerEvent, setNeighborsToo: boolean = false) => {
    // console.debug(`triggerHighlighted on node - ${this.data.id}`);
    this.moveToFrontLayer()
    if (this.shapeGfx) {
      const shapeHighlightedBorder = this.shapeGfx.getChildByName(NodeContainerChildNames.shapeHighlightedBorder);
      if (shapeHighlightedBorder) {
        shapeHighlightedBorder.visible = true
      }

      if (this.labelGfx){
        const textBg = this.labelGfx.getChildByName(NodeContainerChildNames.labelBackground);
        if (textBg) {
          textBg.visible = true
        }
      }
    }

    if (setNeighborsToo){
      this.data.neighbors.nodes.forEach((node: CanvasNode) => {
        node.gfxInstance?.setState(":highlighted", false, event)
      })
      this.data.neighbors.links.forEach((link: CanvasLink) => {
        link.gfxInstance?.setState(":highlighted", false, event)
      });  
    }
  }

  triggerUnHighlighted = (event?: PIXI.FederatedPointerEvent, setNeighborsToo: boolean = false) => {
    // console.debug(`triggerUnHighlighted on node - ${this.data.id}`);
    this.moveToDataLayer()
    if (this.shapeGfx) {
      const shapeHighlightedBorder = this.shapeGfx.getChildByName(NodeContainerChildNames.shapeHighlightedBorder);
      if (shapeHighlightedBorder) {
        shapeHighlightedBorder.visible = false
      }
      if (this.labelGfx){
        const textBg = this.labelGfx.getChildByName(NodeContainerChildNames.labelBackground);
        if (textBg) {
          textBg.visible = false
          // textBg.fi
        }
      }

    }

    if (setNeighborsToo){
      
      this.data.neighbors.nodes.forEach((node: CanvasNode) => {
        node.gfxInstance?.setState(":default", false, event)
      })
      this.data.neighbors.links.forEach((link: CanvasLink) => {
        link.gfxInstance?.setState(":default", false, event)
      });
    }

  }

  onDragStart = (event: PIXI.FederatedPointerEvent) => {
    this.dragData = event.data;
    event.stopPropagation();
    this.containerGfx.parent.on("pointermove", this.onDragMove);
    // disable interactions on links 
  };

  onDragMove = (event: PIXI.FederatedPointerEvent) => {
    event.stopPropagation();
    if (this.dragData) {
      const newPoint = this.dragData.getLocalPosition(this.containerGfx.parent);
      // console.log("onDragMove", this.data.id, newPoint, this.dragPoint)
      // update node positions data 
      this.artBoard.canvas.dataStore.moveNodeTo(this.data.id, newPoint.x, newPoint.y, event)
      // remove interactions on neighbors
      this.artBoard.canvas.dataStore.getNeighborLinks(this.data.id).forEach((link: CanvasLink) => {
        if (link.gfxInstance){
          link.gfxInstance.removeInteractionTriggers()
        }
      })
      this.triggerHighlighted(event, true)

    }
  };

  onDragEnd = (event: PIXI.FederatedPointerEvent) => {
    // console.log("onDragEnd triggered")
    event.stopPropagation()
    this.dragData = null
    this.containerGfx.parent.off('pointermove', this.onDragMove);
    this.artBoard.canvas.dataStore.getNeighborLinks(this.data.id).forEach((link: CanvasLink) => {
      if (link.gfxInstance)
        link.gfxInstance.setupInteractionTriggers()
    })
    this.triggerUnHighlighted(event, true)

  };

  pointerIn = (event: PIXI.FederatedPointerEvent) => {
    // console.log("====pointerIn", this.data.id, this.data.state, this.dragData)
    event.stopPropagation();
    if (this.dragData) return
    this.setState(":highlighted", true, event)
  }

  pointerDown = (event: PIXI.FederatedPointerEvent) => {
    // console.log("pointerdown", this.data.id, this.data.state)
    // event.stopPropagation();
    // if (this.dragData) return 
    this.artBoard.canvas.dataStore.addToHighlightedNodes(this.data)
    this.setState(":selected", true, event)
    this.onDragStart(event)
  }

  // Function to check if the pointer is within the bounds of the parent sprite
  isPointerInBounds = (event: PIXI.FederatedPointerEvent, container: PIXI.Container): boolean => {
    // Get the global position of the pointer event
    const globalPosition = event.global;
    // Get the bounds of the container in global coordinates
    const bounds = container.getBounds();
    // Check if the global position is within the bounds
    return globalPosition.x >= bounds.x && globalPosition.x <= bounds.x + bounds.width &&
      globalPosition.y >= bounds.y && globalPosition.y <= bounds.y + bounds.height;
  };

  pointerout = (event: PIXI.FederatedPointerEvent) => {
    // event.stopPropagation();
    // if ([":highlighted", ":hovered", ":selected"].includes(this.data.state)) return 
    // console.log("====pointerout", this.data.id, this.data.state, this.isPointerInBounds(event, this.containerGfx), this.dragData)
    if ([":highlighted", ":highlighted", ":selected"].includes(this.data.state) && this.isPointerInBounds(event, this.containerGfx)) return
    // console.log("pointerout", this.data.id, this.data.state, this.dragData)
    this.setState(":default", true, event)
  }

  pointerUp = (event: PIXI.FederatedPointerEvent) => {
    // const pointerPosition = event.data.global;
    // console.log("pointerup", this.data.id, this.data.state)
    event.stopPropagation();
    if (this.isPointerInBounds(event, this.containerGfx)) {
      this.setState(":highlighted", true, event)
    } else {
      this.setState(":highlighted", true, event)
    }
    this.onDragEnd(event)
    this.artBoard.canvas.dataStore.removeFromHighlightedNodes(this.data)

  }

  pointerUpOutside = (event: PIXI.FederatedPointerEvent) => {
    // console.log("pointerupoutside", this.data.id, this.data.state)
    event.stopPropagation();
    this.onDragEnd(event)

  }

  setupInteractionTriggers() {
    // console.log("===setupInteractionTriggers triggered")
    // const _this = this;
    // Remove all listeners
    this.containerGfx.removeAllListeners();

    // listeners for hover effect
    this.containerGfx
      .on("pointerover", this.pointerIn)
      .on("pointerout", this.pointerout)
      .on('pointerdown', this.pointerDown)
      .on('pointerup', this.pointerUp)
      .on('pointerupoutside', this.pointerUpOutside)
  }

  draw = (renderShape = true, renderLabel = true) => {
    // clear shapeName first
    this.clear();
    this.setupInteractionTriggers()
    // draw shapeName
    if (renderShape) {
      this.shapeGfx = this.drawShape();
      // console.log("====this.shapeGfx ", this.shapeGfx)
      this.containerGfx.addChild(this.shapeGfx);
    }

    // draw label
    if (renderLabel) {
      this.labelGfx = this.drawLabel();
      if (this.labelGfx) {
        this.containerGfx.addChild(this.labelGfx);
      }
    }

    // update the position 
    if (renderShape) {
      if (this.data.x && this.data.y) {
        this.setPosition(this.data?.x, this.data?.y)
      }
    }

    // if (this.data.state) {
    this.applyStateUpdate()
    this.setInteractiveRecursive(this.containerGfx)
    this.drawDebugBorder(this.data.x, this.data.y)
    // }
  }

  redraw = (renderShape = true, renderLabel = true) => {
    // console.log("redraw ", this.data.id)
    this.draw(renderShape, renderLabel);
  }

  reDrawNeighbors(){
    this.data.neighbors.links.forEach((link: CanvasLink)=>{
      link.gfxInstance?.redraw()
    })
    this.data.neighbors.nodes.forEach((node: CanvasNode)=>{
      node.gfxInstance?.redraw()
    })
  }

  destroy(): void {
    this.containerGfx.destroy()
  }

}