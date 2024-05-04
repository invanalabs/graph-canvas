
import * as PIXI from 'pixi.js';
import { CanvasLink, CanvasNode } from './types';
import GraphCanvas from '../canvas/canvas';
import { LinkContainerChildNames, NodeContainerChildNames } from './constants';
import { LinkStyleDefaults, NodeStyleDefaults } from './defaults';
import { deepMerge } from '../utils/merge';
import drawStraightLineShape from '../primitives/lines/straightLine';
import drawArrowHeadShape from '../primitives/arrowHead';
import drawLabelShape from '../primitives/label';
// import drawDottedLineShape from '../primitives/lines/dottedLine';


abstract class Shape {
    abstract readonly originalData: CanvasLink | CanvasNode;
    abstract data: CanvasLink | CanvasNode;
    // abstract state: "hovered" | "selected" | ;
    abstract gfxContainer: PIXI.Graphics;
    abstract labelGfx: PIXI.Graphics;
    abstract shapeGfx: PIXI.Graphics; 

    /* this wil  */
    abstract processData(data: CanvasLink | CanvasNode): CanvasLink | CanvasNode; 
    abstract setupInteractions(): void;
    abstract pointerOver(): void;
    abstract pointerOut(): void;

    abstract draw(drawShape: boolean, drawLabel:boolean): void;
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
    originalData: CanvasLink | CanvasNode
    declare data: CanvasLink | CanvasNode;
    gfxContainer: PIXI.Graphics;
    canvas: GraphCanvas
    declare labelGfx: PIXI.Graphics;
    declare shapeGfx: PIXI.Graphics; 

    constructor(data: CanvasLink | CanvasNode, canvas: GraphCanvas) {
        super()
        this.originalData = data
        this.canvas = canvas;
        this.gfxContainer = new PIXI.Graphics()
        // in v8; { isRenderGroup:true} // this containers transform is now handled on the GPU!
        // Make the gfxContainer interactive...
        this.gfxContainer.cursor = 'pointer';
        // this.gfxContainer.eventMode = 'static';
    }

    processData = (data: CanvasLink | CanvasNode): CanvasLink | CanvasNode => {
         console.error("BaseShape.processData triggered but not implemented") 
         return data;
    }
    setupInteractions() { console.error("BaseShape.setupInteractions triggered") }
    pointerOver() { console.error("BaseShape.pointerOver not implemented") }
    pointerOut() { console.error("BaseShape.pointerOut not implemented") }


    drawLabel = (): PIXI.Graphics => {
        console.debug("BaseShape.drawLabel not defined")
        return new PIXI.Graphics()
    }

    drawShape = (): PIXI.Graphics => {
        console.error("BaseShape.drawShape not implemented")
        return new PIXI.Graphics()
    }

    draw(renderShape=true, renderLabel=true) {
        console.error("BaseShape.draw not implemented", renderShape, renderLabel)
    }

    redraw = (renderShape=true, renderLabel=true) => {
        console.log("redraw ")
        // this.clear();
        this.draw(renderShape, renderLabel);
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
    declare originalData:  CanvasNode;
    declare data:  CanvasNode;
    declare dragPoint: PIXI.Point
    declare labelGfx: PIXI.Graphics;
    declare shapeGfx: PIXI.Graphics; 

    

    constructor(data: CanvasNode, canvas: GraphCanvas) {
        super(data, canvas)
        this.data = this.processData(data)
        // setup intractions
        this.setupInteractions()
    }

    processData = (data:  CanvasNode)  =>  {
        console.log("======data.style before", data.group, JSON.stringify(data.style), )
        data.style = data.style ? deepMerge(NodeStyleDefaults, data.style) : NodeStyleDefaults
        console.log("======data.style after", data.group, JSON.stringify(data.style));
        data = { ...{ x: 0, y: 0 }, ...data }
        return data
    }

    setHover = () => {
        let shape = this.gfxContainer.getChildByName(NodeContainerChildNames.shape);
        if (shape) {
            const shapeHoveredBorder: PIXI.Graphics = shape.getChildByName(NodeContainerChildNames.shapeHoveredBorder)
            // console.log("====pointerOver", shapeHoveredBorder)
            if (shapeHoveredBorder) {
                // shapeHoveredBorder.tint = 0xff00ff;
                shapeHoveredBorder.visible = true
                // shapeHoveredBorder.setStrokeStyle({color: 0xff0000})
            }
            // shape?.zIndex = 1000
        }
    }

    setUnHover = () => {
        let shape = this.gfxContainer.getChildByName(NodeContainerChildNames.shape);
        if (shape) {
            const shapeHoveredBorder: PIXI.Graphics = shape.getChildByName(NodeContainerChildNames.shapeHoveredBorder)
            // console.log("====pointerOver", shapeHoveredBorder)
            if (shapeHoveredBorder) {
                // shapeHoveredBorder.tint = 0xffffff;
                // shapeHoveredBorder.setStrokeStyle({color: 0xff0000})
                shapeHoveredBorder.visible = false
            }
        }
    }

    setSelected = () => {
        let shape = this.gfxContainer.getChildByName(NodeContainerChildNames.shape);
        if (shape) {
            const shapeSelectedBorder = shape.getChildByName(NodeContainerChildNames.shapeSelectedBorder);
            // console.log("shapeSelectedBorder", shapeSelectedBorder)
            if (shapeSelectedBorder) {
                shapeSelectedBorder.visible = true
            }
        }
    }

    setUnSelected = () => {
        let shape = this.gfxContainer.getChildByName(NodeContainerChildNames.shape);
        if (shape) {
            const shapeSelectedBorder = shape.getChildByName(NodeContainerChildNames.shapeSelectedBorder);
            // console.log("shapeSelectedBorder", shapeSelectedBorder)
            if (shapeSelectedBorder) {
                shapeSelectedBorder.visible = false
            }
        }
    }
    pointerOver() {
        console.log("==node pointerOver", this.data.id)
        this.setHover();
        // this.setHoverOnNeighbors();
    }

    pointerOut() {
        console.log("==node pointerOut", this.data.id)
        this.setUnHover()
        // this.setUnHoverOnNeighbors();
    }

    setHoverOnNeighbors = () => {
        console.log("=setHoverOnNeighbors triggered")
        const neighbors: {nodes: CanvasNode[], links: CanvasLink[]}= this.canvas.graph.getNeighbors(this.data);
        console.log("getNeighbors", neighbors)
        neighbors.nodes.forEach((node: CanvasNode)=>{
            node.gfxInstance?.setHover();
        })
        neighbors.links.forEach((link: CanvasLink) => {
            link.gfxInstance?.setHover();
        });
    }

    setUnHoverOnNeighbors = () => {
        console.log("=setUnHoverOnNeighbors triggered")
        const neighbors: {nodes: CanvasNode[], links: CanvasLink[]}= this.canvas.graph.getNeighbors(this.data);
        console.log("getNeighbors", neighbors)
        neighbors.nodes.forEach((node: CanvasNode)=>{
            node.gfxInstance?.setUnHover();
        })
        neighbors.links.forEach((link: CanvasLink) => {
            link.gfxInstance?.setUnHover();
        });
    }

    onDragStart = (event: PIXI.FederatedPointerEvent) => {
        console.log("onDragStart triggered", event.data.getLocalPosition(this.gfxContainer.parent))
        event.stopPropagation();
        this.dragPoint = event.data.getLocalPosition(this.gfxContainer.parent);
        console.log("onDragStart", this.dragPoint)
        this.dragPoint.x -= this.gfxContainer.x;
        this.dragPoint.y -= this.gfxContainer.y;
        this.gfxContainer.parent.on("pointermove", this.onDragMove);
        this.setSelected()
        this.setHoverOnNeighbors();
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
        // this.setHoverOnNeighbors(); // TODO - fix this performance ; use stage=hovered/selected may be instead for re-render

    };

    onDragEnd = (event: PIXI.FederatedPointerEvent) => {
        console.log("onDragEnd triggered")
        event.stopPropagation()
        this.gfxContainer.parent.off("pointermove", this.onDragMove);
        this.setUnSelected();
        this.setUnHoverOnNeighbors();
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
    // draw = (renderShape=true, renderLabel=true, renderLablPosition=true) => {

    
    draw = (renderShape=true, renderLabel=true
        // updateShapePosition = true, updateLabelPosition=true
        ) => {
        // clear shape first
        // this.clear();
        // draw shape
        if (renderShape){
            this.shapeGfx = this.drawShape();
            this.gfxContainer.addChild(this.shapeGfx);    
        }
        // this.setBorder(     
        //     NodeStyleDefaults.shape.border.color, 
        //     NodeStyleDefaults.shape.border.thickness, 
        //     false
        // )
        // draw label
        if (renderLabel){
            this.labelGfx = this.drawLabel();
            if (this.labelGfx){
                this.gfxContainer.addChild(this.labelGfx);
            }    
        }

        // update the position 
        if (renderShape){
            if (this.data.x && this.data.y) {
                this.setGfxPosition(this.data?.x, this.data?.y)
            }    
        }
    }
}

export class LinkShapeBase extends BaseShape {

    declare data: CanvasLink
    declare originalData: CanvasLink;
    declare labelGfx: PIXI.Graphics;
    declare shapeGfx: PIXI.Graphics; 

    constructor(data: CanvasLink, canvas: GraphCanvas) {
        super(data, canvas)
        this.data = this.processData(data)
        // setup intractions
        this.setupInteractions()
    }

    processData = (data:  CanvasLink)  =>  {
        data.style = data.style ? deepMerge(LinkStyleDefaults, data.style) : LinkStyleDefaults
        return data;
    }

    pointerOver() {
        console.log("==link pointerOver", this.data.id)
        this.setHover()
    }

    pointerOut() {
        console.log("==link pointerOut", this.data.id)
        this.setUnHover()
    }


    setHover = () => {
        console.log("hover")
        let shape = this.gfxContainer.getChildByName(LinkContainerChildNames.shape);
        if (shape) {
            const shapeHoveredBorder: PIXI.Graphics = shape.getChildByName(LinkContainerChildNames.shapeHoveredBorder)
            if (shapeHoveredBorder) {
                shapeHoveredBorder.visible = true
            }
        }
    }

    setUnHover = () => {
        let shape = this.gfxContainer.getChildByName(LinkContainerChildNames.shape);
        if (shape) {
            const shapeHoveredBorder: PIXI.Graphics = shape.getChildByName(LinkContainerChildNames.shapeHoveredBorder)
            if (shapeHoveredBorder) {
                shapeHoveredBorder.visible = false
            }
        }
    }

    setupInteractions() {
        console.log("===setupInteractions triggered on link", this.gfxContainer)
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

    // calcArrowAngle = (arrow: PIXI.Graphics, startPoint: PIXI.Point, endPoint: PIXI.Point,  points: number[], ) => {
    //     console.error("calcArrowAngle not implemented")
    // }

    // drawArrow = (startPoint: PIXI.Point, endPoint: PIXI.Point) => {
    //     const arrow = drawArrowHeadShape({startPoint, endPoint, ...this.data.style?.shape})
    //     return arrow;
    // }

    drawLabel = () => {
        console.log("Line.drawLabel")
        // const labelString = this.data.label ? this.data.label : `${this.data.source?.id}-->${this.data.target?.id}`
        if (this.data.label){
            const labelGfx = drawLabelShape({label: this.data.label, ...this.data.style?.label})
            labelGfx.name = LinkContainerChildNames.label
            return labelGfx    
        }else{
            return new PIXI.Graphics()
        }
    }

    // drawPath = (shapeLine: PIXI.Graphics, startPoint: PIXI.Point, endPoint: PIXI.Point) => {
    //     console.error("Not implemented");

    // }

    drawShape = () => {
        console.log("Line.drawShape triggered", this.data)

        let {startPoint, endPoint} = this.calcStartAndEndPoints();
        // console.log("startPoint, endPoint", JSON.stringify(startPoint), JSON.stringify(endPoint))
        let shape = new PIXI.Graphics();
        shape.name = LinkContainerChildNames.shape


        // draw path
        const shapeLine = drawStraightLineShape({startPoint, endPoint, ...this.data.style?.shape})
        shapeLine.name = LinkContainerChildNames.shapeLine
        shapeLine.zIndex = 1000

        // add arrow
        const arrow = drawArrowHeadShape({startPoint, endPoint, ...this.data.style?.shape})

        shapeLine.addChild(arrow)
        shape.addChild(shapeLine)

        // shape hoveredBorder
        // const shapeHoveredBorder = new PIXI.Graphics();
        const shapeHoveredBorder = drawStraightLineShape({startPoint, endPoint, ...this.data.style.states[':hovered'].shape})
        shapeHoveredBorder.visible = false
        shapeHoveredBorder.name = LinkContainerChildNames.shapeHoveredBorder
        // shapeHoveredBorder.zIndex = 10
        const hoveredArrow =  drawArrowHeadShape({startPoint, endPoint, ...this.data.style?.states[':hovered'].shape})
        shapeHoveredBorder.addChild(hoveredArrow)


        shape.addChild(shapeHoveredBorder)
        // shapeLine.closePath()

        return shape
    }

    // renderShape=true, renderLabel=true
    draw = (renderShape=true, renderLabel=true) => {
        // clear shape first
        console.log(`draw renderShape=${renderShape}; renderLabel=${renderLabel}`)
        

        // draw shape
        if (renderShape){
            if (this.shapeGfx){
                this.shapeGfx.removeChildren();
            }
            this.shapeGfx = this.drawShape();
            this.gfxContainer.addChild(this.shapeGfx);    
        }
        // draw label
        if (renderLabel){
            this.labelGfx = this.drawLabel();
            this.gfxContainer.addChild(this.labelGfx);    
        }

        if (renderShape){
            this.calcLabelPosition(this.labelGfx, this.shapeGfx)
        }
    }
}

export default BaseShape;