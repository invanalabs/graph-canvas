import { Sprite } from 'pixi.js';
import { NodeShapeBase } from '../base';
import { NodeContainerChildNames } from '../../constants';
import { Graphics } from 'pixi.js';
import drawLabelShape from '../../../primitives/label';


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
 
        const {texture} = this.artBoard.renderer.textureStore.getOrCreateTexture({
            size: this.data.style?.size , 
            group: this.data.group,
            style: this.data.style
        })

        console.log("===texture", this.data.id, texture,)
        if (texture){
          const shapeName = new Sprite(texture['states'][':default']['shapeName'])
          shapeName.name = NodeContainerChildNames.shapeName;
          shapeName.x = -shapeName.width / 2;
          shapeName.y = -shapeName.height / 2;
          
          // draw hover graphics
          const shapeHoveredBorder = new Sprite(texture['states'][':hovered']['shapeName'])
          shapeHoveredBorder.x = -(shapeHoveredBorder.width - shapeName.width) / 2;
          shapeHoveredBorder.y = -(shapeHoveredBorder.height - shapeName.height) / 2;
          shapeHoveredBorder.visible = false
          shapeHoveredBorder.name = NodeContainerChildNames.shapeHoveredBorder
          shapeName.addChild(shapeHoveredBorder)
  
          // draw selected graphics
          const shapeSelectedBorder = new Sprite(texture['states'][':selected']['shapeName'])
          shapeSelectedBorder.x =  -(shapeSelectedBorder.width - shapeName.width) / 2;
          shapeSelectedBorder.y = -(shapeSelectedBorder.height - shapeName.height) / 2;
          shapeSelectedBorder.visible = false
          shapeSelectedBorder.name = NodeContainerChildNames.shapeSelectedBorder
          shapeName.addChild(shapeSelectedBorder)
  
          shapeName.cursor = "pointer";
          shapeName.eventMode = 'static';// this will allow it to respond to mouse and touch events 
          // shapeName.hitArea = new Circle(0, 0, this.data.style?.shapeName.size);
          return shapeName
  
        }else{
          console.error("Failed to fetch texture for the data : ", this.data)
          // return new Graphics()
        }
    }

}


export default Circle