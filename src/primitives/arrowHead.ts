import { Graphics, Point } from "pixi.js"
import { LinkShapeType } from "../canvas/types"

export interface DrawArrowPrimitiveType extends LinkShapeType {
    startPoint : Point 
    endPoint : Point
}

const drawArrowHeadShape = ( props: DrawArrowPrimitiveType) => {
    console.log("drawArrowHeadShape", props);
    // draw arrow 
    let shape = new Graphics();
    const points = [0, 0, 10, -5, 6.666666666666667, 0, 10, 5, 0, 0]
    shape.lineStyle(props.thickness,  props.color, props.opacity);
    shape.drawPolygon(points);

    // update angle 
    shape.rotation = Math.atan2(
        props.startPoint.y - props.endPoint.y,
        props.startPoint.x - props.endPoint.x
    );
    shape.position.set(props.endPoint.x, props.endPoint.y);
    shape.cursor = 'pointer';

    return shape;
}

export default drawArrowHeadShape