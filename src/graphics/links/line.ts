import * as PIXI from 'pixi.js';
import { LinkShapeBase } from '../base';
import { getCirclePont } from '../utils';


class Line extends LinkShapeBase {

    color: string =  '#ff0000';
    thickness: number = 2
    //@ts-ignore
    point: PIXI.Point;


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
        this.point = getCirclePont(
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
        shape.addChild(this.drawArrow())
        return shape
    }

}


export default Line