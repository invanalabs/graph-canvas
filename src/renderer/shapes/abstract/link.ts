import { ArtBoard } from "../../../artBoard";
import { CanvasLink, CanvasNode } from "../../../store";
import { ZIndexOrder } from "../constants";
import { getAngle, getCenterOfRectangle, getContactPointFromCircle, getContactPointOnCircle, getLinkLabelPosition } from "../links/utils";
import { ILinkShape, ILinkShapeTypes } from "../types";
import { ShapeAbstractBase } from "./base";
import * as PIXI from 'pixi.js';


export abstract class LinkShapeAbstract extends ShapeAbstractBase implements ILinkShape {

  data: CanvasLink;

  curveType!: ILinkShapeTypes

  sourcePoint!: PIXI.Point
  targetPoint!: PIXI.Point


  // abstract drawShape(): PIXI.Graphics 
  // abstract drawLabel(): PIXI.Graphics 

  constructor(data: CanvasLink, artBoard: ArtBoard) {
    super(data, artBoard)
    this.data = this.processData(data)
    this.containerGfx.label = `link-${this.data.id}`;
    this.calcStartAndEndPoints();
    this.data.setGfxInstance(this);
  }

  processData = (data: CanvasLink) => {
    return data;
  }

  // layers
  moveToDataLayer(): void {
    console.debug(`moveToDataLayer triggered on link - ${this.data.id}`);
    this.containerGfx.zIndex = ZIndexOrder.DATA_LAYER_LINKS;
  }

  moveToFrontLayer(): void {
    console.debug(`moveToFrontLayer triggered on link - ${this.data.id}`);
    this.containerGfx.zIndex = ZIndexOrder.FRONT_LAYER_LINKS;
  }

  getNeighBors(): { nodes: CanvasNode[], links: CanvasLink[] } {
    return {
      nodes: [
        this.artBoard.canvas.dataStore.nodes.get(this.data.source.id) as CanvasNode,
        this.artBoard.canvas.dataStore.nodes.get(this.data.target.id) as CanvasNode
      ],
      links: []
    };
  }

  // hover
  onPointerOver(event: PIXI.FederatedPointerEvent) {
    event.stopPropagation();
    this.setState(":highlighted", true, event)
  }

  onPointerOut(event: PIXI.FederatedPointerEvent) {
    event.stopPropagation();
    // if (this.dragData) return
    this.setState(":default", true, event)
  }
  // click
  pointerDown(event: PIXI.FederatedPointerEvent) {
    // this.dragData = event.data
    this.artBoard.canvas.dataStore.addToSelectedLinks(this.data)
    this.setState(":selected", true, event)
  }
  pointerUp(event: PIXI.FederatedPointerEvent) {
    // this.dragData = null
    this.artBoard.canvas.dataStore.removeFromSelectedLinks(this.data)
  }
  pointerUpOutside(event: PIXI.FederatedPointerEvent) {
    // this.dragData = null
    this.artBoard.canvas.dataStore.removeFromSelectedLinks(this.data)
  }


  calcStartAndEndPoints() {
    console.debug("====calcStartAndEndPoints", this.data, this)
    const arrowPadding = 0;
    this.targetPoint = getContactPointOnCircle(
      this.data.source,
      this.data.target,
      arrowPadding
    );
    this.sourcePoint= getContactPointFromCircle(
      this.data.source,
      this.data.target,
      arrowPadding
    );
  }

  calcLabelPosition = () => {
    if (this.labelGfx) {
      const labelPosition = getLinkLabelPosition(this.data.source, this.data.target, this.curveType)
      const box = this.labelGfx.getBounds()
      const center = getCenterOfRectangle(box.width, box.height, labelPosition.x - box.width / 2, labelPosition.y - box.height / 2)
      this.labelGfx.position.set(center.x, center.y)
      this.labelGfx.pivot.set(box.width / 2, box.height / 2)
      this.labelGfx.angle = this.calcLabelAngle()
    }
  }

  calcLabelAngle = () => {
    let angle = getAngle(this.data.source, this.data.target);
    if (angle > 90 || angle < -90) {
      angle = angle + 180;
    }
    return angle
  }

  setupInteractionTriggers() {
    console.debug("===setupInteractions triggered on link", this.containerGfx)
    // Remove all listeners
    this.containerGfx.removeAllListeners();
    this.containerGfx
      .on("pointerover", this.onPointerOver.bind(this))
      .on("pointerout", this.onPointerOut.bind(this))
      .on('pointerdown', this.pointerDown.bind(this))
      // .on("pointermove", (event) => {
      //   event.stopPropagation()
      // })
      .on('pointerup', this.pointerUp.bind(this))
      .on('pointerupoutside', this.pointerUpOutside.bind(this))
  }


  draw({ renderShape = true, renderLabel = true }: { renderShape?: boolean; renderLabel?: boolean } = {}) {
    console.log("=====draw-link", renderShape, renderLabel)
    super.draw({renderShape, renderLabel}) 
    // update the position 
    if (renderLabel === true) {
        this.calcLabelPosition()
    }
 
  };

}
