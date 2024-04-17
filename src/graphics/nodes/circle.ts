import * as PIXI from 'pixi.js';
import { NodeShapeBase } from '../base';


class Circle extends NodeShapeBase {

    color: string =  '#ff00ff';
    size: number = 20
  
    drawShape = () => {
        console.debug("Circle.drawShape triggered")
        let shape = new PIXI.Graphics();
        shape.circle(0, 0, this.size);
        shape.fill(this.color, 1);
        shape.stroke({ width: 3, color: 0xfeeb77 });

        
        shape.cursor = "pointer";
        shape.eventMode = 'static';// this will allow it to respond to mouse and touch events 

        // make it a bit bigger, so it's easier to grab
        // shape.scale.set(3);
        shape.hitArea = new PIXI.Circle(0, 0, this.size);
        // shape.endFill();
        return shape
    }

}


export default Circle