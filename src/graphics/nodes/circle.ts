import * as PIXI from 'pixi.js';
import { NodeShapeBase } from '../base';
import { NodeContainerChildNames } from '../constants';


class Circle extends NodeShapeBase {

    color: string =  '#ff00ff';
    size: number = 20

    drawLabel = () => {
        const labelGfx = new PIXI.Graphics()
        const style = new PIXI.TextStyle({ fontFamily: 'Arial', fontSize: 12, fill: 0xFFFFFF })
        const text = new PIXI.Text({ text : this.data.label,  style});
        
        const textBounds = text.getBounds(); // Get the size of the text box

        const background = new PIXI.Graphics();
        background.fill(0xffffff, 1); // Background color
        background.rect(0, 0, textBounds.width, textBounds.height); // Draw rectangle behind the text
        labelGfx.position.set(this.size + 5 , -this.size);
        labelGfx.addChild(background)
        labelGfx.addChild(text)
        return labelGfx
    }
  
    drawShape = () => {
        console.debug("Circle.drawShape triggered")
        let shape = new PIXI.Graphics();
        shape.circle(0, 0, this.size);
        // shape.fill(this.color, 1);
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