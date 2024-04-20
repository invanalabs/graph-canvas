import * as PIXI from 'pixi.js';
import { LinkShapeBase } from '../base';
import { getAngle, getContactPointOnCircle, getContactPointFromCircle, getLinkLabelPosition } from '../utils';
import { LinkShapeTypes } from '../types';
import { LinkContainerChildNames } from '../constants';
import { LinkStyleDefaults } from '../defaults';


class Line extends LinkShapeBase {

    color: string =  '#ff0000';
    thickness: number = 2
    //@ts-ignore
    // point: PIXI.Point;
    //@ts-ignore
    curveType: LinkShapeTypes = 'straight'

    calcLabelPosition = (labelGfx: PIXI.Graphics) => {
        const labelPosition = getLinkLabelPosition(this.data.source, this.data.target, this.curveType)
        labelGfx.angle = this.getTextAngle()
        labelGfx.position.set(labelPosition.x, labelPosition.y);

    }


    getTextAngle =() => {
        let angle = getAngle(this.data.source, this.data.target);
        if (angle > 90 || angle < -90) {
          angle = angle + 180;
        }
        return angle
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


        let shape = new PIXI.Graphics();
        shape.label = LinkContainerChildNames.shape


        let shapeLine = new PIXI.Graphics();
        shapeLine.label = LinkContainerChildNames.shapeLine

        // console.log("targetContactPoint", targetContactPoint)
        shapeLine.moveTo(sourceContactPoint.x, sourceContactPoint.y);
        shapeLine.lineTo(targetContactPoint.x, targetContactPoint.y);
        shapeLine.stroke({width: this.thickness, color: this.color});
        shapeLine.zIndex = 1000
        // add arrow
        const arrow = this.drawArrow(targetContactPoint)
        shapeLine.addChild(arrow)
        shape.addChild(shapeLine)

        // shape hoveredBorder
        const shapeHoveredBorder = new PIXI.Graphics();
        shapeHoveredBorder.moveTo(sourceContactPoint.x, sourceContactPoint.y);
        shapeHoveredBorder.lineTo(targetContactPoint.x, targetContactPoint.y);
        shapeHoveredBorder.stroke({ 
            width: LinkStyleDefaults[':hovered'].shape.thickness,
            color: LinkStyleDefaults[':hovered'].shape.color
        });
        shapeHoveredBorder.alpha = LinkStyleDefaults[':hovered'].shape.opacity;
        shapeHoveredBorder.visible = false
        shapeHoveredBorder.label = LinkContainerChildNames.shapeHoveredBorder
        shapeHoveredBorder.zIndex = 10
        shape.addChild(shapeHoveredBorder)
        // shapeLine.closePath()

        return shape
    }

}


export default Line