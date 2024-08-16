import { Sprite, Graphics } from 'pixi.js';
import { NodeShapeBase } from '../base';
import { NodeContainerChildNames } from '../../constants';
import drawLabelShape from '../../../primitives/label';
import { createDebugPoint } from '../../utils';
// import { DraggableSprite } from '../../../sprites/draggable';


class Circle extends NodeShapeBase {

    drawLabel = () => {
        if (!this.data.label) {
            return
        }
        const shapeStyle = this.data.style
        console.debug("this.data.label", this.data.label)
        console.debug("shapeStyle?.label", shapeStyle?.label)

        shapeStyle.label.text.font.size = this.data.style.size
        const labelArgs = {
            label: this.data.label,
            ...shapeStyle?.label
        }
        console.debug("==labelArgs", labelArgs)
        const labelGfx = drawLabelShape(labelArgs);
        if (labelGfx) {
            labelGfx.name = NodeContainerChildNames.label;
            labelGfx.position.set(shapeStyle.size + 5, -shapeStyle.size);
        }
        console.debug("==labelGfx", labelGfx)
        return labelGfx
    }

    drawShape = () => {
        console.debug("Circle.drawShape triggered", this.data.style)
        // const shapeStyle = this.data.style

        const { texture } = this.artBoard.renderer.textureStore.getOrCreateShapeTexture({
            size: this.data.style?.size,
            group: this.data.group,
            style: this.data.style
        })


        // console.log("===texture", this.data.id, texture,)
        if (texture) {


            const shape = new Sprite(texture['states'][':default'].shape)
            shape.name = NodeContainerChildNames.shapeName;
            // shape.x = -shape.width / 2;
            // shape.y = -shape.height / 2;

            shape.anchor.set(0.5);





            if (this.data.icon) {

                const { iconTexture } = this.artBoard.renderer.textureStore.getOrCreateIconTexture({
                    ...this.data.style.shape.icon, content: this.data.icon
                })
                // console.log("===iconTexture", this.data.id, iconTexture,)

                const icon = new Sprite(iconTexture);
                icon.name = NodeContainerChildNames.icon;
                // icon.x = icon.width ;
                // icon.y = icon.height ;
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
                        // let imageGfx;



                        // if (this.data.image?.endsWith(".svg")) {
                        //     const imageGfx = new Graphics(texture);
                        //     imageGfx.width = shape.width
                        //     imageGfx.height = shape.height
                        //     // imageSprite.x = imageSprite.width/2 ;
                        //     // imageSprite.y = imageSprite.height/2 ;
                        //     imageGfx.pivot.set(0.5);
                        // } else {
                            // Create a sprite from the loaded texture
                            const imageGfx = new Sprite(texture);
                            imageGfx.width = shape.width 
                            imageGfx.height = shape.height 
                            // imageSprite.x = imageSprite.width/2 ;
                            // imageSprite.y = imageSprite.height/2 ;
                            imageGfx.anchor.set(0.5);
                            // Create a circular mask
                            const mask = new Graphics();
                            // mask.beginFill(0xffffff);
                            mask.circle(0, 0, this.data.style.size - this.data.style.shape.border.thickness);
                            mask.fill(0xffffff);
                            // Apply the mask to the sprite
                            imageGfx.mask = mask;
                            // Add the mask and sprite to the stage
                            shape.addChild(mask);
                            shape.addChild(imageGfx);
                        // }




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
            shapeSelectedBorder.name = NodeContainerChildNames.shapeSelectedBorder
            shapeSelectedBorder.anchor.set(0.5);

            shape.addChild(shapeSelectedBorder)

            // draw selected graphics
            const shapeHighlightedBorder = new Sprite(texture['states'][':highlighted'].shape)
            // shapeHighlightedBorder.x = -(shapeHighlightedBorder.width - shape.width) / 2;
            // shapeHighlightedBorder.y = -(shapeHighlightedBorder.height - shape.height) / 2;
            shapeHighlightedBorder.visible = false
            shapeHighlightedBorder.name = NodeContainerChildNames.shapeHighlightedBorder
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