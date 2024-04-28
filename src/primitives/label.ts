import { Graphics, TextStyle, Text } from "pixi.js"
import { ShapeLabelType } from "../canvas/types"


export interface LabelPrimitiveType extends ShapeLabelType {
    label: string
}

const drawLabelShape = (props: LabelPrimitiveType) => {
    const labelGfx = new Graphics();

    // if (!props.label){
    //     // if label is not found, not point it rendering, so return
    //     return 
    // }

    // add text
    const textStyle = new TextStyle({
        fontFamily: props?.text.font.family,
        fontSize: props?.text.font.size,
        fill: props?.text.color
    })
    const text = new Text( props.label, textStyle);
    const textBounds = text.getBounds(); // Get the size of the text box

    // add background; TODO- move this to rectangle primitive later 
    const textBackground = new Graphics();
    textBackground.beginFill(
        props?.background.color,
        props?.background.opacity
    ); // Background color
    textBackground.drawRect(0, 0, textBounds.width + props.padding , textBounds.height + props.padding ); // Draw rectangle behind the text

    // add background and text to gfx
    labelGfx.addChild(textBackground)
    labelGfx.addChild(text)
    return labelGfx
}

export default drawLabelShape;