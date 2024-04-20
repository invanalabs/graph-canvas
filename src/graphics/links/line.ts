import * as PIXI from 'pixi.js';
import { LinkShapeBase } from '../base';
import { getAngle, getContactPointOnCircle, getContactPointFromCircle, getLinkLabelPosition } from '../utils';
import { LinkShapeTypes } from '../types';


class Line extends LinkShapeBase {

    color: string =  '#ff0000';
    thickness: number = 2
    //@ts-ignore
    // point: PIXI.Point;
    //@ts-ignore
    curveType: LinkShapeTypes = 'straight'

    drawLabel = () => {
        console.log("Line.drawLabel")
        const labelString = this.data.label ? this.data.label : `${this.data.source?.id}-->${this.data.target?.id}`

        const labelGfx = new PIXI.Graphics()
        // Add label text
        // https://pixijs.com/8.x/playground?exampleId=text.pixiText
        const style = new PIXI.TextStyle({ fontFamily: 'Arial', fontSize: 12, fill: 0xFFFFFF })
        const text = new PIXI.Text({ text : labelString,  style});
        text.anchor.set(0.5);

        // text.cursor = 'pointer';
        const labelPosition = getLinkLabelPosition(this.data.source, this.data.target, this.curveType)
        text.position.y = -5; // offset 
        text.resolution = window.devicePixelRatio * 2;
        labelGfx.angle = getAngle(this.data.source, this.data.target)
        labelGfx.position.set(labelPosition.x, labelPosition.y);
        labelGfx.addChild(text)
        
        return labelGfx
    }


    drawArrow = (targetContactPoint: PIXI.Point) => {
        let arrow = new PIXI.Graphics();
 
        arrow.poly([0, 0, 10, -5, 6.666666666666667, 0, 10, 5, 0, 0]);
        arrow.rotation = Math.atan2(
            this.data.source.y - targetContactPoint.y,
            this.data.source.x - targetContactPoint.x
        );
        arrow.position.set(targetContactPoint.x, targetContactPoint.y);
        arrow.stroke({width: this.thickness, color: this.color});

        return arrow;
    }

    drawShape = () => {
        console.log("Line.drawShape triggered", this.data)
        let shape = new PIXI.Graphics();
        // line color and thickness
        const arrowPadding = 3; 
        const targetContactPoint = getContactPointOnCircle(
            this.data.source,
            this.data.target,
            arrowPadding
        );
        const sourceContactPoint = getContactPointFromCircle(
            this.data.source,
            this.data.target,
            arrowPadding
        );
        console.log("targetContactPoint", targetContactPoint)
        shape.moveTo(sourceContactPoint.x, sourceContactPoint.y);
        shape.lineTo(targetContactPoint.x, targetContactPoint.y);
        shape.stroke({width: this.thickness, color: this.color});

        // shape.closePath()
        const arrow = this.drawArrow(targetContactPoint)
        shape.addChild(arrow)
        return shape
    }

}


export default Line