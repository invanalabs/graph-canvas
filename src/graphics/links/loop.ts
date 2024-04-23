import * as PIXI from 'pixi.js';
import { LinkShapeBase } from '../base';
import { getAngle, getContactPointOnCircle, getContactPointFromCircle, getLinkLabelPosition, getControlPoint, getPointOnDistanceOverRadius, getGraphicsPathPoints } from '../utils';
import { LinkShapeTypes } from '../types';


class LoopLine extends LinkShapeBase {


    //@ts-ignore
    // point: PIXI.Point;
    //@ts-ignore
    curveType: LinkShapeTypes = 'straight'

    calcLabelPosition = (labelGfx: PIXI.Graphics, shapeGfx: PIXI.Graphics) => {
        const labelPosition = getLinkLabelPosition(this.data.source, this.data.target, this.curveType)
        labelGfx.angle = this.calcLabelAngle(labelGfx)
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
        // let point = getPointOnDistanceOverRadius(
        //     points,
        //     this.data.target.size || 20 
        //   );
        console.log("calcArrowAngle", arrow,  arrow._context._activePath.shapePath);
          const point = this.data.source;

          console.log("-=getPointOnDistanceOverRadius: point", point)
          // 二次修正坐标
          let p = getContactPointOnCircle(
            // point as any,
            this.data.source,
            this.data.target,
            this.data.target.size  
          );
          console.log("====p", p)
          arrow.position.set(p.x, p.y);
          arrow.rotation = Math.atan2(
            point!.y - this.data.target.y,
            point!.x - this.data.target.x
          );
    }

    calcStartAndEndPoints = () => {
        return {
            startPoint: new PIXI.Point(this.data.source.x, this.data.source.y),
            endPoint: new PIXI.Point(this.data.target.x, this.data.target.y)
        }
    
    }


    drawPath = (shapeLine: PIXI.Graphics, startPoint: PIXI.Point, endPoint: PIXI.Point) => {
        // loop.moveTo(0, 0);
        shapeLine.moveTo(0, 0);
        shapeLine.bezierCurveTo(-35, -80, 35, -80, 0, 0);

    }


}


export default LoopLine