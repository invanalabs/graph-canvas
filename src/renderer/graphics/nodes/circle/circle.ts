import { Sprite } from 'pixi.js';
import { NodeShapeBase } from '../base';
import { NodeContainerChildNames } from '../../constants';
import drawLabelShape from '../../../primitives/label';
// import { DraggableSprite } from '../../../sprites/draggable';


class Circle extends NodeShapeBase {

    drawLabel = () => {
        if  (!this.data.label){
            return 
        }
        const shapeStyle = this.data.style
        console.debug("this.data.label", this.data.label)
        const labelArgs = {
            label: this.data.label,
            ...shapeStyle?.label
        }
        console.debug("==labelArgs", labelArgs) 
        const labelGfx = drawLabelShape(labelArgs);
        if (labelGfx){
            labelGfx.name = NodeContainerChildNames.label;
            labelGfx.position.set(shapeStyle.size + 5, -shapeStyle.size);    
        }
        console.debug("==labelGfx", labelGfx)
        return labelGfx
    }

    drawShape = () => {
        console.debug("Circle.drawShape triggered")
        // const shapeStyle = this.data.style
 
        const {texture} = this.artBoard.renderer.textureStore.getOrCreateTexture({
            size: this.data.style?.size , 
            group: this.data.group,
            style: this.data.style
        })

        console.log("===texture", this.data.id, texture,)
        if (texture){
          const shape = new Sprite(texture['states'][':default'].shape)
          shape.name = NodeContainerChildNames.shapeName;
          shape.x = -shape.width / 2;
          shape.y = -shape.height / 2;
          
          // draw hover graphics
          const shapeHoveredBorder = new Sprite(texture['states'][':hovered'].shape)
          shapeHoveredBorder.x = -(shapeHoveredBorder.width - shape.width) / 2;
          shapeHoveredBorder.y = -(shapeHoveredBorder.height - shape.height) / 2;
          shapeHoveredBorder.visible = false
          shapeHoveredBorder.name = NodeContainerChildNames.shapeHoveredBorder
          shape.addChild(shapeHoveredBorder)
  
          // draw selected graphics
          const shapeHighlightedBorder = new Sprite(texture['states'][':highlighted'].shape)
          shapeHighlightedBorder.x =  -(shapeHighlightedBorder.width - shape.width) / 2;
          shapeHighlightedBorder.y = -(shapeHighlightedBorder.height - shape.height) / 2;
          shapeHighlightedBorder.visible = false
          shapeHighlightedBorder.name = NodeContainerChildNames.shapeHighlightedBorder
          shape.addChild(shapeHighlightedBorder)
  
          shape.cursor = "pointer";
          shape.eventMode = 'static';// this will allow it to respond to mouse and touch events 

          shape.interactive = true;
          shape.cursor = "pointer";
          // shape.hitArea = new Circle(0, 0, this.data.style?.shape.size);
          return shape
  
        }else{
          console.error("Failed to fetch texture for the data : ", this.data)
          // return new Graphics()
        }
    }

}


export default Circle