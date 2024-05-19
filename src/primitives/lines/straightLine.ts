import { Graphics, Point, Polygon, Rectangle} from "pixi.js"
import { LinkShapeType } from "../../canvas/types"


export interface DrawLinkPrimitiveType extends LinkShapeType {
    // type : 
    startPoint : Point 
    endPoint : Point
}


const drawStraightLineShape = ( props: DrawLinkPrimitiveType) => {
    console.log("drawStraightLineShape", props);
    let shape = new Graphics();
    // draw the path 
    shape.lineStyle(props.thickness, props.color);
    shape.moveTo(props.startPoint.x, props.startPoint.y);
    // shape.beginFill(props.color, props.opacity)

    shape.lineTo(props.endPoint.x, props.endPoint.y);
    // shape.endFill()
    shape.interactive = true;
    // TODO - FIX this hitarea 
    // shape.hitArea = new Polygon(shape.currentPath.points);
    // shape.hitArea = shape.getBounds();
    // shape.hitArea = new Rectangle(props.startPoint.x, props.startPoint.y, props.endPoint.x, props.endPoint.y);
    shape.cursor = 'pointer';


    return shape;
}

export default drawStraightLineShape