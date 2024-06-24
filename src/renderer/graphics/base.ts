
import * as PIXI from 'pixi.js';
import { CanvasLink, CanvasNode } from '../../store';
import { ILinkStateTypes, INodeStateTypes } from '../types';
import { ArtBoard } from '../../artBoard';


// abstract class ShapeStateManagerAbstract {

//     // determines whether this is 
//     abstract stateName: INodeStateTypes | ILinkStateTypes

//     abstract setState(stateName: INodeStateTypes| ILinkStateTypes): void
//     // :default
//     abstract setDefault(): void
//     // :hover
//     abstract settHovered(): void
//     // :selected
//     abstract setSelected(): void
//     // :inactive
//     abstract setInactive():void
//     // :hidden
//     abstract setHidden():void
// }


abstract class ShapeAbstractBase {

    abstract readonly originalData: CanvasLink | CanvasNode;
    /* latest state of data */
    abstract data: CanvasLink | CanvasNode;
    // abstract state : INodeStateTypes | ILinkStateTypes

    /* graphics */
    abstract containerGfx: PIXI.Graphics;
    declare labelGfx: PIXI.Graphics | undefined
    declare shapeGfx: PIXI.Graphics | undefined;
  

    /* this will  */
    abstract processData(data: CanvasLink | CanvasNode): CanvasLink | CanvasNode; 

    // drawing
    abstract drawShape(): PIXI.Graphics  | undefined;
    abstract drawLabel(): PIXI.Graphics  | undefined;
    abstract draw(drawShape: boolean, drawLabel:boolean): void;
    abstract redraw(): void;


    // delete 
    abstract clear(): void;
    abstract destroy(): void;

    // events and triggers
    abstract setupInteractionTriggers(): void;
    abstract setState(state: INodeStateTypes| ILinkStateTypes, setNeighborsToo:boolean ): void
    // :default
    abstract triggerDefault(): void
    // :hover
    abstract triggerHovered(): void
    abstract triggerHoveredOnNeighbors(): void

    abstract triggerUnHovered(): void
    abstract triggerUnHoveredOnNeighbors(): void

    // :selected
    abstract triggerSelected(): void
    abstract triggerSelectedOnNeighbors(): void

    abstract triggerUnSelected(): void
    abstract triggerUnSelectedOnNeighbors(): void

    // :inactive
    abstract triggerInactive():void
    // :hidden
    abstract triggerHidden():void


    // layers - front, data, map 
    abstract moveToFrontLayer(): void
    abstract moveToDataLayer(): void
    // abstract moveToMapLayer(): void


}





export abstract class ShapeAbstract extends ShapeAbstractBase {
    
    originalData: CanvasNode | CanvasLink
    artBoard: ArtBoard
    containerGfx: PIXI.Graphics;

    // for state based graphics :hovered and :selected
    declare shapeHoveredGfx : PIXI.Graphics;
    declare shapeSelectedGfx : PIXI.Graphics;


    constructor(data: CanvasNode | CanvasLink, artBoard: ArtBoard) {
        super()
        this.originalData = data
        this.artBoard = artBoard;
        this.containerGfx = new PIXI.Graphics()
        this.containerGfx.interactive = true
        // in v8; { isRenderGroup:true} // this containers transform is now handled on the GPU!
        // Make the containerGfx interactive...
        // this.containerGfx.cursor = 'pointer';
        // this.containerGfx.eventMode = 'static';
    }

    clear = () => {
        console.log("ShapeAbstract.clear triggered")
        this.containerGfx.removeChildren();
    }


    setState(stateName: INodeStateTypes, setNeighborsToo: boolean = false ){
        console.log("setState",this.data.id, stateName, setNeighborsToo)

        if (this.data.state === stateName)
        return

        this.artBoard.canvas.dataStore.setState(this.data, stateName, setNeighborsToo)
        // this.state = stateName
    }

    applyStateUpdate( setNeighborsToo: boolean = false){
        const stateName = this.data.state
        if (stateName === ":default"){
            this.triggerUnHovered();
            this.triggerUnSelected();
            this.triggerDefault();

            if (setNeighborsToo){
                this.triggerUnHoveredOnNeighbors()
                this.triggerUnSelectedOnNeighbors()
            }
        }
        else if (stateName === ":hovered"){
            // this.clearStates();
            this.triggerHovered()
            if (setNeighborsToo){
                this.triggerHoveredOnNeighbors()
            }
        }
        else if (stateName === ":selected"){
            // this.clearStates();
            this.triggerSelected()
            if (setNeighborsToo){
                this.triggerSelectedOnNeighbors()
            }
        }
        else if (stateName === ":inactive"){
            // this.clearStates();
            this.triggerInactive()
        }
        else if (stateName === ":hidden"){
            // this.clearStates();
            this.triggerHidden()
        }
    }

}


export abstract class NodeShapeAbstract extends ShapeAbstract {

    declare readonly originalData: CanvasNode;
    /* latest state of data */
    declare data: CanvasNode;

    // // determines whether this is 
    // declare state: INodeStateTypes

    /* this will  */
    abstract processData(data:  CanvasNode):  CanvasNode; 

    // set position of node 
    abstract setPosition(x: number, y: number): void;

    abstract triggerHoveredOnNeighbors(): void
    abstract triggerUnHoveredOnNeighbors(): void

    abstract triggerSelectedOnNeighbors(): void
    abstract triggerUnSelectedOnNeighbors(): void

    abstract onDragStart(event: PIXI.FederatedPointerEvent): void
    // abstract onDragMove(event: PIXI.FederatedPointerEvent,  newPoint: PIXI.Point): void
    abstract onDragEnd(event: PIXI.FederatedPointerEvent): void




}


export abstract class LinkShapeAbstract extends ShapeAbstract {

    declare readonly originalData: CanvasLink;
    /* latest state of data */
    declare data: CanvasLink;

    // determines whether this is 
    // declare state: ILinkStateTypes

    /* this will  */
    abstract processData(data:  CanvasLink):  CanvasLink; 


    abstract triggerHoveredOnNeighbors(): void
    abstract triggerUnHoveredOnNeighbors(): void

    abstract triggerSelectedOnNeighbors(): void
    abstract triggerUnSelectedOnNeighbors(): void





}
