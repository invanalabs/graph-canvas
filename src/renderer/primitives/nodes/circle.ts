import { Graphics, Circle } from "pixi.js"
import { IShapeBgStyle, IShapeBorderStyle } from "../../types"


export interface DrawCirclePrimitiveType {
    size: number
    background: IShapeBgStyle
    border?: IShapeBorderStyle
}

const drawCircleShape = (props: DrawCirclePrimitiveType) => {
    console.debug("drawCircle", props);
    const shapeName = new Graphics();


    shapeName.circle(0, 0, props.size);
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
    shapeName.hitArea = new Circle(0, 0, props.size);
    shapeName.cursor = 'pointer';
    shapeName.pivot.set(props.size / 2, props.size / 2)

    return shapeName;
}


export default drawCircleShape