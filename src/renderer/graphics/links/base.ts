import { ArtBoard } from "../../../artBoard";
import { CanvasLink } from "../../../store";
import { deepMerge } from "../../../utils/merge";
import { LinkShapeAbstract } from "../base";
import * as PIXI from 'pixi.js';
import { LinkStyleDefaults } from "./straight/defaults";
import { LinkContainerChildNames } from "../constants";
import drawLabelShape from "../../primitives/label";
import drawStraightLineShape from "../../primitives/lines/straightLine";
import drawArrowHeadShape from "../../primitives/arrowHead";
import { ZIndexOrder } from "../nodes";

import { ILinkStateTypes } from "../../types";



export class LinkShapeBase extends LinkShapeAbstract {

  declare data: CanvasLink
  declare originalData: CanvasLink;
  declare labelGfx: PIXI.Graphics;
  declare shapeGfx: PIXI.Graphics;

  private dragData: PIXI.FederatedPointerEvent | null = null;


  constructor(data: CanvasLink, artBoard: ArtBoard) {
    super(data, artBoard)
    this.data = this.processData(data)
    this.shapeGfx = new PIXI.Graphics();
    this.labelGfx = new PIXI.Graphics();
    // setup intractions
    this.data.setGfxInstance(this);
    console.debug("this.data.gfxInstance ", this.data, this.data.gfxInstance)
  }


  processData = (data: CanvasLink) => {
    //@ts-ignore
    data.style = data.style ? deepMerge(LinkStyleDefaults, data.style) : LinkStyleDefaults
    return data;
  }

  // layers
  moveToDataLayer(): void {
    // console.error("not implemented")
    this.containerGfx.zIndex = ZIndexOrder.DATA_LAYER;

    // this.canvas.layers.moveGfxToDataLayer(this.data, LAYER_GRAPHICS_TYPES_CONSTANTS.NODES)
  }

  moveToFrontLayer(): void {
    // console.error("not implemented")
    // this.canvas.layers.moveGfxToFrontLayer(this.data, LAYER_GRAPHICS_TYPES_CONSTANTS.NODES)
    this.containerGfx.zIndex = ZIndexOrder.FRONT_LAYER;
  }

  moveToMapLayer(): void {
    // console.error("not implemented")
  }

  triggerInactive = () => {
    console.log(`triggerInactive triggered on node - ${this.data.id}`);
    this.containerGfx.alpha = 0.2
  }

  triggerDefault = () => {
    console.log(`triggerDefault triggered on node - ${this.data.id}`);
    this.containerGfx.alpha = 1;
    this.containerGfx.visible = true
  }

  triggerHidden = () => {
    this.containerGfx.visible = false;
  }

  triggerHovered = () => {
    console.log(`Hover triggered on node - ${this.data.id}`);
    if (this.shapeGfx) {
      const shapeHoveredBorder = this.shapeGfx.getChildByName(LinkContainerChildNames.shapeHoveredBorder)
      if (shapeHoveredBorder) {
        shapeHoveredBorder.visible = true
      }
    }
    // this.setState()
    this.moveToFrontLayer();
  }

  triggerUnHovered = () => {
    console.log(`UnHovered triggered on node - ${this.data.id}`);
    if (this.shapeGfx) {
      const shapeHoveredBorder = this.shapeGfx.getChildByName(LinkContainerChildNames.shapeHoveredBorder)
      if (shapeHoveredBorder) {
        shapeHoveredBorder.visible = false
      }
    }
    this.moveToDataLayer()
  }

  triggerHoveredOnNeighbors = () => {
    console.log(`triggerHoveredOnNeighbors triggered on node - ${this.data.id}`);
    this.artBoard.canvas.dataStore.nodes.get(this.data.source.id)?.gfxInstance?.triggerHovered()
    this.artBoard.canvas.dataStore.nodes.get(this.data.target.id)?.gfxInstance?.triggerHovered()
    this.data.gfxInstance?.triggerHovered()

  }

  triggerUnHoveredOnNeighbors = () => {
    console.log(`triggerUnHoveredOnNeighbors triggered on node - ${this.data.id}`);
    this.artBoard.canvas.dataStore.nodes.get(this.data.source.id)?.gfxInstance?.triggerUnHovered()
    this.artBoard.canvas.dataStore.nodes.get(this.data.target.id)?.gfxInstance?.triggerUnHovered()
    this.data.gfxInstance?.triggerUnHovered()
  }


  triggerSelected = () => {
    console.log(`triggerSelected triggered on node - ${this.data.id}`);
    if (this.shapeGfx) {
      const shapeSelectedBorder = this.shapeGfx.getChildByName(LinkContainerChildNames.shapeSelectedBorder);
      if (shapeSelectedBorder) {
        shapeSelectedBorder.visible = true
      }
    }
    this.moveToFrontLayer();
  }

  triggerUnSelected = () => {
    console.log(`triggerUnSelected on node - ${this.data.id}`);
    if (this.shapeGfx) {
      const shapeSelectedBorder = this.shapeGfx.getChildByName(LinkContainerChildNames.shapeSelectedBorder);
      // console.log("shapeSelectedBorder", shapeSelectedBorder)
      if (shapeSelectedBorder) {
        shapeSelectedBorder.visible = false
      }
    }
    this.moveToDataLayer();
  }

  triggerSelectedOnNeighbors = () => {
    console.log(`triggerSelectedOnNeighbors on node - ${this.data.id}`);
    this.artBoard.canvas.dataStore.nodes.get(this.data.source.id)?.gfxInstance?.triggerSelected()
    this.artBoard.canvas.dataStore.nodes.get(this.data.target.id)?.gfxInstance?.triggerSelected()
    this.data.gfxInstance?.triggerSelected()

  }

  triggerUnSelectedOnNeighbors = () => {
    console.log(`triggerUnSelectedOnNeighbors on node - ${this.data.id}`);
    this.artBoard.canvas.dataStore.nodes.get(this.data.source.id)?.gfxInstance?.triggerUnSelected()
    this.artBoard.canvas.dataStore.nodes.get(this.data.target.id)?.gfxInstance?.triggerUnSelected()
    this.data.gfxInstance?.triggerUnSelected()
  }

  setupInteractionTriggers() {
    console.debug("===setupInteractions triggered on link", this.containerGfx)
    // Remove all listeners
    this.containerGfx.removeAllListeners();

    // listeners for hover effect
    this.containerGfx
      .on("pointerover", (event) => {
        event.stopPropagation();
        this.setState(":hovered", true)
      })
      .on("pointerout", (event) => {
        event.stopPropagation();
        if (this.dragData) return 
        this.setState(":default", true)
      })
      .on('pointerdown', (event) => {
        console.log("pointerdown", this.data.id, this.data.state)
        this.dragData = event.data
        // event.stopPropagation();
        // event.stopPropagation();
        // if (this.dragData) return 
        this.artBoard.canvas.dataStore.addToSelectedLinks(this.data)
        this.setState(":selected", true)
      })
      .on("pointermove", (event) => {
        console.log("ignoring pointermove")
        event.stopPropagation()
      })

      .on('pointerup', (event) => {
        const pointerPosition = event.data.global;
        console.log("pointerup", this.data.id, this.data.state, this.containerGfx.containsPoint(pointerPosition))
        // event.stopPropagation();
        this.dragData = null

        // 
        // if (this.containerGfx.containsPoint(pointerPosition)) {
        //   this.setState(":hovered", true)
        // } else {
          // this.setState(":default", true)
        // }
        this.artBoard.canvas.dataStore.removeFromSelectedLinks(this.data)
      })
      .on('pointerupoutside', (event) => {
        console.log("pointerupoutside", this.data.id, this.data.state)
        // event.stopPropagation();
      })
  }


  calcLabelPosition = (labelGfx: PIXI.Graphics, shapeGfx: PIXI.Graphics) => {
    console.error("calcLabelPosition Not Implemented")
    // return {startPoint: undefined, endPoint: undefined}
  }

  calcLabelAngle = (shapeGfx: PIXI.Graphics) => {
    console.error("calcLabelAngle Not Implemented")
  }

  calcStartAndEndPoints = (): { startPoint: any, endPoint: any } => {
    console.error("calcStartAndEndPoints not Implemented")
    return { startPoint: undefined, endPoint: undefined }

  }


  drawLabel = () => {
    console.debug("Line.drawLabel")
    // const labelString = this.data.label ? this.data.label : `${this.data.source?.id}-->${this.data.target?.id}`
    if (this.data.label) {
      const labelGfx = drawLabelShape({ label: this.data.label, ...this.data.style.states[":default"].label })
      labelGfx.name = LinkContainerChildNames.label
      return labelGfx
    } else {
      return new PIXI.Graphics()
    }
  }

  drawShape = () => {
    console.debug("Line.drawShape triggered", this.data)

    let { startPoint, endPoint } = this.calcStartAndEndPoints();
    // console.log("startPoint, endPoint", JSON.stringify(startPoint), JSON.stringify(endPoint))
    // let shapeName = new PIXI.Graphics();
    this.shapeGfx.removeChildren();
    this.shapeGfx.name = LinkContainerChildNames.shapeName


    // draw path
    const shapeLine = drawStraightLineShape({ startPoint, endPoint, ...this.data.style.states[":default"].shape })
    shapeLine.name = LinkContainerChildNames.shapeLine
    // shapeLine.zIndex = 1000

    // add arrow
    const arrow = drawArrowHeadShape({ startPoint, endPoint, ...this.data.style.states[":default"].shape })
    // arrow.zIndex = 1000

    shapeLine.addChild(arrow)
    this.shapeGfx.addChild(shapeLine)

    // shapeName hoveredBorder
    const shapeHoveredBorder = drawStraightLineShape({ startPoint, endPoint, ...this.data.style.states[':hovered'].shape })
    shapeHoveredBorder.visible = false
    shapeHoveredBorder.name = LinkContainerChildNames.shapeHoveredBorder
    // shapeHoveredBorder.zIndex = 10
    const hoveredArrow = drawArrowHeadShape({ startPoint, endPoint, ...this.data.style?.states[':hovered'].shape })
    shapeHoveredBorder.addChild(hoveredArrow)
    this.shapeGfx.addChild(shapeHoveredBorder)


    // shapeName selectedBorder
    const shapeSelectedBorder = drawStraightLineShape({ startPoint, endPoint, ...this.data.style.states[':selected'].shape })
    shapeSelectedBorder.visible = false
    shapeSelectedBorder.name = LinkContainerChildNames.shapeSelectedBorder
    // shapeSelectedBorder.zIndex = 10
    const selectedArrow = drawArrowHeadShape({ startPoint, endPoint, ...this.data.style?.states[':selected'].shape })
    shapeSelectedBorder.addChild(selectedArrow)
    this.shapeGfx.addChild(shapeSelectedBorder)


    return this.shapeGfx
  }

  // renderShape=true, renderLabel=true
  draw = (renderShape = true, renderLabel = true) => {
    // clear shapeName first
    console.debug(`draw link renderShape=${renderShape}; renderLabel=${renderLabel}`, this.data.id, this.data.state)
    this.setupInteractionTriggers()

    // draw shapeName
    if (renderShape) {
      this.shapeGfx.removeChildren();
      this.shapeGfx = this.drawShape();
      this.containerGfx.addChild(this.shapeGfx);
    }
    // draw label
    if (renderLabel) {
      this.labelGfx.removeChildren();
      this.labelGfx = this.drawLabel();
      this.containerGfx.addChild(this.labelGfx);
    }

    if (renderShape) {
      this.calcLabelPosition(this.labelGfx, this.shapeGfx)
    }

    this.applyStateUpdate()
  }


  redraw = (renderShape = true, renderLabel = true) => {
    console.debug("redraw ")
    this.draw(renderShape, renderLabel);


  }

  destroy(): void {
    this.containerGfx.destroy()
  }


}