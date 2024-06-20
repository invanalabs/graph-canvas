import { ArtBoard } from "../../../artBoard";
import { CanvasLink, CanvasNode } from "../../../store";
import { NodeShapeAbstract } from "../base";
import * as PIXI from 'pixi.js';
import { deepMerge } from "../../../utils/merge";
import { CircleStyleDefaults } from "./circle/defaults";
import { NodeContainerChildNames } from "../constants";


export class NodeShapeBase extends NodeShapeAbstract {

  declare originalData: CanvasNode;
  declare data: CanvasNode;
  declare dragPoint: PIXI.Point
  declare labelGfx: PIXI.Graphics
  declare shapeGfx: PIXI.Graphics 

  declare drawShape 
  declare drawLabel


  constructor(data: CanvasNode, artBoard: ArtBoard) {
    super(data, artBoard)
    this.data = this.processData(data)
    // setup intractions
    this.setupInteractionTriggers()
    this.data.setGfxInstance(this);
    console.log("this.data.gfxInstance ", this.data, this.data.gfxInstance )

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
    // this.canvas.layers.moveGfxToDataLayer(this.data, LAYER_GRAPHICS_TYPES_CONSTANTS.NODES)
  }

  moveToFrontLayer(): void {
    // console.error("not implemented")
    // this.canvas.layers.moveGfxToFrontLayer(this.data, LAYER_GRAPHICS_TYPES_CONSTANTS.NODES)
  }

  moveToMapLayer(): void{
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

  triggerSelected = () => {
    console.log(`triggerSelected on node - ${this.data.id}`);
    if (this.shapeGfx) {
      const shapeSelectedBorder = this.shapeGfx.getChildByName(NodeContainerChildNames.shapeSelectedBorder);
      if (shapeSelectedBorder) {
        shapeSelectedBorder.visible = true
      }
    }
  }

  triggerUnSelected = () => {
    console.log(`triggerUnSelected on node - ${this.data.id}`);
    if (this.shapeGfx) {
      const shapeSelectedBorder = this.shapeGfx.getChildByName(NodeContainerChildNames.shapeSelectedBorder);
      // console.log("shapeSelectedBorder", shapeSelectedBorder)
      if (shapeSelectedBorder) {
        shapeSelectedBorder.visible = false
      }
    }
  }

  triggerSelectedOnNeighbors = () => {
    console.log("=triggerSelectedOnNeighbors triggered")
    // const neighbors: { nodes: CanvasNode[], links: CanvasLink[] } = this.canvas.graph.getNeighbors(this.data);
    // console.log("getNeighbors", neighbors)
    this.data.neighbors.nodes.forEach((node: CanvasNode) => {
      node.gfxInstance?.triggerSelected();
    })
    this.data.neighbors.links.forEach((link: CanvasLink) => {
      link.gfxInstance?.triggerSelected();
    });
  }

  triggerUnSelectedOnNeighbors = () => {
    console.log("=triggerUnSelectedOnNeighbors triggered")
    // const neighbors: { nodes: ICanvasNode[], links: ICanvasLink[] } = this.canvas.graph.getNeighbors(this.data);
    // console.log("getNeighbors", neighbors)
    this.data.neighbors.nodes.forEach((node: CanvasNode) => {
      node.gfxInstance?.triggerUnSelected();
    })
    this.data.neighbors.links.forEach((link: CanvasLink) => {
      link.gfxInstance?.triggerUnSelected();
    });
  }

  onDragStart = (event: PIXI.FederatedPointerEvent) => {
    this.dragPoint = event.data.getLocalPosition(this.containerGfx.parent);
    console.log("onDragStart triggered", this.dragPoint)
    event.stopPropagation();
    // this.dragPoint.x -= this.containerGfx.x;
    // this.dragPoint.y -= this.containerGfx.y;
    this.containerGfx.parent.on("pointermove", this.onDragMove);
    this.triggerSelected()
    this.triggerSelectedOnNeighbors();
  };

  onDragMove = (event: PIXI.FederatedPointerEvent) => {
    const newPoint = event.data.getLocalPosition(this.containerGfx.parent);
    console.log("onDragMove triggered", newPoint)
    console.log("onDragMove", newPoint, this.dragPoint)
    // const x = newPoint.x //- this.dragPoint.x;
    // const y = newPoint.y //- this.dragPoint.y;   
    // update node positions data 
    this.artBoard.canvas.dataStore.moveNodeTo(this.data.id, newPoint.x, newPoint.y)

    // const neighborLinks = this.canvas.graph.getNeighborLinks(this.data);
    // this.canvas.renderer.reRenderLinks(neighborLinks)
    // this.triggerSelectedOnNeighbors(); // TODO - fix this performance ; use stage=hovered/selected may be instead for re-render
  };

  onDragEnd = (event: PIXI.FederatedPointerEvent) => {
    console.log("onDragEnd triggered")
    event.stopPropagation()
    this.containerGfx.parent.off("pointermove", this.onDragMove);
    this.triggerUnSelected();
    this.triggerUnSelectedOnNeighbors();
  };

  setupInteractionTriggers() {
    console.log("===setupInteractionTriggers triggered")
    const _this = this;
    // Remove all listeners
    this.containerGfx.removeAllListeners();

    // listeners for hover effect
    this.containerGfx
      .on("pointerover", () => {
        _this.triggerHovered();
        _this.triggerHoveredOnNeighbors()
      })
      .on("pointerout", () => {
        this.triggerUnHovered()
        this.triggerUnHoveredOnNeighbors()
      })
      .on('pointerdown', this.onDragStart.bind(this))
      .on('pointerup', this.onDragEnd.bind(this))
      .on('pointerupoutside', this.onDragEnd.bind(this))
  }

  draw = (renderShape = true, renderLabel = true) => {
    // clear shapeName first
    this.clear();
    // draw shapeName
    if (renderShape) {
      this.shapeGfx = this.drawShape();
      console.log("====this.shapeGfx ", this.shapeGfx )
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

    if (this.data.state) {
      this.setState(this.data.state)
    }
  }

  redraw = (renderShape = true, renderLabel = true) => {
    console.log("redraw ")
    this.draw(renderShape, renderLabel);
  }

  destroy(): void {
    this.containerGfx.destroy()
  }

}