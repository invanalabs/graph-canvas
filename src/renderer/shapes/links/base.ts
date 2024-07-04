import { ArtBoard } from "../../../artBoard";
import { CanvasLink } from "../../../store";
import { deepMerge } from "../../../utils/merge";
import { LinkShapeAbstract } from "../abstract";
import * as PIXI from 'pixi.js';
import { LinkStyleDefaults } from "./straight/defaults";
import { LinkContainerChildNames } from "../constants";
import drawLabelShape from "../../primitives/label";
import drawArrowHeadShape from "../../primitives/arrowHead";
import { ZIndexOrder } from "../nodes";
import drawStraightLineShape from "../../primitives/links/straightLine";



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

  triggerInactive = (event?: PIXI.FederatedPointerEvent) => {
    console.log(`triggerInactive triggered on node - ${this.data.id}`);
    this.containerGfx.alpha = 0.2
  }

  triggerDefault = (event?: PIXI.FederatedPointerEvent) => {
    console.log(`triggerDefault triggered on node - ${this.data.id}`);
    this.containerGfx.alpha = 1;
    this.containerGfx.visible = true
  }

  // triggerHidden = (event?: PIXI.FederatedPointerEvent) => {
  //   this.containerGfx.visible = false;
  // }

  // triggerHovered = (event?: PIXI.FederatedPointerEvent) => {
  //   console.log(`Hover triggered on node - ${this.data.id}`);
  //   if (this.shapeGfx) {
  //     const shapeHoveredBorder = this.shapeGfx.getChildByName(LinkContainerChildNames.shapeHoveredBorder)
  //     if (shapeHoveredBorder) {
  //       shapeHoveredBorder.visible = true
  //     }
  //   }
  //   // this.setState()
  //   this.moveToFrontLayer();
  // }

  // triggerUnHovered = (event?: PIXI.FederatedPointerEvent) => {
  //   console.log(`UnHovered triggered on node - ${this.data.id}`);
  //   if (this.shapeGfx) {
  //     const shapeHoveredBorder = this.shapeGfx.getChildByName(LinkContainerChildNames.shapeHoveredBorder)
  //     if (shapeHoveredBorder) {
  //       shapeHoveredBorder.visible = false
  //     }
  //   }
  //   this.moveToDataLayer()
  // }

  // triggerHoveredOnNeighbors = (event?: PIXI.FederatedPointerEvent) => {
  //   console.log(`triggerHoveredOnNeighbors triggered on node - ${this.data.id}`);
  //   this.artBoard.canvas.dataStore.nodes.get(this.data.source.id)?.gfxInstance?.triggerHovered()
  //   this.artBoard.canvas.dataStore.nodes.get(this.data.target.id)?.gfxInstance?.triggerHovered()
  //   this.data.gfxInstance?.triggerHovered()

  // }

  // triggerUnHoveredOnNeighbors = (event?: PIXI.FederatedPointerEvent) => {
  //   console.log(`triggerUnHoveredOnNeighbors triggered on node - ${this.data.id}`);
  //   this.artBoard.canvas.dataStore.nodes.get(this.data.source.id)?.gfxInstance?.triggerUnHovered()
  //   this.artBoard.canvas.dataStore.nodes.get(this.data.target.id)?.gfxInstance?.triggerUnHovered()
  //   this.data.gfxInstance?.triggerUnHovered()
  // }


  triggerHighlighted = (event?: PIXI.FederatedPointerEvent, setNeighborsToo: boolean = false) => {
    console.log(`triggerHighlighted triggered on node - ${this.data.id}`);
    if (this.shapeGfx) {
      const shapeHighlightedBorder = this.shapeGfx.getChildByName(LinkContainerChildNames.shapeHighlightedBorder);
      if (shapeHighlightedBorder) {
        shapeHighlightedBorder.visible = true
      }
      const textBg = this.labelGfx.getChildByName(LinkContainerChildNames.labelBackground);
      console.log("====textBg", textBg)
      if (textBg) {
        textBg.visible = true
      }
    }
    this.moveToFrontLayer();
    if (setNeighborsToo){
      this.artBoard.canvas.dataStore.nodes.get(this.data.source.id)?.gfxInstance?.triggerHighlighted()
      this.artBoard.canvas.dataStore.nodes.get(this.data.target.id)?.gfxInstance?.triggerHighlighted()
      // this.data.gfxInstance?.triggerHighlighted(event)
    }
  }

  triggerUnHighlighted = (event?: PIXI.FederatedPointerEvent, setNeighborsToo: boolean = false) => {
    console.log(`triggerUnHighlighted on node - ${this.data.id}`);
    if (this.shapeGfx) {
      const shapeHighlightedBorder = this.shapeGfx.getChildByName(LinkContainerChildNames.shapeHighlightedBorder);
      // console.log("shapeHighlightedBorder", shapeHighlightedBorder)
      if (shapeHighlightedBorder) {
        shapeHighlightedBorder.visible = false
      }
      const textBg = this.labelGfx.getChildByName(LinkContainerChildNames.labelBackground);
      console.log("====textBg", textBg)
      if (textBg) {
        textBg.visible = false
      }
    }
    this.moveToDataLayer();

    if (setNeighborsToo){
      this.artBoard.canvas.dataStore.nodes.get(this.data.source.id)?.gfxInstance?.triggerUnHighlighted()
      this.artBoard.canvas.dataStore.nodes.get(this.data.target.id)?.gfxInstance?.triggerUnHighlighted()  
      // this.data.gfxInstance?.triggerUnHighlighted(event)

    }
  }

  // triggerHighlightedOnNeighbors = (event?: PIXI.FederatedPointerEvent) => {
  //   console.log(`triggerHighlightedOnNeighbors on node - ${this.data.id}`);
  //   this.artBoard.canvas.dataStore.nodes.get(this.data.source.id)?.gfxInstance?.triggerHighlighted()
  //   this.artBoard.canvas.dataStore.nodes.get(this.data.target.id)?.gfxInstance?.triggerHighlighted()
  //   this.data.gfxInstance?.triggerHighlighted(event)
  // }

  // triggerUnHighlightedOnNeighbors = (event?: PIXI.FederatedPointerEvent) => {
  //   console.log(`triggerUnHighlightedOnNeighbors on node - ${this.data.id}`);
  //   this.artBoard.canvas.dataStore.nodes.get(this.data.source.id)?.gfxInstance?.triggerUnHighlighted()
  //   this.artBoard.canvas.dataStore.nodes.get(this.data.target.id)?.gfxInstance?.triggerUnHighlighted()  
  //   this.data.gfxInstance?.triggerUnHighlighted(event)
  // }

  setupInteractionTriggers() {
    console.debug("===setupInteractions triggered on link", this.containerGfx)
    // Remove all listeners
    this.containerGfx.removeAllListeners();

    // listeners for hover effect
    this.containerGfx
      .on("pointerover", (event) => {
        event.stopPropagation();
        this.setState(":highlighted", true, event)
      })
      .on("pointerout", (event) => {
        event.stopPropagation();
        if (this.dragData) return 
        this.setState(":default", true, event)
      })
      .on('pointerdown', (event) => {
        console.log("pointerdown", this.data.id, this.data.state)
        this.dragData = event.data
        // event.stopPropagation();
        // event.stopPropagation();
        // if (this.dragData) return 
        this.artBoard.canvas.dataStore.addToHighlightedLinks(this.data)
        // this.setState(":highlighted", true, event)
        this.setState(":highlighted", true, event)
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
        this.artBoard.canvas.dataStore.removeFromHighlightedLinks(this.data)
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
      const labelGfx = drawLabelShape({ label: this.data.label, ...this.data.style.label })
      labelGfx.name = LinkContainerChildNames.label
      return labelGfx
    } else {
      return new PIXI.Graphics()
    }
  }

  drawShape = () => {
    console.debug("Line.drawShape triggered", this.data)

    const { startPoint, endPoint } = this.calcStartAndEndPoints();
    // console.log("startPoint, endPoint", JSON.stringify(startPoint), JSON.stringify(endPoint))
    // let shapeName = new PIXI.Graphics();
    this.shapeGfx.removeChildren();
    this.shapeGfx.name = LinkContainerChildNames.shapeName


    // draw path
    const shapeLine = drawStraightLineShape({ startPoint, endPoint, ...this.data.style.shape })
    shapeLine.name = LinkContainerChildNames.shapeLine
    // shapeLine.zIndex = 1000

    // add arrow
    const arrow = drawArrowHeadShape({ startPoint, endPoint, ...this.data.style.shape })
    // arrow.zIndex = 1000

    shapeLine.addChild(arrow)
    this.shapeGfx.addChild(shapeLine)

    // // shapeName hoveredBorder
    // const shapeHoveredBorder = drawStraightLineShape({ startPoint, endPoint, ...this.data.style.states[':hovered'].shape })
    // shapeHoveredBorder.visible = false
    // shapeHoveredBorder.name = LinkContainerChildNames.shapeHoveredBorder
    // // shapeHoveredBorder.zIndex = 10
    // const hoveredArrow = drawArrowHeadShape({ startPoint, endPoint, ...this.data.style?.states[':hovered'].shape })
    // shapeHoveredBorder.addChild(hoveredArrow)
    // this.shapeGfx.addChild(shapeHoveredBorder)


    // shapeName selectedBorder
    const shapeHighlightedBorder = drawStraightLineShape({ startPoint, endPoint, ...this.data.style.states[':highlighted'].shape })
    shapeHighlightedBorder.visible = false
    shapeHighlightedBorder.name = LinkContainerChildNames.shapeHighlightedBorder
    // shapeHighlightedBorder.zIndex = 10
    const selectedArrow = drawArrowHeadShape({ startPoint, endPoint, ...this.data.style?.states[':highlighted'].shape })
    shapeHighlightedBorder.addChild(selectedArrow)
    this.shapeGfx.addChild(shapeHighlightedBorder)


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
    this.setInteractiveRecursive(this.containerGfx)

  }


  redraw = (renderShape = true, renderLabel = true) => {
    console.debug("redraw ")
    this.draw(renderShape, renderLabel);


  }

  destroy(): void {
    this.containerGfx.destroy()
  }


}