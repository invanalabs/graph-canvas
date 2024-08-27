// import * as PIXI from 'pixi.js';
// import { LinkShapeBase } from '../base';
// import { getAngle, getCenterOfRectangle, getContactPointFromCircle,
//      getContactPointOnCircle, getLinkLabelPosition } from '../utils';
// import { LinkContainerChildNames } from '../../constants';
// import drawArrowTriangleShape from '../../../primitives/arrows/arrowTriangle';
// import curvedLineShape from '../../../primitives/links/curvedLine';
// // import { createDebugPoint } from '../../utils';


// class BezierCurvedLine extends LinkShapeBase{

//     drawShape = () => {
//         console.debug("Line.drawShape triggered", this.data)
    
//         const { startPoint, endPoint } = this.calcStartAndEndPoints();
//         this.shapeGfx.removeChildren();
//         this.shapeGfx.name = LinkContainerChildNames.shapeName
    
//         // draw path
//         const shapeLine = curvedLineShape({ startPoint, endPoint, ...this.data.style.shape })
//         shapeLine.name = LinkContainerChildNames.shapeLine
    
//         drawArrowTriangleShape({ startPoint, endPoint, ...this.data.style.shape }, 10, shapeLine)
//         this.shapeGfx.addChild(shapeLine)
    
//         // shapeName hoveredBorder
//         const shapeHighlightedBorder = curvedLineShape({ startPoint, endPoint, ...this.data.style.states[':highlighted'].shape })
//         drawArrowTriangleShape({ startPoint, endPoint, ...this.data.style.states[':highlighted'].shape }, 12, shapeHighlightedBorder)
//         shapeHighlightedBorder.name = LinkContainerChildNames.shapeHighlightedBorder
//         shapeHighlightedBorder.visible = false
//         this.shapeGfx.addChild(shapeHighlightedBorder)
    
    
//         return this.shapeGfx
//       }

//     //@ts-ignore
//     curveType: ILinkShapeTypes = 'straight'

//     calcLabelPosition = (labelGfx: PIXI.Graphics, shapeGfx: PIXI.Graphics) => {
//         // console.log("calcLabelPosition===", this.data.source.x, this.data.source.y, this.data.target.x, this.data.target.y)
//         const labelPosition = getLinkLabelPosition(this.data.source, this.data.target, this.curveType)
//         const box = labelGfx.getBounds()
//         // labelGfx.position.set(labelPosition.x , labelPosition.y );
//         const center = getCenterOfRectangle(box.width, box.height, labelPosition.x - box.width/2, labelPosition.y - box.height/2)

//         // const debugGfx = createDebugPoint("#ff00ff", 1)
//         // debugGfx.x = labelPosition.x
//         // debugGfx.y = labelPosition.y
//         // shapeGfx.addChild(debugGfx)


//         // const debugGfx2 = createDebugPoint('#ff0000', 3)
//         // debugGfx2.x = center.x
//         // debugGfx2.y = center.y
//         // shapeGfx.addChild(debugGfx2)

//         labelGfx.position.set(center.x, center.y)
//         labelGfx.pivot.set(box.width/2, box.height/2)
//         labelGfx.angle = this.calcLabelAngle(shapeGfx)
//     }

//     calcLabelAngle =(shapeGfx: PIXI.Graphics) => {
//         let angle = getAngle(this.data.source, this.data.target);
//         if (angle > 90 || angle < -90) {
//           angle = angle + 180;
//         }
//         return angle
//     }

//     // calcArrowAngle = (arrow: PIXI.Graphics, startPoint: PIXI.Point, endPoint: PIXI.Point,  points: number[], ) => {
//     //     arrow.rotation = Math.atan2(
//     //         startPoint.y - endPoint.y,
//     //         startPoint.x - endPoint.x
//     //     );
//     //     arrow.position.set(endPoint.x, endPoint.y);
//     // }

//     calcStartAndEndPoints = () => {
//             // line color and thickness
//             // console.log("calcStartAndEndPoints", JSON.stringify(this.data))
//         console.debug("====calcStartAndEndPoints", this.data, this)
//         const arrowPadding = 3; 
//         const endPoint = getContactPointOnCircle(
//             this.data.source,
//             this.data.target,
//             arrowPadding
//         );
//         const startPoint = getContactPointFromCircle(
//             this.data.source,
//             this.data.target,
//             arrowPadding
//         );
//         return {startPoint, endPoint}
    
//     }

//     // drawPath = (shapeLine: PIXI.Graphics, startPoint: PIXI.Point, endPoint: PIXI.Point) => {
//     //     shapeLine.moveTo(startPoint.x, startPoint.y);
//     //     shapeLine.lineTo(endPoint.x, endPoint.y);

//     // }
// }


// export default BezierCurvedLine