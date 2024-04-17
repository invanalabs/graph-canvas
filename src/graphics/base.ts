
import * as PIXI from 'pixi.js';
import { CanvasLink, CanvasNode } from './types';


abstract class Shape {
    abstract data: CanvasLink | CanvasNode;
    abstract gfxContainer: PIXI.Container;

    abstract setupInteractions(): void;
    abstract pointerOver(): void;
    abstract pointerOut(): void;

    abstract draw(): void;
    abstract drawLabel() : PIXI.Graphics|void;
    abstract drawShape() : PIXI.Graphics; 
    abstract redraw() : void;

    abstract clear(): void;
    // abstract destroy(): void;
    abstract updatePosition(x: number, y: number): void;
}


export class BaseShape extends Shape {
    /*
        this is the base shape for the Shape and the LabelShape
    */
    data: CanvasLink | CanvasNode;
    gfxContainer: PIXI.Container;
    
        
    constructor(data: CanvasLink | CanvasNode) {
        super()
        this.data = data;
        this.gfxContainer = new PIXI.Container()

        // Make the gfxContainer interactive...
        this.gfxContainer.cursor = 'pointer';
        this.gfxContainer.eventMode = 'static';

      
    }

    drawLabel = (): void | PIXI.Graphics =>  {
        console.error("BaseShape.drawLabel not defined")
    }

    setupInteractions(){console.error("BaseShape.setupInteractions triggered")}
    pointerOver(){console.error("BaseShape.pointerOver not implemented")}
    pointerOut(){console.error("BaseShape.pointerOut not implemented")}
    
    drawShape = (): PIXI.Graphics => {
        console.error("BaseShape.drawShape not implemented")
        return new PIXI.Graphics()
    }



    // setupInteractions = () => console.error("BaseShape.setupInteractions not implemented")
    // draw = () => console.error("BaseShape.draw not implemented")
    draw = () => {
        // clear shape first
        this.clear();

        // draw shape
        let shapeGfx = this.drawShape();
        this.gfxContainer.addChild(shapeGfx);

        // draw label
        if (this.data.label) {
            let labelGfx = this.drawLabel();
            if (labelGfx){
                this.gfxContainer.addChild(labelGfx);
            }    
        }

        // setup intractions
        this.setupInteractions()

        // update the position
        //@ts-ignore
        if (this.data?.x && this.data?.y) {
            //@ts-ignore
            this.updatePosition(this.data.x, this.data.y)
        }
    }
    
    redraw = () => {
        this.clear();
        this.draw();
    }

    clear = () => {
        console.log("BaseShape.clear triggered")
        this.gfxContainer.removeChildren();
    }

    updatePosition = (x: number, y:number) => {
        console.log("updatePosition", x, y)
        this.gfxContainer.position.set(x, y);
    }
}


export class NodeShapeBase extends BaseShape {
    data : CanvasNode
    //@ts-ignore
    dragPoint : PIXI.Point

    constructor(data: CanvasNode){
        super(data)
        this.data = { ...{x:0, y:0}, ...data}
    }

    pointerOver() { 
        console.log("==pointerOver", )
        this.gfxContainer.tint = 0x666666;
    }

    pointerOut() {
        console.log("==pointerOut", )
        this.gfxContainer.tint = 0xFFFFFF;
    }

    onDragStart = (event: PIXI.FederatedPointerEvent) => {
        console.log("onDragStart triggered", event.data.getLocalPosition(this.gfxContainer.parent))
        event.stopPropagation();
        this.dragPoint = event.data.getLocalPosition(this.gfxContainer.parent);
        console.log("onDragStart", this.dragPoint)
        this.dragPoint.x -= this.gfxContainer.x;
        this.dragPoint.y -= this.gfxContainer.y;
        this.gfxContainer.parent.on("pointermove", this.onDragMove);
      };
      
    onDragMove = (event: PIXI.FederatedPointerEvent) => {
        console.log("onDragMove triggered" ,event.data.getLocalPosition(this.gfxContainer.parent))
        const newPoint = event.data.getLocalPosition(this.gfxContainer.parent);
        console.log("onDragMove", newPoint, this.dragPoint)
        const x = newPoint.x //- this.dragPoint.x;
        const y = newPoint.y //- this.dragPoint.y;   
        // TODO - FIXME - next 2 lines are re-used
        this.updatePosition(x, y) 

        // update node positions data 
        // update links - rerender them
      };
      
      onDragEnd = (event: PIXI.FederatedPointerEvent) => {
        console.log("onDragEnd triggered")
        event.stopPropagation()
        this.gfxContainer.parent.off("pointermove", this.onDragMove);
      };
    
    setupInteractions() {
        console.log("===setupInteractions triggered")
        // Remove all listeners
        this.gfxContainer.removeAllListeners();

        // listeners for hover effect
        // this.gfxContainer.on("pointerover", () => this.pointerOver());
        // this.gfxContainer.on("pointerout", () => this.pointerOut());

        this.gfxContainer
            .on('pointerdown', this.onDragStart.bind(this))
            // .on('pointerup', this.onDragEnd.bind(this))
            // .on('pointerupoutside', this.onDragEnd.bind(this))
            // .on('pointermove', this.onDragMove.bind(this));


        // listeners for dragging
        // on click
        // this.gfxContainer.on('pointerdown', this.onDragStart.bind(this));
        // this.gfxContainer.on('mousedown', this.onDragStart.bind(this));
        // // on release 
        // // this.gfxContainer.on('mouseup', this.graphCanvas.onDragEnd.bind(this));
        // this.gfxContainer.on('pointerup', this.graphCanvas.onDragEnd.bind(this));
        // this.gfxContainer.on('pointerupoutside', this.graphCanvas.onDragEnd.bind(this));
        // this.gfxContainer.on('pointerout', this.graphCanvas.onDragEnd.bind(this));


        // this.gfxContainer.on('pointerup', stopDrag);
    }
} 

export class LinkShapeBase extends BaseShape {
    data : CanvasLink

    constructor(data: CanvasLink){
        super(data)
        this.data = data
    }
} 

export default BaseShape;