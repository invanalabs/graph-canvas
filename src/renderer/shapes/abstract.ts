
import * as PIXI from 'pixi.js';
import { CanvasLink, CanvasNode } from '../../store';
import { IShapeState } from '../types';
import { ArtBoard } from '../../artBoard';


abstract class ShapeAbstractBase {

    abstract readonly originalData: CanvasLink | CanvasNode;
    /* latest state of data */
    abstract data: CanvasLink | CanvasNode;

    /* graphics */
    abstract containerGfx: PIXI.Graphics;
    abstract shapeGfx: PIXI.Graphics;
    abstract labelGfx: PIXI.Graphics | undefined

    // debug border
    abstract debugBorderGfx: PIXI.Graphics | undefined

    // to manage the state 
    // abstract state : IShapeState; // INodeStateTypes | ILinkStateTypes
    abstract setState(state: IShapeState, setNeighborsToo: boolean, event?: PIXI.FederatedPointerEvent): void

    /* this will  */
    abstract processData(data: CanvasLink | CanvasNode): CanvasLink | CanvasNode;

    // drawing
    abstract drawShape(): PIXI.Graphics | undefined;
    abstract drawLabel(): PIXI.Graphics | undefined;
    abstract draw(drawShape: boolean, drawLabel: boolean): void;
    abstract redraw(): void;

    // delete 
    abstract clear(): void;
    abstract destroy(): void;

    // events and triggers - REVISIT THIS 
    abstract setupInteractionTriggers(): void
    abstract removeInteractionTriggers(): void

    // :default
    abstract triggerDefault(event?: PIXI.FederatedPointerEvent): void

    // :highlighted
    abstract triggerHighlighted(event?: PIXI.FederatedPointerEvent, setNeighborsToo?:boolean): void
    abstract triggerUnHighlighted(event?: PIXI.FederatedPointerEvent, setNeighborsToo?: boolean): void

    // :selected
    abstract triggerSelected(event?: PIXI.FederatedPointerEvent): void
    abstract triggerUnSelected(event?: PIXI.FederatedPointerEvent): void

    // :inactive
    abstract triggerInactive(event?: PIXI.FederatedPointerEvent): void


    // :hidden
    // abstract triggerHidden(event?: PIXI.FederatedPointerEvent): void

    // layers - front, data, map 
    abstract moveToFrontLayer(): void
    abstract moveToDataLayer(): void
    // abstract moveToMapLayer(): void

}


export abstract class ShapeAbstract extends ShapeAbstractBase {

    originalData: CanvasNode | CanvasLink
    artBoard: ArtBoard
    containerGfx: PIXI.Graphics;

    declare debugBorderGfx: PIXI.Graphics | undefined


    // for state based graphics :hovered and :highlighted
    declare shapeHoveredGfx: PIXI.Graphics;
    declare shapeHighlightedGfx: PIXI.Graphics;


    constructor(data: CanvasNode | CanvasLink, artBoard: ArtBoard) {
        super()
        this.originalData = data
        this.artBoard = artBoard;
        this.containerGfx = new PIXI.Graphics()
        this.containerGfx.sortableChildren = true
        // this.containerGfx.interactive = true
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
        container.children.forEach((child) => {
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

    setState(stateName: IShapeState, setNeighborsToo: boolean = false, event?: PIXI.FederatedPointerEvent) {
        console.log("==setState", this.data.id, stateName, setNeighborsToo)
        if (this.data.state === stateName)
            return

        this.artBoard.canvas.dataStore.setState(this.data, stateName, setNeighborsToo, event)
        // this.state = stateName
    }




    drawDebugBorder(x: number, y: number) {
        // Calculate the bounding box
        console.log("===drawDebugBorder", this.data.id, x, y)
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
    abstract processData(data: CanvasNode): CanvasNode;

    // set position of node 
    abstract setPosition(x: number, y: number): void;

    // abstract triggerHoveredOnNeighbors(event?: PIXI.FederatedPointerEvent): void
    // abstract triggerUnHoveredOnNeighbors(event?: PIXI.FederatedPointerEvent): void

    // abstract triggerHighlightedOnNeighbors(event?: PIXI.FederatedPointerEvent): void
    // abstract triggerUnHighlightedOnNeighbors(event?: PIXI.FederatedPointerEvent): void




    // abstract onPointerIn(event : OnNodeGfxEventData): void
    // abstract onPointerOut(event : OnNodeGfxEventData): void
    // abstract onClicked(event : OnNodeGfxEventData): void
    // abstract onUnClicked(event : OnNodeGfxEventData): void
    // abstract onMoved(event : OnNodeGfxEventData): void


    abstract onDragStart(event?: PIXI.FederatedPointerEvent): void
    // abstract onDragMove(event?: PIXI.FederatedPointerEvent,  newPoint: PIXI.Point): void
    abstract onDragEnd(event?: PIXI.FederatedPointerEvent): void



    applyStateUpdate(setNeighborsToo: boolean = false, event?: PIXI.FederatedPointerEvent) {
        const stateName = this.data.state
        if (stateName === ":default") {
            // this.triggerUnHovered(event);
            this.triggerUnHighlighted(event, setNeighborsToo);
            this.triggerUnSelected(event)
            this.triggerDefault(event);

            // if (setNeighborsToo) {
            //     // this.triggerUnHoveredOnNeighbors(event)
            //     this.triggerUnHighlightedOnNeighbors(event)
            // }
        }
        // else if (stateName === ":hovered") {
        //     // this.triggerHovered(event)
        //     if (setNeighborsToo) {
        //         this.triggerHoveredOnNeighbors(event)
        //     }
        // }
        else if (stateName === ":selected") {
            this.triggerSelected(event)
        }

        else if (stateName === ":highlighted") {
            this.triggerHighlighted(event, setNeighborsToo)
            // if (setNeighborsToo) {
            //     this.triggerHighlightedOnNeighbors(event)
            // }
        }
        else if (stateName === ":inactive") {
            this.triggerInactive(event)
        }
        // else if (stateName === ":hidden") {
        //     this.triggerHidden(event)
        // }
    }

}


export abstract class LinkShapeAbstract extends ShapeAbstract {

    declare readonly originalData: CanvasLink;
    /* latest state of data */
    declare data: CanvasLink;

    // determines whether this is 
    // declare state: ILinkStateTypes

    /* this will  */
    abstract processData(data: CanvasLink): CanvasLink;

    // abstract triggerHoveredOnNeighbors(event?: PIXI.FederatedPointerEvent): void
    // abstract triggerUnHoveredOnNeighbors(event?: PIXI.FederatedPointerEvent): void

    // abstract triggerHighlightedOnNeighbors(event?: PIXI.FederatedPointerEvent): void
    // abstract triggerUnHighlightedOnNeighbors(event?: PIXI.FederatedPointerEvent): void



    // abstract onPointerIn(event : OnLinkGfxEventData): void
    // abstract onPointerOut(event : OnLinkGfxEventData): void
    // abstract onClicked(event : OnLinkGfxEventData): void
    // abstract onUnClicked(event : OnLinkGfxEventData): void
    // abstract onMoved(event : OnLinkGfxEventData): void


    drawPath(){
        
    }

    applyStateUpdate(setNeighborsToo: boolean = false, event?: PIXI.FederatedPointerEvent) {
        const stateName = this.data.state
        if (stateName === ":default") {
            // this.triggerUnHovered(event);
            this.triggerUnHighlighted(event, setNeighborsToo);
            this.triggerDefault(event);
            // if (setNeighborsToo) {
            //     // this.triggerUnHoveredOnNeighbors(event)
            //     this.triggerUnHighlightedOnNeighbors(event)
            // }
        }
        // else if (stateName === ":hovered") {
        //     this.triggerHovered(event)
        //     if (setNeighborsToo) {
        //         this.triggerHoveredOnNeighbors(event)
        //     }
        // }

        else if (stateName === ":highlighted") {
            this.triggerHighlighted(event, setNeighborsToo)
            // if (setNeighborsToo) {
            //     this.triggerHighlightedOnNeighbors(event)
            // }
        }
        else if (stateName === ":inactive") {
            this.triggerInactive(event)
        }
        // else if (stateName === ":hidden") {
        //     this.triggerHidden(event)
        // }
    }

}
