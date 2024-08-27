import { Graphics, Point} from "pixi.js"
import { ILinkShapeStyle } from "../../types";


export interface DrawLinkPrimitiveType extends ILinkShapeStyle {
    // type : 
    startPoint : Point 
    endPoint : Point
}


const drawStraightLineShape = ( props: DrawLinkPrimitiveType) => {
    console.debug("drawStraightLineShape", props);
    const shapeGfx = new Graphics({isRenderGroup: true});
    // draw the path 
    // shapeGfx.lineStyle({ width: props.thickness, color: props.color }); // Thickness 5, Red color
    shapeGfx.moveTo(props.startPoint.x, props.startPoint.y);
    shapeGfx.lineTo(props.endPoint.x, props.endPoint.y);
    shapeGfx.stroke({color: props.color, width: props.thickness});
    shapeGfx.fill({color: props.color})
    shapeGfx.interactive = true;
    // TODO - FIX this hitarea 
    // shapeGfx.hitArea = new Polygon(shapeGfx.currentPath.points);
    // shapeGfx.hitArea = shapeGfx.getBounds();
    // shapeGfx.hitArea = new Rectangle(props.startPoint.x, props.startPoint.y, props.endPoint.x, props.endPoint.y);
    shapeGfx.cursor = 'pointer';


    return shapeGfx;
}

export default drawStraightLineShape