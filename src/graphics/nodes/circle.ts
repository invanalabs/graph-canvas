import * as PIXI from 'pixi.js';
import { NodeShapeBase } from '../base';
import { NodeContainerChildNames } from '../constants';
import { NodeStyleDefaults } from '../defaults';


class Circle extends NodeShapeBase {

    color: string =  '#444444';

    drawLabel = () => {
        const labelGfx = new PIXI.Graphics();
        labelGfx.label = NodeContainerChildNames.label;
        labelGfx.position.set(this.size + 5 , -this.size);
        
        const textStyle = new PIXI.TextStyle({ 
            fontFamily: NodeStyleDefaults.label.text.font.family, 
            fontSize: NodeStyleDefaults.label.text.font.size,
            fill: NodeStyleDefaults.label.text.color})
        // text label
        const text = new PIXI.Text({ text : this.data.label,  style: textStyle});
        text.label = NodeContainerChildNames.labelText
        const textBounds = text.getBounds(); // Get the size of the text box
        // text background
        const textBackground = new PIXI.Graphics();
        textBackground.label = NodeContainerChildNames.labelBackground;
        textBackground.fill(
            NodeStyleDefaults.label.background.color,
            NodeStyleDefaults.label.background.opacity
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
        shape.circle(0, 0, this.size);
        shape.fill(NodeStyleDefaults.shape.background.color, NodeStyleDefaults.shape.background.opacity);
        shape.stroke({ 
            width: NodeStyleDefaults.shape.border.thickness,
            color: NodeStyleDefaults.shape.border.color
        });

        const hoveredPadding = 3;
        const selectedPadding = hoveredPadding + 6;
        // shape hoveredBorder
        const shapeHoveredBorder = new PIXI.Graphics();
        shapeHoveredBorder.circle(0, 0, this.size + NodeStyleDefaults.shape.border.thickness + hoveredPadding);
        shapeHoveredBorder.stroke({ 
            width: NodeStyleDefaults.states[':hovered'].shape.border.thickness,
            color: NodeStyleDefaults.states[':hovered'].shape.border.color
        });
        shapeHoveredBorder.visible = false
        shapeHoveredBorder.label = NodeContainerChildNames.shapeHoveredBorder
        shape.addChild(shapeHoveredBorder)

        // shape selectedBorder
        const shapeSelectedBorder = new PIXI.Graphics();
        shapeSelectedBorder.circle(0, 0, this.size + NodeStyleDefaults.shape.border.thickness + selectedPadding);
        shapeSelectedBorder.stroke({ 
            width: NodeStyleDefaults.states[':selected'].shape.border.thickness + 2,
            color: NodeStyleDefaults.states[':selected'].shape.border.color
        });
        shapeSelectedBorder.visible = false
        shapeSelectedBorder.label = NodeContainerChildNames.shapeSelectedBorder
        shape.addChild(shapeSelectedBorder)


        shape.cursor = "pointer";
        shape.eventMode = 'static';// this will allow it to respond to mouse and touch events 
        // shape.scale.set(3);
        // shape.hitArea = new PIXI.Circle(0, 0, this.size);
        return shape
    }

}


export default Circle