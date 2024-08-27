import { Graphics, Circle } from "pixi.js"
import { IShapeBgStyle, IShapeBorderStyle } from "../../types"


export interface DrawRectanglePrimitiveType {
    x: number
    y: number
    width: number
    height: number
    radius?: number
    // padding?: number
    background?: IShapeBgStyle
    border?: IShapeBorderStyle
}

const drawRectangleShape = (props: DrawRectanglePrimitiveType) => {
    console.debug("drawRectangleShape", props);
    const shapeName = new Graphics();
    shapeName.roundRect( props.x,props.y, props.width, props.height, props.radius);
    if (props.background){
        const alpha = props.background.color === "transparent" ? 0: props.background.opacity
        shapeName.fill({color: props.background.color, alpha: alpha} );
    } 
    if (props.border){
        const opacity = props.border?.opacity ? props.border?.opacity : 1;
        // TODO - border.type not being used yet ;
        //  opacity: opacity
        shapeName.stroke({width: props.border.thickness, alpha: opacity,  color: props.border.color, alignment: 1}); // alignment (0.5 = middle, 1 = outter, 0 = inner).
    }
    // shapeName.hitArea = new Circle(0, 0, props.size);
    shapeName.cursor = 'pointer';

    return shapeName;
}


export default drawRectangleShape