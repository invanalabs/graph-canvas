import { GraphCanvas } from "../../canvas";
import { CanvasLink, CanvasNode } from "../graph";




export abstract class EventEmitterAbstractBase {

  abstract readonly canvas: GraphCanvas;
 
  /* this will  */
  abstract processData(data: CanvasLink | CanvasNode): CanvasLink | CanvasNode; 
 

}