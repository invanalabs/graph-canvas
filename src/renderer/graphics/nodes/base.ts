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
      node.gfxInstance?.setState(":selected")
    })

    this.data.neighbors.links.forEach((link: CanvasLink) => {
      link.gfxInstance?.setState(":selected")
    });
  }

  triggerUnSelectedOnNeighbors = () => {
    console.log("=triggerUnSelectedOnNeighbors triggered")
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
    this.containerGfx.parent.on("pointermove", this.onDragMove);
    // this.containerGfx.parent.on('pointerup', this.onDragEnd);
    // this.containerGfx.parent.on('pointerupoutside', this.onDragEnd);

    // disable interactions on links 


  };

  onDragMove = (event: PIXI.FederatedPointerEvent) => {
    // const newPoint = event.data.getLocalPosition(this.containerGfx.parent);
    // event.stopPropagation();
    // const _this = this;
    // console.log("onDragMove", _this.data.id, _this.data.state)

    event.stopPropagation();

    if (this.dragData) {
      const newPoint = this.dragData.getLocalPosition(this.containerGfx.parent);
      console.log("onDragMove", this.data.id,  newPoint, this.dragPoint)
      // const x = newPoint.x //- this.dragPoint.x;
      // const y = newPoint.y //- this.dragPoint.y;   
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
    // this.triggerSelectedOnNeighbors(); // TODO - fix this performance ; use stage=hovered/selected may be instead for re-render
  };

  onDragEnd = (event: PIXI.FederatedPointerEvent) => {
    console.log("onDragEnd triggered")
    event.stopPropagation()
    // const _this = this;
    this.dragData = null
    // this.containerGfx.parent.off("pointermove", this.onDragMove);
    this.containerGfx.parent.off('pointermove', this.onDragMove);
    // this.containerGfx.parent.off('pointerup', this.onDragEnd(event));
    // this.containerGfx.parent.off('pointerupoutside', this.onDragEnd);
    // this.setState(":default", true)    

    const neighborLinks = this.artBoard.canvas.dataStore.getNeighborLinks(this.data.id);
    neighborLinks.forEach((link: CanvasLink) => {
      if (link.gfxInstance) {
        link.gfxInstance.setupInteractionTriggers()
      }
    })

  };

  setupInteractionTriggers() {
    console.log("===setupInteractionTriggers triggered")
    // const _this = this;
    // Remove all listeners
    this.containerGfx.removeAllListeners();

    // listeners for hover effect
    this.containerGfx
      .on("pointerover", (event) => {
        console.log("pointerover", this.data.id, this.data.state, this.dragData)
        event.stopPropagation();
        // if (_this.dragData) return 
        // _this.triggerHovered();
        // _this.triggerHoveredOnNeighbors()
        this.setState(":hovered", true)

      })
      .on("pointerout", (event) => {
        console.log("pointerout", this.data.id, this.data.state, this.dragData)
        event.stopPropagation();

        // if (_this.state !== ":selected"){
        // this.triggerUnHovered()
        // this.triggerUnHoveredOnNeighbors()  
        // }
        // if(_this.data.state !== ":selected"){
        if (this.dragData) return
        this.setState(":default", true)
        // }
      })
      .on('pointerdown', (event) => {
        console.log("pointerdown", this.data.id, this.data.state)
        // event.stopPropagation();
        // if (this.dragData) return 
        this.artBoard.canvas.dataStore.addToSelectedNodes(this.data)
        this.setState(":selected", true)
        this.onDragStart(event)
      })
      .on('pointerup', (event) => {
        const pointerPosition = event.data.global;

        console.log("pointerup", this.data.id, this.data.state, this.containerGfx.containsPoint(pointerPosition))
        event.stopPropagation();

        // 
        if (this.containerGfx.containsPoint(pointerPosition)) {
          this.setState(":hovered", true)
        } else {
          this.setState(":default", true)
        }
        this.onDragEnd(event)
        this.artBoard.canvas.dataStore.removeFromSelectedNodes(this.data)
      })
      .on('pointerupoutside', (event) => {
        console.log("pointerupoutside", this.data.id, this.data.state)
        event.stopPropagation();
        this.onDragEnd(event)
      })
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