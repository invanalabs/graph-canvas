import { ArtBoard } from "../../../artBoard";
import { CanvasLink } from "../../../store";
import { deepMerge } from "../../../utils/merge";
import { LinkShapeAbstract } from "../abstract";
import * as PIXI from 'pixi.js';
import { LinkStyleDefaults } from "./defaults";
import { LinkContainerChildNames } from "../constants";
import drawLabelShape from "../../primitives/label";
import drawArrowHeadShape from "../../primitives/arrows/arrowHead";
import { ZIndexOrder } from "../nodes";
import drawStraightLineShape from "../../primitives/links/straightLine";
import drawArrowTriangleShape from "../../primitives/arrows/arrowTriangle";


export class LinkShapeBase extends LinkShapeAbstract {

  declare data: CanvasLink
  declare originalData: CanvasLink;
  declare labelGfx: PIXI.Graphics;
  declare shapeGfx: PIXI.Graphics;

  private dragData: PIXI.FederatedPointerEvent | null = null;


  constructor(data: CanvasLink, artBoard: ArtBoard) {
    super(data, artBoard)
    this.data = this.processData(data)
    this.containerGfx.name = `link-${this.data.id}`
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
    this.containerGfx.zIndex = ZIndexOrder.DATA_LAYER_LINKS;

    // this.canvas.layers.moveGfxToDataLayer(this.data, LAYER_GRAPHICS_TYPES_CONSTANTS.NODES)
  }

  moveToFrontLayer(): void {
    // console.error("not implemented")
    // this.canvas.layers.moveGfxToFrontLayer(this.data, LAYER_GRAPHICS_TYPES_CONSTANTS.NODES)
    this.containerGfx.zIndex = ZIndexOrder.FRONT_LAYER_LINKS;
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
 
  triggerSelected = (event?: PIXI.FederatedPointerEvent) => {
    console.log(`Selected triggered on link - ${this.data.id}`);
  
  }

  triggerUnSelected = (event?: PIXI.FederatedPointerEvent) => {
    console.log(`UnSelected triggered on link - ${this.data.id}`);
  }

  triggerHighlighted = (event?: PIXI.FederatedPointerEvent, setNeighborsToo: boolean = false) => {
    console.log(`triggerHighlighted triggered on node - ${this.data.id}`);
    this.moveToFrontLayer();

    if (this.shapeGfx) {
      const shapeHighlightedBorder = this.shapeGfx.getChildByName(LinkContainerChildNames.shapeHighlightedBorder);
      if (shapeHighlightedBorder) {
        shapeHighlightedBorder.visible = true
      }
      const textBg = this.labelGfx?.getChildByName(LinkContainerChildNames.labelBackground);
      console.log("====textBg", textBg)
      if (textBg) {
        textBg.visible = true
      }
    }
    if (setNeighborsToo) {
      this.artBoard.canvas.dataStore.nodes.get(this.data.source.id)?.gfxInstance?.triggerHighlighted()
      this.artBoard.canvas.dataStore.nodes.get(this.data.target.id)?.gfxInstance?.triggerHighlighted()
      // this.data.gfxInstance?.triggerHighlighted(event)
    }
  }

  triggerUnHighlighted = (event?: PIXI.FederatedPointerEvent, setNeighborsToo: boolean = false) => {
    console.log(`triggerUnHighlighted on node - ${this.data.id}`);
    this.moveToDataLayer();

    if (this.shapeGfx) {
      const shapeHighlightedBorder = this.shapeGfx.getChildByName(LinkContainerChildNames.shapeHighlightedBorder);
      // console.log("shapeHighlightedBorder", shapeHighlightedBorder)
      if (shapeHighlightedBorder) {
        shapeHighlightedBorder.visible = false
      }
      const textBg = this.labelGfx?.getChildByName(LinkContainerChildNames.labelBackground);
      console.log("====textBg", textBg)
      if (textBg) {
        textBg.visible = false
      }
    }

    if (setNeighborsToo) {
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
        // console.log("pointerup", this.data.id, this.data.state, this.containerGfx.containsPoint(pointerPosition))
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
    // .on('pointerupoutside', (event) => {
    //   console.log("pointerupoutside", this.data.id, this.data.state)
    //   // event.stopPropagation();
    // })
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
      const labelGfx = drawLabelShape({ label: this.data.label, ...this.data.style.label })
      labelGfx.name = LinkContainerChildNames.label
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
      if (this.shapeGfx){
        this.shapeGfx.removeChildren();
      }
      this.shapeGfx = this.drawShape();
      this.containerGfx.addChild(this.shapeGfx);
    }
    // draw label
    if (renderLabel) {
      if (this.labelGfx){
        this.labelGfx.removeChildren();
      }
      this.labelGfx = this.drawLabel();
      if(this.labelGfx){
        this.containerGfx.addChild(this.labelGfx);
      }
    }

    if (renderShape) {
      if (this.labelGfx){
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
    this.containerGfx.destroy()
  }


}