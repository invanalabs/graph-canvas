



export abstract class EventEmitterAbstractBase {

  abstract readonly originalData: CanvasLink | CanvasNode;
 
  /* this will  */
  abstract processData(data: CanvasLink | CanvasNode): CanvasLink | CanvasNode; 
 

}