import { Graphics, Point } from "pixi.js"
import { ILinkShapeStyle } from "../../types/styles"

export interface DrawArrowPrimitiveType extends ILinkShapeStyle {
    startPoint : Point 
    endPoint : Point
    // gfx: Graphics
}

const drawArrowTriangleShape = ( props: DrawArrowPrimitiveType, size: number = 5,  gfx?: Graphics) => {
    console.debug("drawArrowHeadShape", props);
    // draw arrow 
    gfx = gfx ? gfx : new Graphics() 
    // const points = createArrowHeadPoints()
    const angle = Math.atan2(props.endPoint.y - props.startPoint.y, props.endPoint.x - props.startPoint.x);
    const arrowPoint1X = props.endPoint.x - size * Math.cos(angle - Math.PI / 6);
    const arrowPoint1Y = props.endPoint.y - size * Math.sin(angle - Math.PI / 6);
    const arrowPoint2X = props.endPoint.x - size * Math.cos(angle + Math.PI / 6);
    const arrowPoint2Y = props.endPoint.y - size * Math.sin(angle + Math.PI / 6);

    // Draw the solid arrowhead
    gfx.beginFill(props.color); // Set the fill color for the arrowhead
    gfx.moveTo(props.endPoint.x, props.endPoint.y);
    gfx.lineTo(arrowPoint1X, arrowPoint1Y);
    gfx.lineTo(arrowPoint2X, arrowPoint2Y);
    gfx.lineTo(props.endPoint.x, props.endPoint.y);
    gfx.endFill();
    return gfx;
}

export default drawArrowTriangleShape