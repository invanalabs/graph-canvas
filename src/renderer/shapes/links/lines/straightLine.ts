import * as PIXI from 'pixi.js';
import { getAngle, getCenterOfRectangle, getContactPointFromCircle, getContactPointOnCircle, getLinkLabelPosition } from '../utils';
import { LinkContainerChildNames } from '../../constants';
import drawStraightLineShape from '../../../primitives/links/straightLine';
import drawArrowTriangleShape from '../../../primitives/arrows/arrowTriangle';
import { LinkShapeAbstract } from '../../abstract';
import { CanvasLink } from '../../../../store';
import { ArtBoard } from '../../../../artBoard';
import { ILinkShapeStyles } from '../../types';
import drawLabelShape from '../../../primitives/label';


class StraightLine extends LinkShapeAbstract {

    curveType: ILinkShapeStyles = 'straight'

    constructor(data: CanvasLink, artBoard: ArtBoard) {
        super(data, artBoard)
        this.calcStartAndEndPoints();
    }

    drawLabel = () => {
        console.debug("Line.drawLabel")
        if (this.data.label) {
          const labelGfx = drawLabelShape({ label: this.data.label, ...this.data.style.label }, this.artBoard.canvas.options.resolution?.labels)
          labelGfx.label = LinkContainerChildNames.label
        //   labelGfx.visible = this.data.isLabelVisible
    
    
          this.containerGfx.addChild(labelGfx)
          return labelGfx
        }
        //  else {
        //   return new PIXI.Graphics()
        // }
      }

    drawShape = () => {
        console.debug("Line.drawShape triggered", this.data)
        const shapeGfx = new PIXI.Graphics({ isRenderGroup: true })
        shapeGfx.label = LinkContainerChildNames.shapeName

        const { startPoint, endPoint } = this.calcStartAndEndPoints();
        // const startPoint = this.sourcePoint
        // const endPoint = this.targetPoint
        // draw path
        const shapeLine = drawStraightLineShape({ startPoint, endPoint, ...this.data.style.shape })
        shapeLine.label = LinkContainerChildNames.shapeLine

        drawArrowTriangleShape({ startPoint, endPoint, ...this.data.style.shape }, 10, shapeLine)
        shapeGfx.addChild(shapeLine)

        // shapeName hoveredBorder
        const shapeHighlightedBorder = drawStraightLineShape({ startPoint, endPoint, ...this.data.style.states[':highlighted'].shape })
        shapeHighlightedBorder.label = LinkContainerChildNames.shapeHighlightedBorder
        shapeHighlightedBorder.visible = false
        drawArrowTriangleShape({ startPoint, endPoint, ...this.data.style.states[':highlighted'].shape }, 12, shapeHighlightedBorder)
        shapeGfx.addChild(shapeHighlightedBorder)

        // shapeName hoveredBorder
        const shapeSelectedBorder = drawStraightLineShape({ startPoint, endPoint, ...this.data.style.states[':selected'].shape })
        shapeSelectedBorder.label = LinkContainerChildNames.shapeSelectedBorder
        shapeSelectedBorder.visible = false
        drawArrowTriangleShape({ startPoint, endPoint, ...this.data.style.states[':selected'].shape }, 12, shapeSelectedBorder)
        shapeGfx.addChild(shapeSelectedBorder)


        return shapeGfx
    }



    calcLabelPosition = () => {
        // console.log("calcLabelPosition===", this.data.source.x, this.data.source.y, this.data.target.x, this.data.target.y)

        if (this.labelGfx) {
            const labelPosition = getLinkLabelPosition(this.data.source, this.data.target, this.curveType)
            const box = this.labelGfx.getBounds()
            const center = getCenterOfRectangle(box.width, box.height, labelPosition.x - box.width / 2, labelPosition.y - box.height / 2)
            this.labelGfx.position.set(center.x, center.y)
            this.labelGfx.pivot.set(box.width / 2, box.height / 2)
            this.labelGfx.angle = this.calcLabelAngle()
        }

    }

    calcLabelAngle = () => {
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
        const arrowPadding = 0;
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
        this.sourcePoint = startPoint
        this.targetPoint = endPoint
        return { startPoint, endPoint }

    }

    // drawPath = (shapeLine: PIXI.Graphics, startPoint: PIXI.Point, endPoint: PIXI.Point) => {
    //     shapeLine.moveTo(startPoint.x, startPoint.y);
    //     shapeLine.lineTo(endPoint.x, endPoint.y);

    // }
}


export default StraightLine