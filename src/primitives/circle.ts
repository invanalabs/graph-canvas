import { Graphics, Circle } from "pixi.js"
import { ShapeBackgroundType, ShapeBorderType } from "../canvas/types"


export interface DrawCirclePrimitiveType {
    size: number
    background: ShapeBackgroundType
    border?: ShapeBorderType
}


const drawCircleShape = (props: DrawCirclePrimitiveType) => {
    console.log("drawCircle", props);
    let shape = new Graphics();
    if (props.border){
        // TODO - border.type not being used yet 
        shape.lineStyle(props.border.thickness, props.border.color);
    }
    if (props.background){
        const alpha = props.background.color === "transparent" ? 0: props.background.opacity
        shape.beginFill(props.background.color, alpha );
    } 
    shape.drawCircle(0, 0, props.size);
    shape.hitArea = new Circle(0, 0, props.size);
    shape.cursor = 'pointer';
    shape.eventMode = 'static';// this will allow it to respond to mouse and touch events 

    return shape;
}

export default drawCircleShape