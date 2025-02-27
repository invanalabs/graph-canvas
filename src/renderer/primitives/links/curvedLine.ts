import { Graphics, Point} from "pixi.js"
import { ILinkShapeStyle } from "../../types";


export interface DrawLinkPrimitiveType extends ILinkShapeStyle {
    // type : 
    startPoint : Point 
    endPoint : Point
}


const curvedLineShape = ( props: DrawLinkPrimitiveType) => {
    console.debug("curvedLineShape", props);
    const shapeName = new Graphics();
    // draw the path 
    shapeName.lineStyle(props.thickness, props.color);
    shapeName.moveTo(props.startPoint.x, props.startPoint.y);
    // shapeName.beginFill(props.color, props.opacity)

    shapeName.lineTo(props.endPoint.x, props.endPoint.y);
    // shapeName.endFill()
    shapeName.interactive = true;
    // TODO - FIX this hitarea 
    // shapeName.hitArea = new Polygon(shapeName.currentPath.points);
    // shapeName.hitArea = shapeName.getBounds();
    // shapeName.hitArea = new Rectangle(props.startPoint.x, props.startPoint.y, props.endPoint.x, props.endPoint.y);
    shapeName.cursor = 'pointer';


    return shapeName;
}

export default curvedLineShape