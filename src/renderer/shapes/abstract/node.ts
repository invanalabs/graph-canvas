import { ArtBoard } from "../../../artBoard";
import { CanvasLink, CanvasNode } from "../../../store";
import { deepMerge } from "../../../utils/merge";
import { ZIndexOrder } from "../constants";
import { NodeStyleDefaults } from "../nodes/circle/defaults";
import { INodeShape } from "../types";
import { ShapeAbstractBase } from "./base";
import * as PIXI from 'pixi.js';


export abstract class NodeShapeAbstract extends ShapeAbstractBase implements INodeShape {

  data: CanvasNode;

  dragPoint: PIXI.Point | null = null;
  dragData: PIXI.FederatedPointerEvent | null = null;

  constructor(data: CanvasNode, artBoard: ArtBoard) {
    super(data, artBoard)
    this.data = this.processData(data)
    this.data.setGfxInstance(this);
    this.containerGfx.label = `node-${this.data.id}`;

    this.onDragStart = this.onDragStart.bind(this);
    this.onDragMove = this.onDragMove.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);

  }

  /* this will  */
  processData = (data: CanvasNode) => {
    data.style = data.style ? deepMerge(NodeStyleDefaults, data.style) : NodeStyleDefaults
    return data
  }

  setPosition = (x: number, y: number) => {
    this.containerGfx.position.set(x, y);
  }
  // layers
  moveToDataLayer(): void {
    this.containerGfx.zIndex = ZIndexOrder.DATA_LAYER_NODES;
  }

  moveToFrontLayer(): void {
    this.containerGfx.zIndex = ZIndexOrder.FRONT_LAYER_NODES;
  }

  getNeighBors(): { nodes: CanvasNode[], links: CanvasLink[] } {
    return this.data.neighbors;
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
         link.gfxInstance.removeInteractionTriggers()
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
        link.gfxInstance.setupInteractionTriggers()
    })
    if (this.isPointerInBounds(event, this.containerGfx)) {
      this.triggerUnSelected()
      this.setState(":highlighted", true, event) // if pointer is still on the node 
    } else {
      this.setState(":default")
    }
  };

  onPointerOver = (event: PIXI.FederatedPointerEvent) => {
    console.log("====onPointerOver", this.data.id, this.data.state, this.dragData)
    console.log("====onPointerOver====", this.data.id, this.data.state, this.artBoard.canvas.dataStore.isDragModeOn)
    event.stopPropagation();
    if (this.data.state === ":muted") return
    if (this.dragData || this.data.state === ":selected") return
    // ignore if the system is in drag mode and this node is not selected 
    if (this.artBoard.canvas.dataStore.isDragModeOn === true) return

    console.log("====onPointerOver== triggered====", this.data.id, this.data.state, this.artBoard.canvas.dataStore.isDragModeOn)

    if (this.data.isInteractive) { this.setState(":highlighted", true, event) }
  }

  onPointerDown = (event: PIXI.FederatedPointerEvent) => {
    console.log("onPointerDown", this.data.id, this.data.state)
    event.stopPropagation();
    if (this.data.state === ":muted") return
    console.log("Clicked", this.data.id);
    this.setState(":selected", true, event);
    this.artBoard.canvas.dataStore.addToSelectedNodes(this.data)
    // if (this.data.isInteractive) { this.artBoard.canvas.dataStore.addToSelectedNodes(this.data) }
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

  onPointerOut = (event: PIXI.FederatedPointerEvent) => {
    console.log("====pointer out", this.data.id, this.data.state, this.dragData)
    event.stopPropagation();
    if (this.artBoard.canvas.dataStore.isDragModeOn === true) return
    if (this.dragData) return
    if (this.data.state === ":muted") return
    if (this.data.isDraggable === true && this.data.state === ":selected" && this.isPointerInBounds(event, this.containerGfx)) return
    console.log("====pointer out triggered", this.data.id)
    this.setState(":default", true, event)
  }

  onPointerUp = (event: PIXI.FederatedPointerEvent) => {
    console.log("onPointerUp", this.data.id, this.data.state)
    event.stopPropagation();
    if (this.data.state === ":muted") return
    this.artBoard.canvas.dataStore.removeFromSelectedNodes(this.data)
    this.onDragEnd(event)
  }

  onPointerUpOutside = (event: PIXI.FederatedPointerEvent) => {
    console.log("onPointerUpOutside", this.data.id, this.data.state)
    if (this.data.state === ":selected") return
    this.onPointerUp(event)
    this.setState(":default", true, event)
  }

  setupInteractionTriggers() {
    // Remove all listeners
    this.removeInteractionTriggers();

    // listeners for hover effect
    this.containerGfx
      // hover
      .on("pointerover", this.onPointerOver)
      .on("pointerout", this.onPointerOut)
      // click
      .on('pointerdown', this.onPointerDown)
      .on('pointerup', this.onPointerUp)
      .on('pointerupoutside', this.onPointerUpOutside)
    // rightclicked
    // .on('rightclick', (event)=> event.stopPropagation())
    // // for right click 
    // .on('rightdown', (event)=> event.stopPropagation())
    // .on('rightup', (event)=> event.stopPropagation())
    // // Fired when a touch point is tapped twice 
    // .on('tap', (event)=> event.stopPropagation())
    // .on('pointercancel', this.onPointerUp)
    // .on('onPointerUp', (event)=> event.stopPropagation())
    // .on('onPointerUpOutside', (event)=> event.stopPropagation())
  }


  draw(renderShape: boolean = true, renderLabel: boolean = true) {
    super.draw(renderShape, renderLabel) 
    // update the position 
    if (renderShape) {
      if (this.data.x && this.data.y) {
        this.setPosition(this.data?.x, this.data?.y)
      }
    }
    if (this.artBoard.canvas.options.debugMode === true){
      this.drawDebugBorder(this.data.x, this.data.y)
    }
  };


  reDrawNeighbors() {
    this.data.neighbors.links.forEach((link: CanvasLink) => {
      link.gfxInstance?.reDraw()
    })
    this.data.neighbors.nodes.forEach((node: CanvasNode) => {
      node.gfxInstance?.reDraw()
    })
  }
}
