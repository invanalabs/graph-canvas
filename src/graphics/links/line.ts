import * as PIXI from 'pixi.js';
import { LinkShapeBase } from '../base';


class Line extends LinkShapeBase {

    color: string =  '#ff00ff';
    thickness: number = 2


  
    drawShape = () => {
        console.log("Line.drawShape triggered", this.data)
        let shape = new PIXI.Graphics();
        // line color and thickness

        const startX = this.data.source?.x;
        const startY = this.data.source?.y;
        const endX = this.data.target?.x;
        const endY = this.data.target?.y;

        // Draw the line
        shape.moveTo(startX, startY);
        shape.lineTo(endX, endY);
        shape.stroke({width: this.thickness, color: this.color});

        // // Calculate arrowhead points
        const angle = Math.atan2(endY - startY, endX - startX);
        // const arrowWidth = 10; // width of the arrowhead
        const arrowLength = 10; // length of the arrowhead

        const x1 = endX - arrowLength * Math.cos(angle - Math.PI / 6);
        const y1 = endY - arrowLength * Math.sin(angle - Math.PI / 6);
        const x2 = endX - arrowLength * Math.cos(angle + Math.PI / 6);
        const y2 = endY - arrowLength * Math.sin(angle + Math.PI / 6);

        // Draw the arrowhead
        shape.moveTo(endX, endY);
        shape.lineTo(x1, y1);
        shape.moveTo(endX, endY);
        shape.lineTo(x2, y2);

        return shape
    }

}


export default Line