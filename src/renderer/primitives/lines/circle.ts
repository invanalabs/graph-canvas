import { Graphics, Circle } from "pixi.js"
import { ShapeBackgroundType, ShapeBorderType } from "../../types"


export interface DrawCirclePrimitiveType {
    size: number
    background: ShapeBackgroundType
    border?: ShapeBorderType
}


const drawCircleShape = (props: DrawCirclePrimitiveType) => {
    console.log("drawCircle", props);
    let shapeName = new Graphics();
    if (props.border){
        const opacity = props.border?.opacity ? props.border?.opacity : 1;
        // TODO - border.type not being used yet ;
        console.log("=====border.opacity", opacity)
        shapeName.lineStyle(props.border.thickness, props.border.color, opacity);
    }
    if (props.background){
        const alpha = props.background.color === "transparent" ? 0: props.background.opacity
        shapeName.beginFill(props.background.color, alpha );
    } 
    shapeName.drawCircle(0, 0, props.size);
    shapeName.hitArea = new Circle(0, 0, props.size);
    shapeName.cursor = 'pointer';

    return shapeName;
}

export default drawCircleShape