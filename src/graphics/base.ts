
import * as PIXI from 'pixi.js';
import { CanvasLink, CanvasNode } from './types';


abstract class Shape {
    abstract data: CanvasLink | CanvasNode;
    abstract gfxContainer: PIXI.Container;

    abstract setupInteractions(): void;
    abstract drawLabel() : PIXI.Graphics|void;
    abstract drawShape() : PIXI.Graphics; 
    abstract redraw() : void;
    abstract clear(): void;
    abstract destroy(): void;
    abstract updatePosition(x: number, y: number): void;
}


class BaseShape extends Shape {
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

    destroy = () => {
        this.gfxContainer.destroy()
    }

    updatePosition = (x: number, y:number) => {
        this.gfxContainer.position.set(x, y);
    }
}

export class NodeShapeBase extends BaseShape {
    data : CanvasNode

    constructor(data: CanvasNode){
        super(data)
        this.data = { ...{x:0, y:0}, ...data}
    }


    pointerOver() { // shapeGfx: PIXI.Graphics
        // showTooltip(node);
        console.log("==pointerOver", )
        this.gfxContainer.tint = 0x666666;
        // this.gfxContainer.getChildAt[0].tint = 0x666666;

        // renderer.render(stage);
    }

    pointerOut() {// shapeGfx: PIXI.Graphics
        // hideTooltip();
        console.log("==pointerOut", )
        this.gfxContainer.tint = 0xFFFFFF;
        // renderer.render(stage);
    }

    
    setupInteractions() {
        console.log("===setupInteractions triggered")
        // Remove all listeners
        this.gfxContainer.removeAllListeners();

        // listeners for hover effect
        this.gfxContainer.on("pointerover", () => this.pointerOver());
        this.gfxContainer.on("pointerout", () => this.pointerOut());

        // this.gfxContainer
        //     .on('pointerdown', this.onDragStart.bind(this))
        //     .on('pointerup', this.onDragEnd.bind(this))
        //     .on('pointerupoutside', this.onDragEnd.bind(this))
            // .on('pointermove', this.onDragMove.bind(this));


        // listeners for dragging
        // on click
        // this.gfxContainer.on('pointerdown', this.onDragStart.bind(this));
        // // this.gfxContainer.on('mousedown', this.onDragStart.bind(this));
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