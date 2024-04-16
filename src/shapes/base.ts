
import * as PIXI from 'pixi.js';


 class BaseShape {
    /*
        this is the base shape for the Shape and the LabelShape
    */
    
    // geometry: GeometryType
    // material: any
    gfxContainer: PIXI.Graphics; // shape and label saved in this container

    constructor() {
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

class LinkShape {
    
} 

export default BaseShape;