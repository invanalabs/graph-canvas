import { Text, TextStyle, HTMLText, HTMLTextStyle } from "pixi.js"
import { IIconStyle } from "../types";



const drawIconShape = (props: IIconStyle, resolution: number = window.devicePixelRatio) => {

    // add text

    let text;
    if (props.content.startsWith("&")) {
        const style = new HTMLTextStyle({
            fontFamily: props?.font.family,
            fontSize: props?.font.size,
            fill: props?.color,
            align: props?.font.align,
            fontWeight: props?.font.weight,
            fontStyle: props?.font.style
        })
    
        text = new HTMLText({ text: `<p>Hello ${props.content}</p>`, style })
    } else {

        const style = new TextStyle({
            fontFamily: props?.font.family,
            fontSize: props?.font.size,
            fill: props?.color,
            align: props?.font.align,
            fontWeight: props?.font.weight,
            fontStyle: props?.font.style
        })
    
        text = new Text({ text: props.content, style });

    }
    text.resolution = resolution;
    // text.pivot.set(0.5)

    return text
}

export default drawIconShape;