import { Graphics, Point } from "pixi.js"
import { LinkShapeType } from "../types/styles"

export interface DrawArrowPrimitiveType extends LinkShapeType {
    startPoint : Point 
    endPoint : Point
    gfx: Graphics
}


const createArrowHeadPoints = () => {
    // return [0, 0, 10, -5, 6.666666666666667, 0, 10, 5, 0, 0] // original 
    return [0, 0, 6, -4, 4.666666666666667, 0, 6, 4, 0, 0]
}

const drawArrowHeadShape = ( props: DrawArrowPrimitiveType) => {
    console.log("drawArrowHeadShape", props);
    // draw arrow 
    const gfx = new Graphics()
   const points = createArrowHeadPoints()
    // const points = [0, 0, 10, -5, 6.666666666666667, 0, 10, 5, 0, 0]
    gfx.lineStyle(props.thickness,  props.color, props.opacity);
    gfx.beginFill(props.color, props.opacity );
    gfx.drawPolygon(points);
    gfx.endFill();

    // update angle 
    gfx.rotation = Math.atan2(
        props.startPoint.y - props.endPoint.y,
        props.startPoint.x - props.endPoint.x
    );
    gfx.position.set(props.endPoint.x, props.endPoint.y);
    gfx.cursor = 'pointer';

    return gfx;
}

export default drawArrowHeadShape