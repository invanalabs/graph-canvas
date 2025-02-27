import { Graphics, Point } from "pixi.js"
import { ILinkShapeStyle } from "../../types";


export interface DrawLinkPrimitiveType extends ILinkShapeStyle {
    // type : 
    startPoint: Point
    endPoint: Point
}


const drawDottedLineShape = (props: DrawLinkPrimitiveType) => {
    console.debug("drawDottedLineShape", props);
    let shapeName = new Graphics();
    shapeName.lineStyle(props.thickness, props.color);

    // Define the dash size and gap size
    let dashSize = 10;
    let gapSize = 5;

    // Calculate the total length of the dashed line
    let totalLength = Math.hypot(props.endPoint.x - props.startPoint.y, props.endPoint.y - props.startPoint.y) //props.startPoint.distanceTo(props.endPoint);

    // console.debug("==totalLength", totalLength)
    // Calculate the number of dashes
    let numDashes = Math.ceil(totalLength / (dashSize + gapSize));

    // Calculate the step size for each dash
    let stepX = (props.endPoint.x - props.startPoint.x) / numDashes;
    let stepY = (props.endPoint.y - props.startPoint.y) / numDashes;

    // Draw the dashed line
    for (let i = 0; i < numDashes; i++) {
        let startX = props.startPoint.x + i * stepX;
        let startY = props.startPoint.y + i * stepY;
        let endX = Math.min(startX + dashSize, props.endPoint.x);
        let endY = Math.min(startY + dashSize, props.endPoint.y);

        shapeName.moveTo(startX, startY);
        shapeName.lineTo(endX, endY);

        // Move the starting point for the next dash
        props.startPoint.x += stepX + gapSize * (stepX / dashSize);
        props.startPoint.y += stepY + gapSize * (stepY / dashSize);
    }
    return shapeName;
}

export default drawDottedLineShape