import * as PIXI from 'pixi.js';
import { LinkShapeBase } from '../base';
import { getAngle, getCenterOfRectangle, getContactPointFromCircle, getContactPointOnCircle, getLinkLabelPosition } from '../utils';


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
        console.log("calcLabelPosition===", this.data.source.x, this.data.source.y, this.data.target.x, this.data.target.y)
        const labelPosition = getLinkLabelPosition(this.data.source, this.data.target, this.curveType)
        const box = labelGfx.getBounds()

        // labelGfx.position.set(labelPosition.x , labelPosition.y );

        const center = getCenterOfRectangle(box.width, box.height, labelPosition.x - box.width/2, labelPosition.y - box.height/2)

        // const midpointGfx =  new PIXI.Graphics()  
        // midpointGfx.beginFill(0xFFFF00);
        // midpointGfx.drawCircle(labelPosition.x , labelPosition.y, 5);
        // midpointGfx.endFill();
        // // midpointGfx.position.set(labelPosition.x - box.width/2, labelPosition.y - box.height/2);
        // midpointGfx.position.set(center.x, center.y)
        // midpointGfx.pivot.set(center.x, center.y)
        // shapeGfx.addChild(midpointGfx)



        labelGfx.position.set(center.x, center.y)
        labelGfx.pivot.set(box.width/2 , box.height/2)
        // labelGfx.pivot.set(center.x, center.y)
        // labelGfx.position.set(labelPosition.x - box.width/2, labelPosition.y - box.height/2);
        // labelGfx.pivot.set(0.5 , 0.5 )
        labelGfx.angle = this.calcLabelAngle(shapeGfx)


        // shapeGfx.pivot.set(labelPosition.x, labelPosition.y)


    //     const midpoint = labelPosition;
    //     const rectWidth = box.width
    //     const rectHeight = box.height
    //   this.shapeGfx.beginFill(0xFFFF00);
    //   this.shapeGfx.drawRect(midpoint.x - rectWidth / 2, midpoint.y - rectHeight / 2, rectWidth, rectHeight);
    //   this.shapeGfx.endFill();





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