import { Graphics, TextStyle, Text } from "pixi.js"
import { IShapeLabelStyle } from "../types";
import { NodeContainerChildNames } from "../shapes/constants";


export interface LabelPrimitiveType extends IShapeLabelStyle {
    label: string
}

const drawLabelShape = (props: LabelPrimitiveType) => {
    // console.log("===drawLabelShape props", props)
    const labelGfx = new Graphics();

    // if (!props.label){
    //     // if label is not found, not point it rendering, so return
    //     return 
    // }

    // add text
    const textStyle = new TextStyle({
        // fontFamily: props?.text.font.family,
        // fontSize: props?.text.font.size,
        // fill: props?.text.color,
        // align: "center"


        fontFamily: props?.text.font.family,
        fontSize: props?.text.font.size,
        fill: props?.text.color,
        align: props?.text.font.align,
        fontWeight: props?.text.font.weight,
        fontStyle: props?.text.font.style


    })
    const text = new Text( props.label, textStyle);
    text.resolution = props.resolution || 6 ;
    text.name = NodeContainerChildNames.labelText
    const textBounds = text.getBounds(); // Get the size of the text box

    if (props?.background?.color){
        // console.log("===drawLabelShape props.background.color", props.background.color)
        // add background; TODO- move this to rectangle primitive later 
        const textBackground = new Graphics();
        textBackground.lineStyle(props.border.thickness, props.border.color);

        textBackground.beginFill(
            props?.background.color,
            // props?.background.opacity
        ); // Background color

        textBackground.drawRect(
            // props.padding * -1 , props.padding * -1, 
            0, 0, 
            textBounds.width + (props.padding * 2) , 
            textBounds.height // + props.padding 
        ); // Draw rectangle behind the text
        // console.log("====props.border.", props.border)
        textBackground.endFill()

        // textBackground
        textBackground.name = NodeContainerChildNames.labelBackground
        // textBackground.visible = false
        textBackground.x = text.x - props.padding 
        textBackground.y = text.y
        // add background and text to gfx
        labelGfx.addChild(textBackground)
    }
    // const mask = new Graphics();
    // mask.rect(
    //     // props.padding * -1 , props.padding * -1, 
    //     0, 0, 
    //     textBounds.width + (props.padding * 2) , 
    //     textBounds.height // + props.padding 
    // ); // Draw rectangle behind the text
    // // mask.fill(0xffffff);
    // mask.fill("#222222")
    // text.mask = mask

    // labelGfx.addChild(mask)
    labelGfx.addChild(text)
    return labelGfx
}

export default drawLabelShape;