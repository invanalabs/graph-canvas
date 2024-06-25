
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
//     // :highlighted
//     abstract setHighlighted(): void
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
    declare borderGfx: PIXI.Graphics | undefined

  

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
    abstract removeInteractionTriggers():void

    abstract setState(state: INodeStateTypes| ILinkStateTypes, setNeighborsToo:boolean, event?: PIXI.FederatedPointerEvent ): void
    // :default
    abstract triggerDefault(event?: PIXI.FederatedPointerEvent): void
    // :hover
    abstract triggerHovered(event?: PIXI.FederatedPointerEvent): void
    abstract triggerHoveredOnNeighbors(event?: PIXI.FederatedPointerEvent): void

    abstract triggerUnHovered(event?: PIXI.FederatedPointerEvent): void
    abstract triggerUnHoveredOnNeighbors(event?: PIXI.FederatedPointerEvent): void

    // :highlighted
    abstract triggerHighlighted(event?: PIXI.FederatedPointerEvent): void
    abstract triggerHighlightedOnNeighbors(event?: PIXI.FederatedPointerEvent): void

    abstract triggerUnHighlighted(event?: PIXI.FederatedPointerEvent): void
    abstract triggerUnHighlightedOnNeighbors(event?: PIXI.FederatedPointerEvent): void

    // :inactive
    abstract triggerInactive(event?: PIXI.FederatedPointerEvent):void
    // :hidden
    abstract triggerHidden(event?: PIXI.FederatedPointerEvent):void


    // layers - front, data, map 
    abstract moveToFrontLayer(): void
    abstract moveToDataLayer(): void
    // abstract moveToMapLayer(): void


}





export abstract class ShapeAbstract extends ShapeAbstractBase {
    
    originalData: CanvasNode | CanvasLink
    artBoard: ArtBoard
    containerGfx: PIXI.Graphics;

    // for state based graphics :hovered and :highlighted
    declare shapeHoveredGfx : PIXI.Graphics;
    declare shapeHighlightedGfx : PIXI.Graphics;


    constructor(data: CanvasNode | CanvasLink, artBoard: ArtBoard) {
        super()
        this.originalData = data
        this.artBoard = artBoard;
        this.containerGfx = new PIXI.Graphics()
        this.containerGfx.interactive = true
        // Set the cursor style to 'pointer' when hovering over the sprite
        // this.containerGfx.cursor = 'pointer';
        // this.containerGfx.setAn
        // in v8; { isRenderGroup:true} // this containers transform is now handled on the GPU!
        // Make the containerGfx interactive...
        // this.containerGfx.cursor = 'pointer';
        // this.containerGfx.eventMode = 'static';
    }

    // Function to recursively set interactive and cursor properties on all children
    setInteractiveRecursive(container: PIXI.Graphics) {
        container.interactive = true;
        container.cursor = 'pointer';
        container.children.forEach((child ) => {
            this.setInteractiveRecursive(child as PIXI.Graphics);
        });
    }

    clear = () => {
        console.log("ShapeAbstract.clear triggered")
        this.containerGfx.removeChildren();
    }

    removeInteractionTriggers() {
        console.debug("===removeInteractionTriggers triggered on link", this.containerGfx)
        // Remove all listeners
        this.containerGfx.removeAllListeners();
    }

    setState(stateName: INodeStateTypes, setNeighborsToo: boolean = false, event?: PIXI.FederatedPointerEvent ){
        console.log("==setState",this.data.id, stateName, setNeighborsToo)

        if (this.data.state === stateName)
        return


        this.artBoard.canvas.dataStore.setState(this.data, stateName, setNeighborsToo, event)
        // this.state = stateName
    }

    applyStateUpdate( setNeighborsToo: boolean = false, event?: PIXI.FederatedPointerEvent){
        const stateName = this.data.state
        if (stateName === ":default"){
            this.triggerUnHovered(event);
            this.triggerUnHighlighted(event);
            this.triggerDefault(event);

            if (setNeighborsToo){
                this.triggerUnHoveredOnNeighbors(event)
                this.triggerUnHighlightedOnNeighbors(event)
            }
        }
        else if (stateName === ":hovered"){
            // this.clearStates();
            this.triggerHovered(event)
            if (setNeighborsToo){
                this.triggerHoveredOnNeighbors(event)
            }
        }
        else if (stateName === ":highlighted"){
            // this.clearStates();
            this.triggerHighlighted(event)
            if (setNeighborsToo){
                this.triggerHighlightedOnNeighbors(event)
            }
        }
        else if (stateName === ":inactive"){
            // this.clearStates();
            this.triggerInactive(event)
        }
        else if (stateName === ":hidden"){
            // this.clearStates();
            this.triggerHidden(event)
        }
    }




    drawDebugBorder(x: number, y: number){
        // Calculate the bounding box
        // console.log("===drawDebugBorder", this.data.id)
        // // const borderGfx = this.artBoard.viewport.getChildByName(NodeContainerChildNames.debugBorder)
        // if (this.borderGfx){
        //     // const position = this.containerGfx.getBounds();
        //     // const position = this.containerGfx.getLocalBounds()
        //     this.borderGfx.position.set(x,y)
        //     // this.borderGfx.position.set(
        //     //     this.containerGfx.position.x /2,
        //     //     this.containerGfx.position.y /2
        //     // )
        // }else{
        //     const bounds = this.containerGfx.getBounds();
        //     // const position = event ? event.data.getLocalPosition(): {x: bounds.x, y: bounds.y}
        //     // Draw a debug box around the bounding box
        //     this.borderGfx = new PIXI.Graphics();
        //     this.borderGfx.name = NodeContainerChildNames.debugBorder
        //     this.borderGfx.lineStyle(2, 0x00ff00);
        //     this.borderGfx.drawRect(bounds.x, bounds.y, bounds.width, bounds.height);
        //     this.borderGfx.endFill()
        //     this.artBoard.viewport.addChild(this.borderGfx);
        // }
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

    abstract triggerHoveredOnNeighbors(event?: PIXI.FederatedPointerEvent): void
    abstract triggerUnHoveredOnNeighbors(event?: PIXI.FederatedPointerEvent): void

    abstract triggerHighlightedOnNeighbors(event?: PIXI.FederatedPointerEvent): void
    abstract triggerUnHighlightedOnNeighbors(event?: PIXI.FederatedPointerEvent): void

    abstract onDragStart(event?: PIXI.FederatedPointerEvent): void
    // abstract onDragMove(event?: PIXI.FederatedPointerEvent,  newPoint: PIXI.Point): void
    abstract onDragEnd(event?: PIXI.FederatedPointerEvent): void

}


export abstract class LinkShapeAbstract extends ShapeAbstract {

    declare readonly originalData: CanvasLink;
    /* latest state of data */
    declare data: CanvasLink;

    // determines whether this is 
    // declare state: ILinkStateTypes

    /* this will  */
    abstract processData(data:  CanvasLink):  CanvasLink; 

    abstract triggerHoveredOnNeighbors(event?: PIXI.FederatedPointerEvent): void
    abstract triggerUnHoveredOnNeighbors(event?: PIXI.FederatedPointerEvent): void

    abstract triggerHighlightedOnNeighbors(event?: PIXI.FederatedPointerEvent): void
    abstract triggerUnHighlightedOnNeighbors(event?: PIXI.FederatedPointerEvent): void

}
