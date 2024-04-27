
import * as PIXI from 'pixi.js';
import { CanvasLink, CanvasNode } from './types';
import GraphCanvas from '../canvas/canvas';
import { LinkContainerChildNames, NodeContainerChildNames } from './constants';
import { LinkStyleDefaults, NodeStyleDefaults } from './defaults';
import { deepMerge } from '../utils/merge';


abstract class Shape {
    abstract data: CanvasLink | CanvasNode;
    abstract gfxContainer: PIXI.Container;

    abstract setupInteractions(): void;
    abstract pointerOver(): void;
    abstract pointerOut(): void;

    abstract draw(): void;
    abstract drawLabel(): PIXI.Graphics | undefined | null;
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
        // in v8; { isRenderGroup:true} // this containers transform is now handled on the GPU!
        
        // this.gfxContainer.
        // Make the gfxContainer interactive...
        this.gfxContainer.cursor = 'pointer';
        this.gfxContainer.eventMode = 'static';
    }

    drawLabel = () => {
        console.debug("BaseShape.drawLabel not defined")
        return ;
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
        console.log("======data.style before", data.group, JSON.stringify(data.style), )
        console.log("======data.NodeStyleDefaults", JSON.stringify(NodeStyleDefaults))
        console.log("======d", deepMerge(NodeStyleDefaults, data.style),  data.style)
        data.style = data.style ? deepMerge(NodeStyleDefaults, data.style) : NodeStyleDefaults
        console.log("======data.style after", data.group, JSON.stringify(data.style))
        this.data = { ...{ x: 0, y: 0 }, ...data }
    }

    pointerOver() {
        console.log("==pointerOver",)
        // this.setBorder(
        //     NodeStyleDefaults[':hovered'].shape.border.color,
        //     NodeStyleDefaults[':hovered'].shape.border.thickness + 10 
        // )
        // getChildByLabel in v8 
        let shape = this.gfxContainer.getChildByName(NodeContainerChildNames.shape);
        if (shape) {
            const shapeHoveredBorder: PIXI.Graphics = shape.getChildByName(NodeContainerChildNames.shapeHoveredBorder)
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
        let shape = this.gfxContainer.getChildByName(NodeContainerChildNames.shape);
        if (shape) {
            const shapeHoveredBorder: PIXI.Graphics = shape.getChildByName(NodeContainerChildNames.shapeHoveredBorder)
            console.log("====pointerOver", shapeHoveredBorder)
            if (shapeHoveredBorder) {
                // shapeHoveredBorder.tint = 0xffffff;
                // shapeHoveredBorder.setStrokeStyle({color: 0xff0000})
                shapeHoveredBorder.visible = false
            }
        }
    }

    showHighlightedRing = () => {
        let shape = this.gfxContainer.getChildByName(NodeContainerChildNames.shape);
        if (shape) {
            const shapeSelectedBorder = shape.getChildByName(NodeContainerChildNames.shapeSelectedBorder);
            console.log("shapeSelectedBorder", shapeSelectedBorder)
            if (shapeSelectedBorder) {
                shapeSelectedBorder.visible = true
            }
        }
    }

    hideHighlightedRing = () => {
        let shape = this.gfxContainer.getChildByName(NodeContainerChildNames.shape);
        if (shape) {
            const shapeSelectedBorder = shape.getChildByName(NodeContainerChildNames.shapeSelectedBorder);
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

    // setBorder = (color: string | number, thickness: number, set: boolean = true) => {
    //     const shape: PIXI.Graphics | null = this.gfxContainer.getChildByName(NodeContainerChildNames.shape);
    //     console.log("setBorder", color, thickness, set, shape)
    //     // shape.tint = color;
    //     shape?.stroke({ //shape?.setStrokeStyle({ 
    //         width: thickness,
    //         color: color
    //     });
    // }

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
        if (labelGfx){
            this.gfxContainer.addChild(labelGfx);
        }
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

    constructor(data: CanvasLink, canvas: GraphCanvas) {
        super(data, canvas)
        data.style = data.style ? deepMerge(LinkStyleDefaults, data.style) : LinkStyleDefaults
        this.data = data
    }

    pointerOver() {
        console.log("==pointerOver",)
        let shape = this.gfxContainer.getChildByName(LinkContainerChildNames.shape);
        if (shape) {
            const shapeHoveredBorder: PIXI.Graphics = shape.getChildByName(LinkContainerChildNames.shapeHoveredBorder)
            if (shapeHoveredBorder) {
                shapeHoveredBorder.visible = true
            }
        }
    }

    pointerOut() {
        console.log("==pointerOut",)
        let shape = this.gfxContainer.getChildByName(LinkContainerChildNames.shape);
        if (shape) {
            const shapeHoveredBorder: PIXI.Graphics = shape.getChildByName(LinkContainerChildNames.shapeHoveredBorder)
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

    calcLabelPosition = (labelGfx: PIXI.Graphics, shapeGfx: PIXI.Graphics) => {
        console.error("calcLabelPosition Not Implemented")
    }

    calcLabelAngle =(shapeGfx: PIXI.Graphics) => {
        console.error("calcLabelAngle Not Implemented")
    }
    calcStartAndEndPoints = () => {
        console.error("calcStartAndEndPoints not Implemented")
    }

    calcArrowAngle = (arrow: PIXI.Graphics, startPoint: PIXI.Point, endPoint: PIXI.Point,  points: number[], ) => {
        console.error("calcArrowAngle not implemented")
    }

    drawArrow = (startPoint: PIXI.Point, endPoint: PIXI.Point) => {
        let arrow = new PIXI.Graphics();
        const points = [0, 0, 10, -5, 6.666666666666667, 0, 10, 5, 0, 0]
        arrow.drawPolygon(points);
        arrow.lineStyle(this.data.style.shape.thickness,  this.data.style.shape.color);
        this.calcArrowAngle(arrow, startPoint, endPoint, points)
        return arrow;
    }

    drawLabel = () => {
        console.log("Line.drawLabel")
        const labelString = this.data.name ? this.data.name : `${this.data.source?.id}-->${this.data.target?.id}`

        const labelGfx = new PIXI.Graphics()
        labelGfx.name = LinkContainerChildNames.name
        // Add label text
        // https://pixijs.com/8.x/playground?exampleId=text.pixiText
        const style = new PIXI.TextStyle({ fontFamily: 'Arial', fontSize: 12, fill: 0xFFFFFF })
        const text = new PIXI.Text({ text : labelString,  style});
        text.name = LinkContainerChildNames.nameText
        text.anchor.set(0.5);

        text.position.y = -8; // offset 
        text.resolution = window.devicePixelRatio * 2;
        labelGfx.addChild(text)

        // text.cursor = 'pointer';

        return labelGfx
    }

    drawPath = (shapeLine: PIXI.Graphics, startPoint: PIXI.Point, endPoint: PIXI.Point) => {
        console.error("Not implemented");

    }

    drawShape = () => {
        console.log("Line.drawShape triggered", this.data)

        let {startPoint, endPoint} = this.calcStartAndEndPoints();
        // console.log("startPoint, endPoint", JSON.stringify(startPoint), JSON.stringify(endPoint))
        let shape = new PIXI.Graphics();
        shape.name = LinkContainerChildNames.shape


        let shapeLine = new PIXI.Graphics();
        shapeLine.name = LinkContainerChildNames.shapeLine
        this.drawPath(shapeLine, startPoint, endPoint)
        shapeLine.lineStyle(this.data.style.shape.thickness, this.data.style.shape.color);

        // console.log("endPoint", endPoint)
        shapeLine.zIndex = 1000
        // add arrow
        const arrow = this.drawArrow(startPoint, endPoint)
        shapeLine.addChild(arrow)
        shape.addChild(shapeLine)

        // shape hoveredBorder
        const shapeHoveredBorder = new PIXI.Graphics();
        this.drawPath(shapeHoveredBorder, startPoint, endPoint)

        shapeHoveredBorder.lineStyle( this.data.style.states[':hovered'].shape.thickness,
              this.data.style.states[':hovered'].shape.color);
        shapeHoveredBorder.alpha = this.data.style.states[':hovered'].shape.opacity;
        shapeHoveredBorder.visible = false
        shapeHoveredBorder.name = LinkContainerChildNames.shapeHoveredBorder
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
        this.calcLabelPosition(labelGfx, shapeGfx)
        this.gfxContainer.addChild(labelGfx);
        // setup intractions
        this.setupInteractions()
    }
}

export default BaseShape;