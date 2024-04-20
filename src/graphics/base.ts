
import * as PIXI from 'pixi.js';
import { CanvasLink, CanvasNode } from './types';
import GraphCanvas from '../canvas/canvas';
import { LinkContainerChildNames, NodeContainerChildNames } from './constants';
import { LinkStyleDefaults, NodeStyleDefaults } from './defaults';
import { getContactPointFromCircle, getContactPointOnCircle } from './utils';


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
    color: string =  '#ff0000';

    constructor(data: CanvasLink, canvas: GraphCanvas) {
        super(data, canvas)
        this.data = data
    }

    pointerOver() {
        console.log("==pointerOver",)
        let shape = this.gfxContainer.getChildByLabel(LinkContainerChildNames.shape);
        if (shape) {
            const shapeHoveredBorder: PIXI.Graphics = shape.getChildByLabel(LinkContainerChildNames.shapeHoveredBorder)
            if (shapeHoveredBorder) {
                shapeHoveredBorder.visible = true
            }
        }
    }

    pointerOut() {
        console.log("==pointerOut",)
        let shape = this.gfxContainer.getChildByLabel(LinkContainerChildNames.shape);
        if (shape) {
            const shapeHoveredBorder: PIXI.Graphics = shape.getChildByLabel(LinkContainerChildNames.shapeHoveredBorder)
            if (shapeHoveredBorder) {
                shapeHoveredBorder.visible = false
            }
        }
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

    calcLabelPosition = (labelGfx: PIXI.Graphics) => {
        console.error("calcLabelPosition Not Implemented")
    }

    calcLabelAngle = () => {
        console.error("calcLabelAngle Not Implemented")
    }
    calcStartAndEndPoints = () => {
        console.error("calcStartAndEndPoints not Implemented")
    }

    calcArrowAngle = (arrow: PIXI.Graphics, startPoint: PIXI.Point, endPoint: PIXI.Point) => {
        console.error("calcArrowAngle not implemented")
    }

    drawArrow = (startPoint: PIXI.Point, endPoint: PIXI.Point) => {
        let arrow = new PIXI.Graphics();
        arrow.poly([0, 0, 10, -5, 6.666666666666667, 0, 10, 5, 0, 0]);
        arrow.stroke({width: this.thickness, color: this.color});
        this.calcArrowAngle(arrow, startPoint, endPoint)
        return arrow;
    }

    drawLabel = () => {
        console.log("Line.drawLabel")
        const labelString = this.data.label ? this.data.label : `${this.data.source?.id}-->${this.data.target?.id}`

        const labelGfx = new PIXI.Graphics()
        labelGfx.label = LinkContainerChildNames.label
        // Add label text
        // https://pixijs.com/8.x/playground?exampleId=text.pixiText
        const style = new PIXI.TextStyle({ fontFamily: 'Arial', fontSize: 12, fill: 0xFFFFFF })
        const text = new PIXI.Text({ text : labelString,  style});
        text.label = LinkContainerChildNames.labelText
        text.anchor.set(0.5);

        text.position.y = -8; // offset 
        text.resolution = window.devicePixelRatio * 2;
        labelGfx.addChild(text)

        // text.cursor = 'pointer';

        return labelGfx
    }
    drawShape = () => {
        console.log("Line.drawShape triggered", this.data)

        let {startPoint, endPoint} = this.calcStartAndEndPoints();

        let shape = new PIXI.Graphics();
        shape.label = LinkContainerChildNames.shape


        let shapeLine = new PIXI.Graphics();
        shapeLine.label = LinkContainerChildNames.shapeLine

        // console.log("endPoint", endPoint)
        shapeLine.moveTo(startPoint.x, startPoint.y);
        shapeLine.lineTo(endPoint.x, endPoint.y);
        shapeLine.stroke({width: this.thickness, color: this.color});
        shapeLine.zIndex = 1000
        // add arrow
        const arrow = this.drawArrow(startPoint, endPoint)
        shapeLine.addChild(arrow)
        shape.addChild(shapeLine)

        // shape hoveredBorder
        const shapeHoveredBorder = new PIXI.Graphics();
        shapeHoveredBorder.moveTo(startPoint.x, startPoint.y);
        shapeHoveredBorder.lineTo(endPoint.x, endPoint.y);
        shapeHoveredBorder.stroke({ 
            width: LinkStyleDefaults[':hovered'].shape.thickness,
            color: LinkStyleDefaults[':hovered'].shape.color
        });
        shapeHoveredBorder.alpha = LinkStyleDefaults[':hovered'].shape.opacity;
        shapeHoveredBorder.visible = false
        shapeHoveredBorder.label = LinkContainerChildNames.shapeHoveredBorder
        shapeHoveredBorder.zIndex = 10
        shape.addChild(shapeHoveredBorder)
        // shapeLine.closePath()

        return shape
    }
    draw = () => {
        // clear shape first
        this.clear();
        // draw shape
        let shapeGfx = this.drawShape();
        this.gfxContainer.addChild(shapeGfx);
        // draw label
        let labelGfx = this.drawLabel();
        this.calcLabelPosition(labelGfx)
        this.gfxContainer.addChild(labelGfx);
        // setup intractions
        this.setupInteractions()
    }
}

export default BaseShape;