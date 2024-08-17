import { Text, TextStyle, HTMLText } from "pixi.js"
import { IIconStyle } from "../types";


// export interface IIconShape extends IIconStyle {
//     content: string
//     // style: IIconStyle

// }

const drawIconShape = (props: IIconStyle, resolution: number = window.devicePixelRatio) => {

    // if (!props.label){
    //     // if label is not found, not point it rendering, so return
    //     return 
    // }

    // add text
    const style = new TextStyle({
        fontFamily: props?.font.family,
        fontSize: props?.font.size,
        fill: props?.color,
        align: props?.font.align,
        fontWeight: props?.font.weight,
        fontStyle: props?.font.style
    })
    const text = new Text({text: props.content, style});
    text.resolution =  resolution ;

    return text
}

export default drawIconShape;