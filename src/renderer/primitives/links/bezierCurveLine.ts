import { Graphics, Point, Polygon} from "pixi.js"
import { ILinkShapeStyle } from "../../types";
import { getCenterBetweenTwoPoints } from "../../shapes/links/utils";


export interface DrawLinkPrimitiveType extends ILinkShapeStyle {
    // type : 
    startPoint : Point 
    endPoint : Point
}


const drawBezierCurveShape = ( props: DrawLinkPrimitiveType) => {
    console.debug("drawBezierCurveShape", props);
    const graphics = new Graphics();
    // draw the path 

      // Define the curvature variable
      const curvature = 0.3; // Adjust this value between 0 and 1 for different curvature

      // Calculate control points based on the curvature
      const cp1X = props.startPoint.x + (props.endPoint.x - props.startPoint.x) * curvature;
      const cp1Y = props.startPoint.y - (props.endPoint.y - props.startPoint.y) * curvature;
      const cp2X = props.endPoint.x - (props.endPoint.x - props.startPoint.x) * curvature;
      const cp2Y = props.endPoint.y + (props.endPoint.y - props.startPoint.y) * curvature;

      // Draw the Bézier curve
      graphics.lineStyle(4, 0xffd900, 1);
      graphics.moveTo(props.startPoint.x, props.startPoint.y);
      graphics.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, props.endPoint.x, props.endPoint.y);



    // shapeName.lineStyle(props.thickness, props.color);

    // const center = getCenterBetweenTwoPoints(props.startPoint, props.endPoint, "");

    // shapeName.bezierCurveTo(
    //     props.startPoint.x, props.startPoint.y,
    //     center.x, center.y, 
    //     props.endPoint.x, props.endPoint.y
    // );

    // shapeName.arcTo(
    //     props.startPoint.x, props.startPoint.y,
    //     props.endPoint.x, props.endPoint.y,
    //     60
    // );
    // shapeName.lineStyle(props.thickness, props.color);

    // shapeName.moveTo(props.startPoint.x, props.startPoint.y);
    // shapeName.lineTo(props.endPoint.x, props.endPoint.y);
    // TODO - FIX this hitarea 
    // shapeName.hitArea = new Polygon(shapeName.currentPath.points);
    // shapeName.cursor = 'pointer';


    return graphics;
}

export default drawBezierCurveShape