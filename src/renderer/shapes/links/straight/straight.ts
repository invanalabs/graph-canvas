import * as PIXI from 'pixi.js';
import { LinkShapeBase } from '../base';
import { getAngle, getContactPointFromCircle, getContactPointOnCircle, getLinkLabelPosition } from '../utils';


class StraightLink extends LinkShapeBase{


    // labelGfx: PIXI.Graphics; 
    // shapeGfx: PIXI.Graphics;

    // constructor(data: ICanvasLink, canvas: GraphCanvas) {
    //     super(data, canvas)

    //     this.data = this.processData(data)
    //     const gfxs = this.draw(true, true);
    //     this.labelGfx = gfxs.labelGfx; // 
    //     this.shapeGfx = gfxs.shapeGfx;
    //     // setup intractions
    //     this.setupInteractions()
    // }

    //@ts-ignore
    // point: PIXI.Point;
    //@ts-ignore
    curveType: ILinkShapeStyles = 'straight'

    calcLabelPosition = (labelGfx: PIXI.Graphics, shapeGfx: PIXI.Graphics) => {
        const labelPosition = getLinkLabelPosition(this.data.source, this.data.target, this.curveType)
        labelGfx.angle = this.calcLabelAngle(shapeGfx)
        labelGfx.position.set(labelPosition.x, labelPosition.y);
        // labelGfx.anchor.set(0.5)

    }

    calcLabelAngle =(shapeGfx: PIXI.Graphics) => {
        let angle = getAngle(this.data.source, this.data.target);
        if (angle > 90 || angle < -90) {
          angle = angle + 180;
        }
        return angle
    }

    // calcArrowAngle = (arrow: PIXI.Graphics, startPoint: PIXI.Point, endPoint: PIXI.Point,  points: number[], ) => {
    //     arrow.rotation = Math.atan2(
    //         startPoint.y - endPoint.y,
    //         startPoint.x - endPoint.x
    //     );
    //     arrow.position.set(endPoint.x, endPoint.y);
    // }

    calcStartAndEndPoints = () => {
            // line color and thickness
            // console.log("calcStartAndEndPoints", JSON.stringify(this.data))
        console.debug("====calcStartAndEndPoints", this.data, this)
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

    // drawPath = (shapeLine: PIXI.Graphics, startPoint: PIXI.Point, endPoint: PIXI.Point) => {
    //     shapeLine.moveTo(startPoint.x, startPoint.y);
    //     shapeLine.lineTo(endPoint.x, endPoint.y);

    // }
}


export default StraightLink