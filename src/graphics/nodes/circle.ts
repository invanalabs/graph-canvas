import * as PIXI from 'pixi.js';
import { NodeShapeBase } from '../base';
import { NodeContainerChildNames } from '../constants';


class Circle extends NodeShapeBase {

    drawLabel = () => {
        const labelGfx = new PIXI.Graphics();
        labelGfx.label = NodeContainerChildNames.label;
        labelGfx.position.set(this.data.style.size + 5 , -this.data.style.size);
        
        const textStyle = new PIXI.TextStyle({ 
            fontFamily: this.data.style?.label.text.font.family, 
            fontSize: this.data.style?.label.text.font.size,
            fill: this.data.style?.label.text.color})
        // text label
        const text = new PIXI.Text({ text : this.data.label,  style: textStyle});
        text.label = NodeContainerChildNames.labelText
        const textBounds = text.getBounds(); // Get the size of the text box
        // text background
        const textBackground = new PIXI.Graphics();
        textBackground.label = NodeContainerChildNames.labelBackground;
        textBackground.fill(
            this.data.style?.label.background.color,
            this.data.style?.label.background.opacity
        ); // Background color
        textBackground.rect(0, 0, textBounds.width, textBounds.height); // Draw rectangle behind the text

        labelGfx.addChild(textBackground)
        labelGfx.addChild(text)
        return labelGfx
    }
  
    drawShape = () => {
        console.debug("Circle.drawShape triggered")
        let shape = new PIXI.Graphics();
        shape.label = NodeContainerChildNames.shape;
        shape.circle(0, 0, this.data.style.size);
        shape.fill(this.data.style?.shape.background.color, this.data.style?.shape.background.opacity);
        shape.stroke({ 
            width: this.data.style?.shape.border.thickness,
            color: this.data.style?.shape.border.color
        });

        const hoveredPadding = 3;
        const selectedPadding = hoveredPadding + 6;
        // shape hoveredBorder
        const shapeHoveredBorder = new PIXI.Graphics();
        shapeHoveredBorder.circle(0, 0, this.data.style.size + this.data.style?.shape.border.thickness + hoveredPadding);
        shapeHoveredBorder.stroke({ 
            width: this.data.style?.states[':hovered'].shape.border.thickness,
            color: this.data.style?.states[':hovered'].shape.border.color
        });
        shapeHoveredBorder.visible = false
        shapeHoveredBorder.label = NodeContainerChildNames.shapeHoveredBorder
        shape.addChild(shapeHoveredBorder)

        // shape selectedBorder
        const shapeSelectedBorder = new PIXI.Graphics();
        shapeSelectedBorder.circle(0, 0, this.data.style.size + this.data.style?.shape.border.thickness + selectedPadding);
        shapeSelectedBorder.stroke({ 
            width: this.data.style?.states[':selected'].shape.border.thickness + 2,
            color: this.data.style?.states[':selected'].shape.border.color
        });
        shapeSelectedBorder.visible = false
        shapeSelectedBorder.label = NodeContainerChildNames.shapeSelectedBorder
        shape.addChild(shapeSelectedBorder)


        shape.cursor = "pointer";
        shape.eventMode = 'static';// this will allow it to respond to mouse and touch events 
        // shape.scale.set(3);
        // shape.hitArea = new PIXI.Circle(0, 0, this.data.style.size);
        return shape
    }

}


export default Circle