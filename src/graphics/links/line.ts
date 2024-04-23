import * as PIXI from 'pixi.js';
import { LinkShapeBase } from '../base';
import { getAngle, getContactPointOnCircle, getContactPointFromCircle, getLinkLabelPosition } from '../utils';
import { LinkShapeTypes } from '../types';


class Line extends LinkShapeBase {


    //@ts-ignore
    // point: PIXI.Point;
    //@ts-ignore
    curveType: LinkShapeTypes = 'straight'

    calcLabelPosition = (labelGfx: PIXI.Graphics, shapeGfx: PIXI.Graphics) => {
        const labelPosition = getLinkLabelPosition(this.data.source, this.data.target, this.curveType)
        labelGfx.angle = this.calcLabelAngle(shapeGfx)
        labelGfx.position.set(labelPosition.x, labelPosition.y);

    }

    calcLabelAngle =(shapeGfx: PIXI.Graphics) => {
        let angle = getAngle(this.data.source, this.data.target);
        if (angle > 90 || angle < -90) {
          angle = angle + 180;
        }
        return angle
    }

    calcArrowAngle = (arrow: PIXI.Graphics, startPoint: PIXI.Point, endPoint: PIXI.Point,  points: number[], ) => {
        arrow.rotation = Math.atan2(
            startPoint.y - endPoint.y,
            startPoint.x - endPoint.x
        );
        arrow.position.set(endPoint.x, endPoint.y);
    }

    calcStartAndEndPoints = () => {
            // line color and thickness
        const arrowPadding = 3; 
        const endPoint = getContactPointOnCircle(
            this.data.source,
            this.data.target,
            arrowPadding
        );
        const startPoint = getContactPointFromCircle(
            this.data.source,
            this.data.target,
            arrowPadding
        );
        return {startPoint, endPoint}
    
    }


    drawPath = (shapeLine: PIXI.Graphics, startPoint: PIXI.Point, endPoint: PIXI.Point) => {
        shapeLine.moveTo(startPoint.x, startPoint.y);
        shapeLine.lineTo(endPoint.x, endPoint.y);

    }


}


export default Line