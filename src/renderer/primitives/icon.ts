import { Text, TextStyle } from "pixi.js"
import { IIconStyle } from "../types";


export interface IIconShape extends IIconStyle {
    content: string
    // style: IIconStyle

}

const drawIconShape = (props: IIconShape) => {

    // if (!props.label){
    //     // if label is not found, not point it rendering, so return
    //     return 
    // }

    // add text
    const style = new TextStyle({
        fontFamily: props?.font.family,
        fontSize: props?.font.size,
        // fill: props?.color,
        // align: "center"
    })
    const text = new Text( props.content, style);
    // text.resolution = props?.resolution || 6 ;

    return text
}

export default drawIconShape;