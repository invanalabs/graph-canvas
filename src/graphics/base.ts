
import * as PIXI from 'pixi.js';
import { CanvasLink, CanvasNode } from './types';
import GraphCanvas from '../canvas/canvas';
import { NodeContainerChildNames } from './constants';
import { NodeStyleDefaults } from './defaults';


abstract class Shape {
    abstract data: CanvasLink | CanvasNode;
    abstract gfxContainer: PIXI.Container;

    abstract setupInteractions(): void;
    abstract pointerOver(): void;
    abstract pointerOut(): void;

    abstract draw(): void;
    abstract drawLabel(): PIXI.Graphics;
    abstract drawShape(): PIXI.Graphics;
    abstract redraw(): void;

    abstract clear(): void;
    // abstract destroy(): void;
    abstract setGfxPosition(x: number, y: number): void;
}


export class BaseShape extends Shape {
    /*
        this is the base shape for the Shape and the LabelShape
    */
    data: CanvasLink | CanvasNode;
    gfxContainer: PIXI.Container;
    canvas: GraphCanvas


    constructor(data: CanvasLink | CanvasNode, canvas: GraphCanvas) {
        super()
        this.data = data;
        this.canvas = canvas;
        this.gfxContainer = new PIXI.Container()
        // Make the gfxContainer interactive...
        this.gfxContainer.cursor = 'pointer';
        this.gfxContainer.eventMode = 'static';
    }

    drawLabel = (): PIXI.Graphics => {
        console.debug("BaseShape.drawLabel not defined")
    }

    setupInteractions() { console.error("BaseShape.setupInteractions triggered") }
    pointerOver() { console.error("BaseShape.pointerOver not implemented") }
    pointerOut() { console.error("BaseShape.pointerOut not implemented") }

    drawShape = (): PIXI.Graphics => {
        console.error("BaseShape.drawShape not implemented")
        return new PIXI.Graphics()
    }

    draw(): void {
        console.error("BaseShape.draw not implemented")
    }

    redraw = () => {
        console.log("redraw ")
        this.clear();
        this.draw();
    }

    clear = () => {
        console.log("BaseShape.clear triggered")
        this.gfxContainer.removeChildren();
    }

    setGfxPosition = (x: number, y: number) => {
        this.gfxContainer.position.set(x, y);
    }

}


export class NodeShapeBase extends BaseShape {
    data: CanvasNode
    //@ts-ignore
    dragPoint: PIXI.Point

    constructor(data: CanvasNode, canvas: GraphCanvas) {
        super(data, canvas)
        this.data = { ...{ x: 0, y: 0 }, ...data }
    }

    pointerOver() {
        console.log("==pointerOver",)
        // this.setBorder(
        //     NodeStyleDefaults[':hovered'].shape.border.color,
        //     NodeStyleDefaults[':hovered'].shape.border.thickness + 10 
        // )
        let shape = this.gfxContainer.getChildByLabel(NodeContainerChildNames.shape);
        if (shape) {
            const shapeHoveredBorder: PIXI.Graphics = shape.getChildByLabel(NodeContainerChildNames.shapeHoveredBorder)
            console.log("====pointerOver", shapeHoveredBorder)
            if (shapeHoveredBorder) {
                // shapeHoveredBorder.tint = 0xff00ff;
                shapeHoveredBorder.visible = true
                // shapeHoveredBorder.setStrokeStyle({color: 0xff0000})
            }
        }
    }



    pointerOut() {
        console.log("==pointerOut",)
        // this.setBorder(
        //     NodeStyleDefaults.shape.border.color,
        //     NodeStyleDefaults.shape.border.thickness 
        // )
        let shape = this.gfxContainer.getChildByLabel(NodeContainerChildNames.shape);
        if (shape) {
            const shapeHoveredBorder: PIXI.Graphics = shape.getChildByLabel(NodeContainerChildNames.shapeHoveredBorder)
            console.log("====pointerOver", shapeHoveredBorder)
            if (shapeHoveredBorder) {
                // shapeHoveredBorder.tint = 0xffffff;
                // shapeHoveredBorder.setStrokeStyle({color: 0xff0000})
                shapeHoveredBorder.visible = false

            }
        }
    }

    showHighlightedRing = () => {
        let shape = this.gfxContainer.getChildByLabel(NodeContainerChildNames.shape);
        if (shape) {
            const shapeSelectedBorder = shape.getChildByLabel(NodeContainerChildNames.shapeSelectedBorder);
            console.log("shapeSelectedBorder", shapeSelectedBorder)
            if (shapeSelectedBorder) {
                shapeSelectedBorder.visible = true
            }
        }
    }

    hideHighlightedRing = () => {
        let shape = this.gfxContainer.getChildByLabel(NodeContainerChildNames.shape);
        if (shape) {
            const shapeSelectedBorder = shape.getChildByLabel(NodeContainerChildNames.shapeSelectedBorder);
            console.log("shapeSelectedBorder", shapeSelectedBorder)
            if (shapeSelectedBorder) {
                shapeSelectedBorder.visible = false
            }
        }
    }

    onDragStart = (event: PIXI.FederatedPointerEvent) => {
        console.log("onDragStart triggered", event.data.getLocalPosition(this.gfxContainer.parent))
        event.stopPropagation();
        this.dragPoint = event.data.getLocalPosition(this.gfxContainer.parent);
        console.log("onDragStart", this.dragPoint)
        this.dragPoint.x -= this.gfxContainer.x;
        this.dragPoint.y -= this.gfxContainer.y;
        this.gfxContainer.parent.on("pointermove", this.onDragMove);
        this.showHighlightedRing()
    };

    onDragMove = (event: PIXI.FederatedPointerEvent) => {
        console.log("onDragMove triggered", event.data.getLocalPosition(this.gfxContainer.parent))
        const newPoint = event.data.getLocalPosition(this.gfxContainer.parent);
        console.log("onDragMove", newPoint, this.dragPoint)
        const x = newPoint.x //- this.dragPoint.x;
        const y = newPoint.y //- this.dragPoint.y;   
        this.canvas.graph.updateNodePosition(this.data.id, x, y)
        // update node positions data 
        const neighborLinks = this.canvas.graph.getNeighborLinks(this.data);
        console.log("neighborLinks", neighborLinks)
        this.canvas.renderer.reRenderLinks(neighborLinks)
    };

    onDragEnd = (event: PIXI.FederatedPointerEvent) => {
        console.log("onDragEnd triggered")
        event.stopPropagation()
        this.gfxContainer.parent.off("pointermove", this.onDragMove);
        this.hideHighlightedRing();
    };

    setupInteractions() {
        console.log("===setupInteractions triggered")
        // Remove all listeners
        this.gfxContainer.removeAllListeners();

        // listeners for hover effect
        this.gfxContainer
            .on("pointerover", this.pointerOver.bind(this))
            .on("pointerout", this.pointerOut.bind(this))
            .on('pointerdown', this.onDragStart.bind(this))
            .on('pointerup', this.onDragEnd.bind(this))
            .on('pointerupoutside', this.onDragEnd.bind(this))
    }

    setBorder = (color: string | number, thickness: number, set: boolean = true) => {
        const shape: PIXI.Graphics | null = this.gfxContainer.getChildByLabel(NodeContainerChildNames.shape);
        console.log("setBorder", color, thickness, set, shape)
        // shape.tint = color;
        shape?.stroke({ //shape?.setStrokeStyle({ 
            width: thickness,
            color: color
        });
    }

    draw = () => {
        // clear shape first
        this.clear();
        // draw shape
        let shapeGfx = this.drawShape();
        this.gfxContainer.addChild(shapeGfx);
        // this.setBorder(     
        //     NodeStyleDefaults.shape.border.color, 
        //     NodeStyleDefaults.shape.border.thickness, 
        //     false
        // )
        // draw label
        let labelGfx = this.drawLabel();
        this.gfxContainer.addChild(labelGfx);
        // setup intractions
        this.setupInteractions()
        // update the position
        if (this.data.x && this.data.y) {
            this.setGfxPosition(this.data?.x, this.data?.y)
        }
    }
}

export class LinkShapeBase extends BaseShape {
    data: CanvasLink
    thickness: number = 2

    constructor(data: CanvasLink, canvas: GraphCanvas) {
        super(data, canvas)
        this.data = data
    }

    pointerOver() {
        console.log("==pointerOver",)
        this.gfxContainer.tint = 0x666666;
    }

    pointerOut() {
        console.log("==pointerOut",)
        this.gfxContainer.tint = 0xFFFFFF;
    }

    setupInteractions() {
        console.log("===setupInteractions triggered")
        // Remove all listeners
        this.gfxContainer.removeAllListeners();

        // listeners for hover effect
        this.gfxContainer
            .on("pointerover", this.pointerOver.bind(this))
            .on("pointerout", this.pointerOut.bind(this))
    }

    draw = () => {
        // clear shape first
        this.clear();
        // draw shape
        let shapeGfx = this.drawShape();
        this.gfxContainer.addChild(shapeGfx);
        // draw label
        let labelGfx = this.drawLabel();
        this.gfxContainer.addChild(labelGfx);
        // setup intractions
        this.setupInteractions()
    }
}

export default BaseShape;