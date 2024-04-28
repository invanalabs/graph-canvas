import { Graphics } from "pixi.js"
import { ShapeBackgroundType, ShapeBorderType } from "../canvas/types"


export interface DrawCirclePrimitiveType {
    size: number
    background: ShapeBackgroundType
    border?: ShapeBorderType
}


const drawLineShape = (props: DrawCirclePrimitiveType) => {
    console.log("drawLineShape", props);
    let shape = new Graphics();
    if (props.border){
        // TODO - border.type not being used yet 
        shape.lineStyle(props.border.thickness, props.border.color);
    }
    if (props.background){
        shape.beginFill(props.background.color, props.background.opacity)
    }
    shape.drawCircle(0, 0, props.size);
    return shape;
}

export default drawLineShape