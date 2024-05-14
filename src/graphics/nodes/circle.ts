import { NodeShapeBase } from '../base';
import { NodeContainerChildNames } from '../constants';
import drawLabelShape from '../../primitives/label';
import { Sprite, Circle } from 'pixi.js';


class Circle extends NodeShapeBase {

    drawLabel = () => {
        if  (!this.data.label){
            return 
        }
        const shapeStyle = this.data.style
        console.log("this.data.label", this.data.label)
        const labelArgs = {
            label: this.data.label,
            ...shapeStyle?.label
        }
        console.log("==labelArgs", labelArgs) 
        const labelGfx = drawLabelShape(labelArgs);
        if (labelGfx){
            labelGfx.name = NodeContainerChildNames.label;
            labelGfx.position.set(shapeStyle.size + 5, -shapeStyle.size);    
        }
        console.log("==labelGfx", labelGfx)
        return labelGfx
    }

    drawShape = () => {
        console.debug("Circle.drawShape triggered")
        // const shapeStyle = this.data.style


        const shapeTexture = this.canvas.textureManager.texturesMap[this.data.group]
        console.log("====shapeTexture", shapeTexture, this.canvas.textureManager.texturesMap)
        const {texture} = this.canvas.textureManager.getOrCreateTexture({
            size: this.data.style?.size , 
            group: this.data.group,
            style: this.data.style
        })

        console.log("===texture", texture)
        const shape = new Sprite(texture['states'][':default']['shape'])
        shape.name = NodeContainerChildNames.shape;
        shape.x = -shape.width / 2;
        shape.y = -shape.height / 2;
        
        // draw hover graphics
        const shapeHoveredBorder = new Sprite(texture['states'][':hovered']['shape'])
        shapeHoveredBorder.x = -(shapeHoveredBorder.width - shape.width) / 2;
        shapeHoveredBorder.y = -(shapeHoveredBorder.height - shape.height) / 2;
        shapeHoveredBorder.visible = false
        shapeHoveredBorder.name = NodeContainerChildNames.shapeHoveredBorder
        shape.addChild(shapeHoveredBorder)

        // draw selected graphics
        const shapeSelectedBorder = new Sprite(texture['states'][':selected']['shape'])
        shapeSelectedBorder.x =  -(shapeSelectedBorder.width - shape.width) / 2;
        shapeSelectedBorder.y = -(shapeSelectedBorder.height - shape.height) / 2;
        shapeSelectedBorder.visible = false
        shapeSelectedBorder.name = NodeContainerChildNames.shapeSelectedBorder
        shape.addChild(shapeSelectedBorder)

        shape.cursor = "pointer";
        shape.eventMode = 'static';// this will allow it to respond to mouse and touch events 
        // shape.hitArea = new Circle(0, 0, this.data.style?.shape.size);
        return shape
    }

}


export default Circle