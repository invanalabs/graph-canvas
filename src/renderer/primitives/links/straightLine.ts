import { Graphics, Point} from "pixi.js"
import { ILinkShapeStyle } from "../../types";


export interface DrawLinkPrimitiveType extends ILinkShapeStyle {
    // type : 
    startPoint : Point 
    endPoint : Point
}


const drawStraightLineShape = ( props: DrawLinkPrimitiveType) => {
    console.debug("drawStraightLineShape", props);
    const shapeName = new Graphics();
    // draw the path 
    shapeName.moveTo(props.startPoint.x, props.startPoint.y);
    shapeName.lineTo(props.endPoint.x, props.endPoint.y);
    shapeName.stroke({color: props.color});
    shapeName.fill({color: props.color})
    shapeName.interactive = true;
    // TODO - FIX this hitarea 
    // shapeName.hitArea = new Polygon(shapeName.currentPath.points);
    // shapeName.hitArea = shapeName.getBounds();
    // shapeName.hitArea = new Rectangle(props.startPoint.x, props.startPoint.y, props.endPoint.x, props.endPoint.y);
    shapeName.cursor = 'pointer';


    return shapeName;
}

export default drawStraightLineShape