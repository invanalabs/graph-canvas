import { Graphics, Point } from "pixi.js"
import { LinkShapeType, ShapeBackgroundType, ShapeBorderType } from "../canvas/types"


export interface DrawLinkPrimitiveType extends LinkShapeType {
    // type : 
    startPoint : Point 
    endPoint : Point
}


const drawStraightLineShape = ( props: DrawLinkPrimitiveType) => {
    console.log("drawLineShape", props);
    let shape = new Graphics();

    // draw the path 
    shape.lineStyle(props.thickness, props.color);
    shape.moveTo(props.startPoint.x, props.startPoint.y);
    shape.lineTo(props.endPoint.x, props.endPoint.y);

    // 


    return shape;
}

export default drawStraightLineShape