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
        const opacity = props.border?.opacity ? props.border?.opacity : 1;
        // TODO - border.type not being used yet ;
        console.log("=====border.opacity", opacity)
        shape.lineStyle(props.border.thickness, props.border.color, opacity);
    }
    if (props.background){
        const alpha = props.background.color === "transparent" ? 0: props.background.opacity
        shape.beginFill(props.background.color, alpha );
    } 
    shape.drawCircle(0, 0, props.size);
    shape.hitArea = new Circle(0, 0, props.size);
    shape.cursor = 'pointer';

    return shape;
}

export default drawCircleShape