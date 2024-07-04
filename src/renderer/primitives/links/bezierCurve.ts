import { Graphics, Point, Polygon} from "pixi.js"
import { ILinkShapeStyle } from "../../types";


export interface DrawLinkPrimitiveType extends ILinkShapeStyle {
    // type : 
    startPoint : Point 
    endPoint : Point
}


const drawBezierCurveShape = ( props: DrawLinkPrimitiveType) => {
    console.debug("drawStraightLineShape", props);
    let shapeName = new Graphics();
    // draw the path 
    shapeName.lineStyle(props.thickness, props.color);

    // const center = getCenterBetweenTwoPoints(props.startPoint, props.endPoint, "");

    // shapeName.bezierCurveTo(
    //     props.startPoint.x, props.startPoint.y,
    //     center.x, center.y, 
    //     props.endPoint.x, props.endPoint.y
    // );

    shapeName.arcTo(
        props.startPoint.x, props.startPoint.y,
        props.endPoint.x, props.endPoint.y,
        60
    );
    shapeName.lineStyle(props.thickness, props.color);

    // shapeName.moveTo(props.startPoint.x, props.startPoint.y);
    // shapeName.lineTo(props.endPoint.x, props.endPoint.y);
    // TODO - FIX this hitarea 
    shapeName.hitArea = new Polygon(shapeName.currentPath.points);
    shapeName.cursor = 'pointer';


    return shapeName;
}

export default drawBezierCurveShape