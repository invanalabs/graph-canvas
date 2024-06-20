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




export class LinkShapeBase extends LinkShapeAbstract {

  declare data: CanvasLink
  declare originalData: CanvasLink;
  declare labelGfx: PIXI.Graphics;
  declare shapeGfx: PIXI.Graphics;

  constructor(data: CanvasLink, artBoard: ArtBoard) {
    super(data, artBoard)
    this.data = this.processData(data)
    this.shapeGfx = new PIXI.Graphics();
    this.labelGfx = new PIXI.Graphics();
    // setup intractions
    this.setupInteractionTriggers()
    this.data.setGfxInstance(this);
    console.log("this.data.gfxInstance ", this.data, this.data.gfxInstance)
  }


  processData = (data: CanvasLink) => {
    //@ts-ignore
    data.style = data.style ? deepMerge(LinkStyleDefaults, data.style) : LinkStyleDefaults
    return data;
  }

  // layers
  moveToDataLayer(): void {
    // console.error("not implemented")
    // this.canvas.layers.moveGfxToDataLayer(this.data, LAYER_GRAPHICS_TYPES_CONSTANTS.NODES)
  }

  moveToFrontLayer(): void {
    // console.error("not implemented")
    // this.canvas.layers.moveGfxToFrontLayer(this.data, LAYER_GRAPHICS_TYPES_CONSTANTS.NODES)
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
    console.log("=triggerHoveredOnNeighbors triggered")
    this.artBoard.canvas.dataStore.nodes.get(this.data.sourceId)?.gfxInstance?.triggerHovered()
    this.artBoard.canvas.dataStore.nodes.get(this.data.targetId)?.gfxInstance?.triggerHovered()
    this.data.gfxInstance?.triggerHovered()

  }

  triggerUnHoveredOnNeighbors = () => {
    console.log("=triggerUnHoveredOnNeighbors triggered")
    this.artBoard.canvas.dataStore.nodes.get(this.data.sourceId)?.gfxInstance?.triggerUnHovered()
    this.artBoard.canvas.dataStore.nodes.get(this.data.targetId)?.gfxInstance?.triggerUnHovered()
    this.data.gfxInstance?.triggerUnHovered()
  }


  triggerSelected = () => {
    console.log(`triggerSelected on node - ${this.data.id}`);
    if (this.shapeGfx) {
      const shapeSelectedBorder = this.shapeGfx.getChildByName(LinkContainerChildNames.shapeSelectedBorder);
      if (shapeSelectedBorder) {
        shapeSelectedBorder.visible = true
      }
    }
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
  }

  triggerSelectedOnNeighbors = () => {
    console.log("=triggerSelectedOnNeighbors triggered")
    this.artBoard.canvas.dataStore.nodes.get(this.data.sourceId)?.gfxInstance?.triggerSelected()
    this.artBoard.canvas.dataStore.nodes.get(this.data.targetId)?.gfxInstance?.triggerSelected()
    this.data.gfxInstance?.triggerSelected()
  }

  triggerUnSelectedOnNeighbors = () => {
    console.log("=triggerUnSelectedOnNeighbors triggered")
    this.artBoard.canvas.dataStore.nodes.get(this.data.sourceId)?.gfxInstance?.triggerUnSelected()
    this.artBoard.canvas.dataStore.nodes.get(this.data.targetId)?.gfxInstance?.triggerUnSelected()
    this.data.gfxInstance?.triggerUnSelected()
  }

  setupInteractionTriggers() {
    console.log("===setupInteractions triggered on link", this.containerGfx)
    const _this = this;
    // Remove all listeners
    this.containerGfx.removeAllListeners();

    // listeners for hover effect
    this.containerGfx
      .on("pointerover", () => {
        _this.triggerHovered()
        _this.triggerHoveredOnNeighbors()
      })
      .on("pointerout", () => {
        _this.triggerUnHovered()
        _this.triggerUnHoveredOnNeighbors()
      })
  }

  calcLabelPosition = (labelGfx: PIXI.Graphics, shapeGfx: PIXI.Graphics) => {
    console.error("calcLabelPosition Not Implemented")
    // return {startPoint: undefined, endPoint: undefined}
  }

  calcLabelAngle = (shapeGfx: PIXI.Graphics) => {
    console.error("calcLabelAngle Not Implemented")
  }

  calcStartAndEndPoints = (): {startPoint: any, endPoint: any}  => {
    console.error("calcStartAndEndPoints not Implemented")
    return {startPoint: undefined, endPoint: undefined}

  }


  drawLabel = () => {
    console.log("Line.drawLabel")
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
    console.log("Line.drawShape triggered", this.data)

    let { startPoint, endPoint } = this.calcStartAndEndPoints();
    // console.log("startPoint, endPoint", JSON.stringify(startPoint), JSON.stringify(endPoint))
    // let shapeName = new PIXI.Graphics();
    this.shapeGfx.removeChildren();
    this.shapeGfx.name = LinkContainerChildNames.shapeName


    // draw path
    const shapeLine = drawStraightLineShape({  startPoint, endPoint, ...this.data.style.states[":default"].shape})
    shapeLine.name = LinkContainerChildNames.shapeLine
    shapeLine.zIndex = 1000

    // add arrow
    const arrow = drawArrowHeadShape({ startPoint, endPoint, ...this.data.style.states[":default"].shape })
    arrow.zIndex = 1000

    shapeLine.addChild(arrow)
    this.shapeGfx.addChild(shapeLine)

    // shapeName hoveredBorder
    const shapeHoveredBorder = drawStraightLineShape({ startPoint, endPoint, ...this.data.style.states[':hovered'].shape })
    shapeHoveredBorder.visible = false
    shapeHoveredBorder.name = LinkContainerChildNames.shapeHoveredBorder
    shapeHoveredBorder.zIndex = 10
    const hoveredArrow = drawArrowHeadShape({ startPoint, endPoint, ...this.data.style?.states[':hovered'].shape })
    shapeHoveredBorder.addChild(hoveredArrow)
    this.shapeGfx.addChild(shapeHoveredBorder)


    // shapeName selectedBorder
    const shapeSelectedBorder = drawStraightLineShape({ startPoint, endPoint, ...this.data.style.states[':selected'].shape })
    shapeSelectedBorder.visible = false
    shapeSelectedBorder.name = LinkContainerChildNames.shapeSelectedBorder
    shapeSelectedBorder.zIndex = 10
    const selectedArrow = drawArrowHeadShape({ startPoint, endPoint, ...this.data.style?.states[':selected'].shape })
    shapeSelectedBorder.addChild(selectedArrow)
    this.shapeGfx.addChild(shapeSelectedBorder)


    return this.shapeGfx
  }

  // renderShape=true, renderLabel=true
  draw = (renderShape = true, renderLabel = true) => {
    // clear shapeName first
    console.log(`draw renderShape=${renderShape}; renderLabel=${renderLabel}`)

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

    // this.setState(this.data.state)
  }


  redraw = (renderShape = true, renderLabel = true) => {
    console.log("redraw ")
    this.draw(renderShape, renderLabel);
  }

  destroy(): void {
    this.containerGfx.destroy()
  }


}