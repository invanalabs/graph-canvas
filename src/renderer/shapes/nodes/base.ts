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

  declare isLabelVisible: boolean
  declare isShapeVisible: boolean

  constructor(data: CanvasNode, artBoard: ArtBoard) {
    super(data, artBoard)
    this.data = this.processData(data)
    this.containerGfx.label = `node-${this.data.id}`

    this.isLabelVisible = false
    this.isShapeVisible = false
  

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


  showLabelBg(){
    if (this.labelGfx) {
      const textBg = this.labelGfx.getChildByName(NodeContainerChildNames.labelBackground);
      if (textBg) {
        textBg.visible = true
        // textBg.fi
      }
    }
  }

  hideLabelBg(){
    if (this.labelGfx) {
      const textBg = this.labelGfx.getChildByName(NodeContainerChildNames.labelBackground);
      if (textBg) {
        textBg.visible = false
      }
    }
  }

  triggerMuted = (event?: PIXI.FederatedPointerEvent) => {
    // console.debug(`triggerMuted triggered on node - ${this.data.id}`);
    this.containerGfx.alpha = 0.2
    this.hideLabelBg()
  }

  triggerDefault = (event?: PIXI.FederatedPointerEvent) => {
    // console.debug(`triggerDefault triggered on node - ${this.data.id}`);
    this.containerGfx.alpha = 1;
    this.hideLabelBg()
    // this.containerGfx.visible = true
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
      // this.triggerUnHighlighted(event)
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
      // this.showLabel()
    }

    if (setNeighborsToo) {
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
      // this.hideLabel()

    }

    if (setNeighborsToo) {

      this.data.neighbors.nodes.forEach((node: CanvasNode) => {
        node.gfxInstance?.setState(":default", false, event)
      })
      this.data.neighbors.links.forEach((link: CanvasLink) => {
        link.gfxInstance?.setState(":default", false, event)
      });
    }

  }

  onDragStart = (event: PIXI.FederatedPointerEvent) => {
    event.stopPropagation();

    if (this.data.isDraggable) {
      this.dragData = event.data;
      this.artBoard.canvas.dataStore.enableDraggingMode()
      this.containerGfx.parent.on("pointermove", this.onDragMove);
      // disable interactions on links 
    }
  };

  onDragMove = (event: PIXI.FederatedPointerEvent) => {
    event.stopPropagation();
    console.log("onDragMove", this.data.id)
    if (this.dragData && this.data.isDraggable) {
      const newPoint = this.dragData.getLocalPosition(this.containerGfx.parent);
      // update node positions data 
      this.artBoard.canvas.dataStore.moveNodeTo(this.data.id, newPoint.x, newPoint.y, event)
      // remove interactions on neighbors
      this.artBoard.canvas.dataStore.getNeighborLinks(this.data.id).forEach((link: CanvasLink) => {
        if (link.gfxInstance) {
          link.gfxInstance.removeInteractionTriggers()
        }
      })
      this.triggerHighlighted(event, true)
    }
  };

  onDragEnd = (event: PIXI.FederatedPointerEvent) => {
    // console.log("onDragEnd triggered")
    event.stopPropagation()
    this.dragData = null;
    this.artBoard.canvas.dataStore.disableDraggingMode()
    this.containerGfx.parent.off('pointermove', this.onDragMove);
    this.artBoard.canvas.dataStore.getNeighborLinks(this.data.id).forEach((link: CanvasLink) => {
        if (link.gfxInstance) { link.gfxInstance.setupInteractionTriggers() }
    })
    if (this.isPointerInBounds(event, this.containerGfx)) {
      this.triggerUnSelected()
      this.setState(":highlighted", true, event) // if pointer is still on the node 
    }else{
      this.setState(":default")
    }


  };

  pointerOver = (event: PIXI.FederatedPointerEvent) => {
    console.log("====pointerOver", this.data.id, this.data.state, this.dragData)
    console.log("====pointerOver====", this.data.id, this.data.state, this.artBoard.canvas.dataStore.isDragModeOn)
    event.stopPropagation();
    if (this.data.state === ":muted") return
    if (this.dragData || this.data.state === ":selected") return
    // ignore if the system is in drag mode and this node is not selected 
    if (this.artBoard.canvas.dataStore.isDragModeOn === true ) return

    console.log("====pointerOver== triggered====", this.data.id, this.data.state, this.artBoard.canvas.dataStore.isDragModeOn)

    if (this.data.isHoverable) { this.setState(":highlighted", true, event) }
  }

  pointerDown = (event: PIXI.FederatedPointerEvent) => {
    console.log("pointerdown", this.data.id, this.data.state)
    event.stopPropagation();
    if (this.data.state === ":muted") return
    // if (this.dragData) return 
    if (this.data.isSelectable) { 
      console.log("Clicked", this.data.id); 
      this.setState(":selected", true, event);
      this.artBoard.canvas.dataStore.addToSelectedNodes(this.data)
    }
    // if (this.data.isHoverable) { this.artBoard.canvas.dataStore.addToSelectedNodes(this.data) }
    if (this.data.isDraggable) { this.onDragStart(event) }
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

  pointerOut = (event: PIXI.FederatedPointerEvent) => {
    console.log("====pointer out", this.data.id, this.data.state, this.dragData)
    event.stopPropagation();
    if (this.artBoard.canvas.dataStore.isDragModeOn === true ) return
    if (this.dragData) return
    if (this.data.state === ":muted") return
    if ([  ":selected"].includes(this.data.state) && this.isPointerInBounds(event, this.containerGfx)) return
    console.log("====pointer out triggered", this.data.id)
    this.setState(":default", true, event)
  }

  pointerUp = (event: PIXI.FederatedPointerEvent) => {
    console.log("pointerUp", this.data.id, this.data.state)
    event.stopPropagation();
    if (this.data.state === ":muted") return
    this.artBoard.canvas.dataStore.removeFromSelectedNodes(this.data)
    this.onDragEnd(event)
  }

  pointerUpOutside = (event: PIXI.FederatedPointerEvent) => {
    console.log("pointerUpOutside", this.data.id, this.data.state)
    if (this.data.state === ":selected") return 
    this.pointerUp(event)
    this.setState(":default", true, event)
  }

  setupInteractionTriggers() {
    // console.log("===setupInteractionTriggers triggered")
    // const _this = this;
    // Remove all listeners
    this.containerGfx.removeAllListeners();

    // listeners for hover effect
    this.containerGfx
      .on("pointerover", this.pointerOver)
      .on("pointerout", this.pointerOut)

      .on('pointerdown', this.pointerDown)
      // .on('pointercancel', this.pointerUp)
      // .on('pointerup', (event)=> event.stopPropagation())
      // .on('pointerupoutside', (event)=> event.stopPropagation())

      .on('pointerup', this.pointerUp)
      .on('pointerupoutside', this.pointerUpOutside)
      .on('rightclick', (event)=> event.stopPropagation())
      // for right click 
      .on('rightdown', (event)=> event.stopPropagation())
      .on('rightup', (event)=> event.stopPropagation())
      // Fired when a touch point is tapped twice 
      .on('tap', (event)=> event.stopPropagation())
      


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

  reDrawNeighbors() {
    this.data.neighbors.links.forEach((link: CanvasLink) => {
      link.gfxInstance?.redraw()
    })
    this.data.neighbors.nodes.forEach((node: CanvasNode) => {
      node.gfxInstance?.redraw()
    })
  }

  destroy(): void {
    this.containerGfx.destroy()
  }

}