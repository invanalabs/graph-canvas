import { Graphics, Point, Polygon} from "pixi.js"
import { LinkShapeType } from "../../canvas/types"
import { getCenterBetweenTwoPoints } from "../../graphics/utils"

export interface DrawLinkPrimitiveType extends LinkShapeType {
    // type : 
    startPoint : Point 
    endPoint : Point
}


const drawBezierCurveShape = ( props: DrawLinkPrimitiveType) => {
    console.log("drawStraightLineShape", props);
    let shape = new Graphics();
    // draw the path 
    shape.lineStyle(props.thickness, props.color);

    // const center = getCenterBetweenTwoPoints(props.startPoint, props.endPoint, "");

    // shape.bezierCurveTo(
    //     props.startPoint.x, props.startPoint.y,
    //     center.x, center.y, 
    //     props.endPoint.x, props.endPoint.y
    // );

    shape.arcTo(
        props.startPoint.x, props.startPoint.y,
        props.endPoint.x, props.endPoint.y,
        60
    );
    shape.lineStyle(props.thickness, props.color);

    // shape.moveTo(props.startPoint.x, props.startPoint.y);
    // shape.lineTo(props.endPoint.x, props.endPoint.y);
    // TODO - FIX this hitarea 
    shape.hitArea = new Polygon(shape.currentPath.points);
    shape.cursor = 'pointer';


    return shape;
}

export default drawBezierCurveShape