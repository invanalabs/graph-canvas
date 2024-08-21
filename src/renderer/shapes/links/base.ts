import { ArtBoard } from "../../../artBoard";
import { CanvasLink } from "../../../store";
import { LinkShapeAbstract } from "../abstract";
import * as PIXI from 'pixi.js';
import { LinkContainerChildNames } from "../constants";
import drawLabelShape from "../../primitives/label";
import { ZIndexOrder } from "../nodes";


export class LinkShapeBase extends LinkShapeAbstract {

  declare data: CanvasLink
  declare originalData: CanvasLink;
  declare labelGfx: PIXI.Graphics;
  declare shapeGfx: PIXI.Graphics;

  private dragData: PIXI.FederatedPointerEvent | null = null;

  declare isLabelVisible: boolean
  declare isShapeVisible: boolean


  constructor(data: CanvasLink, artBoard: ArtBoard) {
    super(data, artBoard)
    this.data = this.processData(data)
    this.containerGfx.label = `link-${this.data.id}`
    this.shapeGfx = new PIXI.Graphics();
    this.labelGfx = new PIXI.Graphics();

    this.isLabelVisible = false
    this.isShapeVisible = false
  

    // setup intractions
    this.data.setGfxInstance(this);
    // console.debug("this.data.gfxInstance ", this.data, this.data.gfxInstance)
  }


  processData = (data: CanvasLink) => {
    //@ts-ignore
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

  moveToMapLayer(): void {
    // console.error("not implemented")
  }

  triggerMuted = (event?: PIXI.FederatedPointerEvent) => {
    console.debug(`triggerMuted triggered on link - ${this.data.id}`);
    this.containerGfx.alpha = 0.2
  }

  triggerDefault = (event?: PIXI.FederatedPointerEvent) => {
    console.debug(`triggerDefault triggered on link - ${this.data.id}`);
    this.containerGfx.alpha = 1;
    this.containerGfx.visible = true
  }

  triggerSelected = (event?: PIXI.FederatedPointerEvent, setNeighborsToo: boolean = false) => {
    console.debug(`Selected triggered on link - ${this.data.id}`);
    this.moveToFrontLayer();

    if (this.shapeGfx) {
      const selectedBorder = this.shapeGfx.getChildByName(LinkContainerChildNames.shapeSelectedBorder);
      if (selectedBorder) {
        selectedBorder.visible = true
      }
    }
    if (setNeighborsToo) {
      this.artBoard.canvas.dataStore.nodes.get(this.data.source.id)?.gfxInstance?.triggerSelected()
      this.artBoard.canvas.dataStore.nodes.get(this.data.target.id)?.gfxInstance?.triggerSelected()
    }
  }

  triggerUnSelected = (event?: PIXI.FederatedPointerEvent, setNeighborsToo: boolean = false) => {
    console.debug(`UnSelected triggered on link - ${this.data.id}`);
    this.moveToFrontLayer();

    if (this.shapeGfx) {
      const selectedBorder = this.shapeGfx.getChildByName(LinkContainerChildNames.shapeSelectedBorder);
      if (selectedBorder) {
        selectedBorder.visible = false
      }
    }
    if (setNeighborsToo) {
      this.artBoard.canvas.dataStore.nodes.get(this.data.source.id)?.gfxInstance?.triggerUnSelected()
      this.artBoard.canvas.dataStore.nodes.get(this.data.target.id)?.gfxInstance?.triggerUnSelected()
    }
  }

  triggerHighlighted = (event?: PIXI.FederatedPointerEvent, setNeighborsToo: boolean = false) => {
    console.debug(`triggerHighlighted triggered on link - ${this.data.id}`);
    this.moveToFrontLayer();

    if (this.shapeGfx) {
      const shapeHighlightedBorder = this.shapeGfx.getChildByName(LinkContainerChildNames.shapeHighlightedBorder);
      if (shapeHighlightedBorder) {
        shapeHighlightedBorder.visible = true
      }
      // const textBg = this.labelGfx?.getChildByName(LinkContainerChildNames.labelBackground);
      // if (textBg) {
      //   // textBg.visible = true
      //   textBg.tint = "yellow"
      // }
    }
    if (setNeighborsToo) {
      this.artBoard.canvas.dataStore.nodes.get(this.data.source.id)?.gfxInstance?.triggerHighlighted()
      this.artBoard.canvas.dataStore.nodes.get(this.data.target.id)?.gfxInstance?.triggerHighlighted()
    }
  }

  triggerUnHighlighted = (event?: PIXI.FederatedPointerEvent, setNeighborsToo: boolean = false) => {
    console.debug(`triggerUnHighlighted on link - ${this.data.id}`);
    this.moveToDataLayer();

    if (this.shapeGfx) {
      const shapeHighlightedBorder = this.shapeGfx.getChildByName(LinkContainerChildNames.shapeHighlightedBorder);
      // console.log("shapeHighlightedBorder", shapeHighlightedBorder)
      if (shapeHighlightedBorder) {
        shapeHighlightedBorder.visible = false
      }
      // const textBg = this.labelGfx?.getChildByName(LinkContainerChildNames.labelBackground);
      // if (textBg) {
      //   textBg.tint = null
      // }
    }

    if (setNeighborsToo) {
      this.artBoard.canvas.dataStore.nodes.get(this.data.source.id)?.gfxInstance?.triggerUnHighlighted()
      this.artBoard.canvas.dataStore.nodes.get(this.data.target.id)?.gfxInstance?.triggerUnHighlighted()
      // this.data.gfxInstance?.triggerUnHighlighted(event)

    }
  }
  setupInteractionTriggers() {
    console.debug("===setupInteractions triggered on link", this.containerGfx)
    // Remove all listeners
    this.containerGfx.removeAllListeners();
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
        this.dragData = event.data
        this.artBoard.canvas.dataStore.addToHighlightedLinks(this.data)
        this.setState(":selected", true, event)
      })
      .on("pointermove", (event) => {
        event.stopPropagation()
      })
      .on('pointerup', (event) => {
        this.dragData = null
        this.artBoard.canvas.dataStore.removeFromHighlightedLinks(this.data)
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
    if (this.data.label) {
      const labelGfx = drawLabelShape({ label: this.data.label, ...this.data.style.label }, this.artBoard.canvas.options.resolution?.labels)
      labelGfx.label = LinkContainerChildNames.label
      labelGfx.visible = this.data.isLabelVisible


      this.containerGfx.addChild(labelGfx)
      return labelGfx
    }
    //  else {
    //   return new PIXI.Graphics()
    // }
  }

  declare drawShape

  // renderShape=true, renderLabel=true
  draw = (renderShape = true, renderLabel = true) => {
    // clear shapeName first
    console.debug(`draw link renderShape=${renderShape}; renderLabel=${renderLabel}`, this.data.id, this.data.state)
    this.setupInteractionTriggers()

    // draw shapeName
    if (renderShape) {
      if (this.shapeGfx) { // if already exist
        this.shapeGfx.removeChildren();
      }
      this.shapeGfx = this.drawShape();
      this.containerGfx.addChild(this.shapeGfx);
    }
    // draw label
    if (renderLabel) {
      if (this.labelGfx) { // if already exist
        this.labelGfx.destroy();
      }
      this.labelGfx = this.drawLabel();
      if (this.labelGfx) {
        this.containerGfx.addChild(this.labelGfx);
        // const textBg = this.labelGfx?.getChildByName(LinkContainerChildNames.labelBackground);
        // if (textBg) {
        //   textBg.visible = true
        // }




      }
    }

    if (renderShape) {
      if (this.labelGfx) {
        this.calcLabelPosition(this.labelGfx, this.shapeGfx)


      }
    }

    this.applyStateUpdate()
    this.setInteractiveRecursive(this.containerGfx)
  }


  redraw = (renderShape = true, renderLabel = true) => {
    console.debug("redraw ", renderShape, renderLabel)
    this.draw(renderShape, renderLabel);
  }

  destroy(): void {
    this.containerGfx.removeAllListeners();
    this.containerGfx.destroy();
  }


}