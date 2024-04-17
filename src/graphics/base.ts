
import * as PIXI from 'pixi.js';
import { CanvasLink, CanvasNode } from './types';


 class BaseShape {
    /*
        this is the base shape for the Shape and the LabelShape
    */
    
    gfxContainer: PIXI.Graphics; // shape and label saved in this container
    constructor(data: CanvasNode| CanvasLink) {
        this.gfxContainer = new PIXI.Graphics()
    }

    setupInteractions = () => console.error("BaseShape.setupInteractions not implemented")
    
    draw = () => console.error("BaseShape.draw not implemented")

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
} 

export class LinkShapeBase extends BaseShape {
    data : CanvasLink

    constructor(data: CanvasLink){
        super(data)
        this.data = data
    }
} 

export default BaseShape;