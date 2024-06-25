import { ArtBoard } from "../../../artBoard";
import { CanvasLink, CanvasNode } from "../../../store";
import { NodeShapeAbstract } from "../base";
import * as PIXI from 'pixi.js';
import { deepMerge } from "../../../utils/merge";
import { CircleStyleDefaults } from "./circle/defaults";
import { NodeContainerChildNames } from "../constants";


export const ZIndexOrder = {
  DATA_LAYER: 5,
  FRONT_LAYER: 10,
  ANNOTATIONS_LAYER: 15
}

export class NodeShapeBase extends NodeShapeAbstract {

  declare originalData: CanvasNode;
  declare data: CanvasNode;

  declare dragPoint: PIXI.Point
  private dragData: PIXI.FederatedPointerEvent | null = null;

  declare labelGfx: PIXI.Graphics
  declare shapeGfx: PIXI.Graphics

  isInside: boolean = false;


  declare drawShape
  declare drawLabel


  constructor(data: CanvasNode, artBoard: ArtBoard) {
    super(data, artBoard)
    this.data = this.processData(data)
    // setup intractions
    // this.setupInteractionTriggers()
    this.data.setGfxInstance(this);
    console.log("this.data.gfxInstance ", this.data, this.data.gfxInstance)


    // Bind event handlers to this instance
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragMove = this.onDragMove.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);


  }

  processData = (data: CanvasNode) => {
    console.log("======data.style before", data.group, JSON.stringify(data.style),)
    //@ts-ignore
    data.style = data.style ? deepMerge(CircleStyleDefaults, data.style) : CircleStyleDefaults
    console.log("======data.style after", data.group, JSON.stringify(data.style));
    //@ts-ignore
    // data = { ...{ x: 0, y: 0 }, ...data }
    return data
  }

  setPosition = (x: number, y: number) => {
    console.log("setPosition", x, y)
    this.containerGfx.position.set(x, y);
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

  // moveToMapLayer(): void{
  //   // console.error("not implemented")
  // }


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
      const shapeHoveredBorder = this.shapeGfx.getChildByName(NodeContainerChildNames.shapeHoveredBorder)
      if (shapeHoveredBorder) {
        shapeHoveredBorder.visible = true
      }
    }
    this.moveToFrontLayer();
  }

  triggerUnHovered = () => {
    console.log(`UnHovered triggered on node - ${this.data.id}`);
    if (this.shapeGfx) {
      const shapeHoveredBorder = this.shapeGfx.getChildByName(NodeContainerChildNames.shapeHoveredBorder)
      if (shapeHoveredBorder) {
        shapeHoveredBorder.visible = false
      }
    }
    this.moveToDataLayer()
  }

  triggerHoveredOnNeighbors = () => {
    console.log("=triggerHoveredOnNeighbors triggered")
    // const neighbors: { nodes: CanvasNode[], links: CanvasLink[] } = this.canvas.graph.getNeighbors(this.data);
    // console.log("getNeighbors", neighbors)
    this.data.neighbors.nodes.forEach((node: CanvasNode) => {
      node.gfxInstance?.triggerHovered();
    })
    this.data.neighbors.links.forEach((link: CanvasLink) => {
      link.gfxInstance?.triggerHovered();
    });
  }

  triggerUnHoveredOnNeighbors = () => {
    console.log("=triggerUnHoveredOnNeighbors triggered")
    // const neighbors: { nodes: CanvasNode[], links: CanvasLink[] } = this.canvas.graph.getNeighbors(this.data);
    // console.log("getNeighbors", neighbors)
    this.data.neighbors.nodes.forEach((node: CanvasNode) => {
      node.gfxInstance?.triggerUnHovered();
    })
    this.data.neighbors.links.forEach((link: CanvasLink) => {
      link.gfxInstance?.triggerUnHovered();
    });
  }

  triggerHighlighted = () => {
    console.log(`triggerHighlighted on node - ${this.data.id}`);
    if (this.shapeGfx) {
      const shapeHighlightedBorder = this.shapeGfx.getChildByName(NodeContainerChildNames.shapeHighlightedBorder);
      if (shapeHighlightedBorder) {
        shapeHighlightedBorder.visible = true
      }
    }
  }

  triggerUnHighlighted = () => {
    console.log(`triggerUnHighlighted on node - ${this.data.id}`);
    if (this.shapeGfx) {
      const shapeHighlightedBorder = this.shapeGfx.getChildByName(NodeContainerChildNames.shapeHighlightedBorder);
      // console.log("shapeHighlightedBorder", shapeHighlightedBorder)
      if (shapeHighlightedBorder) {
        shapeHighlightedBorder.visible = false
      }
    }
  }

  triggerHighlightedOnNeighbors = () => {
    console.log("=triggerHighlightedOnNeighbors triggered")
    // const neighbors: { nodes: CanvasNode[], links: CanvasLink[] } = this.canvas.graph.getNeighbors(this.data);
    // console.log("getNeighbors", neighbors)
    this.data.neighbors.nodes.forEach((node: CanvasNode) => {
      node.gfxInstance?.setState(":highlighted")
    })

    this.data.neighbors.links.forEach((link: CanvasLink) => {
      link.gfxInstance?.setState(":highlighted")
    });
  }



  triggerUnHighlightedOnNeighbors = () => {
    console.log("=triggerUnHighlightedOnNeighbors triggered")
    // const neighbors: { nodes: ICanvasNode[], links: ICanvasLink[] } = this.canvas.graph.getNeighbors(this.data);
    // console.log("getNeighbors", neighbors)
    this.data.neighbors.nodes.forEach((node: CanvasNode) => {
      node.gfxInstance?.setState(":default")
    })
    this.data.neighbors.links.forEach((link: CanvasLink) => {
      link.gfxInstance?.setState(":default")
    });
  }

  onDragStart = (event: PIXI.FederatedPointerEvent) => {
    // this.dragPoint = event.data.getLocalPosition(this.containerGfx.parent);
    this.dragData = event.data;

    // this.dragPoint.copyFrom(this.dragData.getLocalPosition(this.containerGfx.parent));
    // console.log("onDragStart triggered", this.dragPoint)
    event.stopPropagation();
    // this.dragPoint.x -= this.containerGfx.x;
    // this.dragPoint.y -= this.containerGfx.y;

    // this.containerGfx.parent.off('pointerover', this.pointerover);
    // this.containerGfx.parent.off('pointerout', this.pointerout);
    // this.containerGfx.parent.off('pointerupoutside', this.pointerUpOutside);



    this.containerGfx.parent.on("pointermove", this.onDragMove);
    // this.containerGfx.parent.off('pointerover', this.pointerover.bind(this));

    // disable interactions on links 


  };

  onDragMove = (event: PIXI.FederatedPointerEvent) => {
    // const newPoint = event.data.getLocalPosition(this.containerGfx.parent);
    // event.stopPropagation();
    // const _this = this;
    // console.log("onDragMove", _this.data.id, _this.data.state)

    const el = this.containerGfx.parent
    const point = event.data.getLocalPosition(el);
    if (point.x >= 0 && point.x <= el.width && point.y >= 0 && point.y <= el.height) {
        if (!this.isInside) {
            this.isInside = true;
            console.log('Pointer Over');
            this.containerGfx.off("pointerl")
        }
    }


    event.stopPropagation();

    if (this.dragData) {
      const newPoint = this.dragData.getLocalPosition(this.containerGfx.parent);
      console.log("onDragMove", this.data.id,  newPoint, this.dragPoint)
      // update node positions data 
      this.artBoard.canvas.dataStore.moveNodeTo(this.data.id, newPoint.x, newPoint.y)

    }


    const neighborLinks = this.artBoard.canvas.dataStore.getNeighborLinks(this.data.id);
    neighborLinks.forEach((link: CanvasLink) => {
      if (link.gfxInstance) {
        link.gfxInstance.removeInteractionTriggers()
      }
    })


    // this.canvas.renderer.reRenderLinks(neighborLinks)
    // this.triggerHighlightedOnNeighbors(); // TODO - fix this performance ; use stage=hovered/selected may be instead for re-render
  };

  onDragEnd = (event: PIXI.FederatedPointerEvent) => {
    console.log("onDragEnd triggered")
    event.stopPropagation()
    // const _this = this;
    this.dragData = null
    // this.containerGfx.parent.off("pointermove", this.onDragMove);
    // this.containerGfx.parent.on('pointerout', this.pointerout);
    // this.containerGfx.parent.on('pointerover', this.pointerover);
    // this.containerGfx.parent.on('pointerupoutside', this.pointerUpOutside);

    this.containerGfx.parent.off('pointermove', this.onDragMove);

    // this.setState(":default", true)    

    const neighborLinks = this.artBoard.canvas.dataStore.getNeighborLinks(this.data.id);
    neighborLinks.forEach((link: CanvasLink) => {
      if (link.gfxInstance) {
        link.gfxInstance.setupInteractionTriggers()
      }
    })

  };

  pointerover =(event: PIXI.FederatedPointerEvent)=>{
    console.log("====pointerover", this.data.id,  this.data.state, this.dragData)
    event.stopPropagation();
    // if ([":highlighted", ":hovered", ":selected"].includes(this.data.state)) return 
    if (this.dragData) return
    console.log("pointerover", this.data.id, this.data.state, this.dragData)
    this.setState(":hovered", true)
    this.c
  }

  pointerDown = (event: PIXI.FederatedPointerEvent) => {
    console.log("pointerdown", this.data.id, this.data.state)
    // event.stopPropagation();
    // if (this.dragData) return 
    this.artBoard.canvas.dataStore.addToHighlightedNodes(this.data)
    this.setState(":highlighted", true)
    this.onDragStart(event)
  }

  // Function to check if the pointer is within the bounds of the parent sprite
isPointerInBounds = (event: PIXI.FederatedPointerEvent, container: PIXI.Container): boolean => {
  const localPosition = event.data.getLocalPosition(container);
  return localPosition.x >= 0 && localPosition.x <= container.width &&
         localPosition.y >= 0 && localPosition.y <= container.height;
}
 
  pointerout = (event: PIXI.FederatedPointerEvent) => {
        // event.stopPropagation();
        // if ([":highlighted", ":hovered", ":selected"].includes(this.data.state)) return 
        console.log("====pointerout", this.data.id,  this.data.state, this.isPointerInBounds(event, this.containerGfx), this.dragData)
        if ([":highlighted", ":hovered", ":selected"].includes(this.data.state) && this.isPointerInBounds(event, this.containerGfx)) return
        console.log("pointerout", this.data.id, this.data.state, this.dragData)
        this.setState(":default", true)
  }

  pointerUp = (event: PIXI.FederatedPointerEvent) => {
    // const pointerPosition = event.data.global;
    console.log("pointerup", this.data.id, this.data.state)
    event.stopPropagation();

    const pointerPosition = event.data.getLocalPosition(this.containerGfx.parent);

    if (this.containerGfx.containsPoint(pointerPosition)) {
      this.setState(":hovered", true)
    } else {
      this.setState(":default", true)
    }
    this.onDragEnd(event)
    this.artBoard.canvas.dataStore.removeFromHighlightedNodes(this.data)

  }

  pointerUpOutside = (event: PIXI.FederatedPointerEvent) => {
    console.log("pointerupoutside", this.data.id, this.data.state)
    event.stopPropagation();
    this.onDragEnd(event)

  }

  setupInteractionTriggers() {
    console.log("===setupInteractionTriggers triggered")
    // const _this = this;
    // Remove all listeners
    this.containerGfx.removeAllListeners();

    // listeners for hover effect
    this.containerGfx
      .on("pointerover", this.pointerover)
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
      console.log("====this.shapeGfx ", this.shapeGfx)
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
    console.log("redraw ", this.data.id)
    this.draw(renderShape, renderLabel);
  }

  destroy(): void {
    this.containerGfx.destroy()
  }

}