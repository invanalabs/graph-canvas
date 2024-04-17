import * as PIXI from 'pixi.js';
import { NodeShapeBase } from '../base';


class Circle extends NodeShapeBase {

    color: string =  '#ff00ff';
    size: number = 20
  
    drawShape = () => {
        let shape = new PIXI.Graphics();
        shape.circle(this.data.x || 0, this.data.y || 0, this.size);
        shape.fill(this.color, 1);
        // shape.stroke({ width: 2, color: 0xfeeb77 });
        shape.interactive = true; // Enable mouse/touch events
        // shape.buttonMode = true; // Show hand cursor on hover

        // shape.cursor = "pointer";
        // shape.eventMode = 'static';// this will allow it to respond to mouse and touch events 

        // make it a bit bigger, so it's easier to grab
        // shape.scale.set(3);
        // shape.hitArea = new PIXI.Circle(0, 0, this.size);
        // shape.endFill();
        return shape
    }

    draw = () => {
        // clear shape first
        this.clear();

        // draw shape
        let shapeGfx = this.drawShape();
        this.gfxContainer.addChild(shapeGfx);

        // setup intractions
        this.setupInteractions()

        // update the position
        // if (this.shapeData.x && this.shapeData.y) {
        //     this.updatePosition(this.shapeData.x, this.shapeData.y)
        // }
    }

}


export default Circle