import { Sprite, Graphics } from 'pixi.js';
import { NodeContainerChildNames } from '../../constants';
import drawLabelShape from '../../../primitives/label';
import { NodeShapeAbstract } from '../../abstract';
import { CanvasNode } from '../../../../store';
import { getSizeBasedOnDegree } from '../utils';
// import { DraggableSprite } from '../../../sprites/draggable';


class Circle extends NodeShapeAbstract {

    declare data: CanvasNode;

    // always use this instead of this.data.style.size, this will be final size ased on degree etc 
    declare nodeSize: number 

    drawLabel = () => {
        if (!this.data.label) {
            return
        }
        const shapeStyle = this.data.style
        console.debug("this.data.label", this.data.label)
        console.debug("shapeStyle?.label", shapeStyle?.label)

        const labelArgs = {
            label: this.data.label,
            ...shapeStyle?.label,
        }
        console.debug("==labelArgs", labelArgs)
        const labelGfx = drawLabelShape(labelArgs, this.artBoard.canvas.options.resolution?.labels);
        if (labelGfx) {
            labelGfx.label = NodeContainerChildNames.label;
            labelGfx.position.set((this.data.getMaxWidth() - this.data.style.label?.padding * 2)  , - (this.data.getMaxHeight()) );
            labelGfx.pivot.set(0.5)
        }
        console.debug("==labelGfx", labelGfx)
        return labelGfx
    }

    drawShape = () => {
        console.debug("Circle.drawShape triggered", this.data.style)
        // const shapeStyle = this.data.style
        const nodeSize =  (this.artBoard.canvas.options.extraSettings?.nodeSizeBasedOn == "degree") ?
                         getSizeBasedOnDegree(this.data): this.data.style.size as number
        
        
        console.log("====drawShape, ", nodeSize)

        const { texture } = this.artBoard.renderer.textureStore.getOrCreateShapeTexture({
            size: nodeSize,
            group: this.data.group,
            style: this.data.style
        })
        // console.log("===texture", this.data.id, texture,)
        if (texture) {
            const shape = new Sprite(texture['states'][':default'].shape)
            shape.label = NodeContainerChildNames.shapeName;
            // shape.x = -shape.width / 2;
            // shape.y = -shape.height / 2;
            shape.anchor.set(0.5);
            if (this.data.icon) {
                const { iconTexture } = this.artBoard.renderer.textureStore.getOrCreateIconTexture({
                    ...this.data.style.shape.icon, content: this.data.icon
                })
                const icon = new Sprite(iconTexture);
                icon.label = NodeContainerChildNames.icon;
                // icon.x = shape.width /2 ;
                // icon.y = shape.height / 2;
                // icon.pivot = 0.5
                icon.anchor.set(0.5);
                icon.tint = this.data.style?.shape?.icon.color || "#222222";
                shape.addChild(icon);
            }

            if (this.data.image) {
                const { imagePromise } = this.artBoard.renderer.textureStore.getOrcreateImagePromise(
                    this.data.image
                )
                // console.log("===imagePromise", this.data.id, imagePromise,)
                if (imagePromise) {
                    imagePromise.then((texture) => {
                        console.log("imagePromise", this.data.image, texture)
                        // Create a sprite from the loaded texture
                        const imageGfx = new Sprite(texture);
                        if (this.data.image?.endsWith(".svg")) {
                            imageGfx.width = shape.width / 2
                            imageGfx.height = shape.height / 2
                        } else {
                            imageGfx.width = shape.width
                            imageGfx.height = shape.height
                        }
                        imageGfx.anchor.set(0.5);
                        // Create a circular mask
                        const mask = new Graphics();
                        // mask.beginFill(0xffffff);
                        mask.circle(0, 0, nodeSize- this.data.style.shape.border.thickness);
                        mask.fill(0xffffff);
                        // Apply the mask to the sprite
                        imageGfx.mask = mask;
                        // Add the mask and sprite to the stage
                        shape.addChild(mask);
                        shape.addChild(imageGfx);
                    }).catch((error) => {
                        console.error(`Error loading image ${this.data.image}:`, error);
                    });
                }
            }

            // draw selected graphics
            const shapeSelectedBorder = new Sprite(texture['states'][':selected'].shape)
            // shapeSelectedBorder.x = -(shapeSelectedBorder.width - shape.width) / 2;
            // shapeSelectedBorder.y = -(shapeSelectedBorder.height - shape.height) / 2;
            shapeSelectedBorder.visible = false
            shapeSelectedBorder.label = NodeContainerChildNames.shapeSelectedBorder
            shapeSelectedBorder.anchor.set(0.5);

            shape.addChild(shapeSelectedBorder)

            // draw selected graphics
            const shapeHighlightedBorder = new Sprite(texture['states'][':highlighted'].shape)
            // shapeHighlightedBorder.x = -(shapeHighlightedBorder.width - shape.width) / 2;
            // shapeHighlightedBorder.y = -(shapeHighlightedBorder.height - shape.height) / 2;
            shapeHighlightedBorder.visible = false
            shapeHighlightedBorder.label = NodeContainerChildNames.shapeHighlightedBorder
            shapeHighlightedBorder.anchor.set(0.5);

            shape.addChild(shapeHighlightedBorder)

            // shape.interactive = true;
            // shape.cursor = "pointer";
            // shape.hitArea = new Circle(0, 0, this.data.style?.shape.size);
            return shape

        } else {
            console.error("Failed to fetch texture for the data : ", this.data)
            // return new Graphics()
        }
    }

}


export default Circle