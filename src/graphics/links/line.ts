import * as PIXI from 'pixi.js';
import { LinkShapeBase } from '../base';
import { getAngle, getContactPointOnCircle, getLinkLabelPosition } from '../utils';
import { LinkShapeTypes } from '../types';


class Line extends LinkShapeBase {

    color: string =  '#ff0000';
    thickness: number = 2
    //@ts-ignore
    point: PIXI.Point;
    //@ts-ignore
    curveType: LinkShapeTypes = 'straight'

    drawLabel = () => {
        console.log("Line.drawLabel")
        const labelGfx = new PIXI.Graphics()
        // Add label text
        // https://pixijs.com/8.x/playground?exampleId=text.pixiText
        const style = new PIXI.TextStyle({ fontFamily: 'Arial', fontSize: 12, fill: 0xFFFFFF })
        const text = new PIXI.Text({ text : this.data.label,  style});
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


    drawArrow = () => {
        let arrow = new PIXI.Graphics();
 
        arrow.poly([0, 0, 10, -5, 6.666666666666667, 0, 10, 5, 0, 0]);
        arrow.rotation = Math.atan2(
            this.data.source.y - this.point.y,
            this.data.source.x - this.point.x
        );
        arrow.position.set(this.point.x, this.point.y);
        arrow.stroke({width: this.thickness, color: this.color});

        return arrow;
    }

    drawShape = () => {
        console.log("Line.drawShape triggered", this.data)
        let shape = new PIXI.Graphics();
        // line color and thickness
        const arrowPadding = 3; 
        this.point = getContactPointOnCircle(
            this.data.source,
            this.data.target,
            this.data.target?.gfxInstance?.size   + this.thickness + arrowPadding
            // 30
        );
        console.log("this.point", this.point)
        shape.moveTo(this.data.source.x, this.data.source.y);
        shape.lineTo(this.point.x, this.point.y);
        shape.stroke({width: this.thickness, color: this.color});

        // shape.closePath()
        const arrow = this.drawArrow()
        shape.addChild(arrow)
        return shape
    }

}


export default Line