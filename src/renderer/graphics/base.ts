
import * as PIXI from 'pixi.js';
import { GraphCanvas } from '../../canvas';
import { CanvasLink, CanvasNode } from '../../store';
import { ILinkStateTypes, INodeStateTypes } from '../types';


abstract class Shape {

    abstract readonly originalData: CanvasLink | CanvasNode;
    /* latest state of data */
    abstract data: CanvasLink | CanvasNode;

    // determines whether this is 
    abstract state: INodeStateTypes | ILinkStateTypes

    /* graphics */
    abstract containerGfx: PIXI.Graphics;
    abstract labelGfx: PIXI.Graphics;
    abstract shapeGfx: PIXI.Graphics; 

    /* this will  */
    abstract processData(data: CanvasLink | CanvasNode): CanvasLink | CanvasNode; 

    // drawing
    abstract drawShape(): PIXI.Graphics;
    abstract drawLabel(): PIXI.Graphics;
    abstract draw(drawShape: boolean, drawLabel:boolean): void;
    abstract redraw(): void;

    // position
    abstract setPosition(x: number, y: number): void;

    // delete 
    abstract clear(): void;
    abstract destroy(): void;

    // events and triggers
    abstract setupInteractions(): void;

    // set States
    // :default
    abstract setDefault(): void
    // :hover
    abstract setHover(): void
    // abstract setUnHover(): void
    // :selected
    abstract setSelected(): void
    // abstract setUnSelected(): void
    // :inactive
    abstract setInactive():void
    // abstract unSetInactive(): void
    // :hidden
    abstract setHidden():void
    // abstract unSetHidden():void

    abstract setState
}


export abstract class BaseShape extends Shape {
    /*
        this is the base shapeName for the Shape and the LabelShape
    */
    originalData: CanvasLink | CanvasNode
    declare data: CanvasLink | CanvasNode;
    containerGfx: PIXI.Graphics;
    canvas: GraphCanvas
    declare labelGfx: PIXI.Graphics;
    declare shapeGfx: PIXI.Graphics; 
    declare shapeHoveredGfx : PIXI.Graphics;

    constructor(data: CanvasLink | CanvasNode, canvas: GraphCanvas) {
        super()
        this.originalData = data
        this.canvas = canvas;
        this.containerGfx = new PIXI.Graphics()
        // in v8; { isRenderGroup:true} // this containers transform is now handled on the GPU!
        // Make the containerGfx interactive...
        this.containerGfx.cursor = 'pointer';
        // this.containerGfx.eventMode = 'static';
    }

    processData = (data: CanvasLink | CanvasNode): CanvasLink | CanvasNode => {
         console.error("BaseShape.processData triggered but not implemented") 
         return data;
    }
    setupInteractions() { console.error("BaseShape.setupInteractions triggered") }
    pointerOver() { console.error("BaseShape.pointerOver not implemented") }
    pointerOut() { console.error("BaseShape.pointerOut not implemented") }

    moveToFrontLayer() { console.error("BaseShape.moveToFrontLayer not implemented") }
    moveToDataLayer() { console.error("BaseShape.moveToDataLayer not implemented") }


    drawLabel = (): PIXI.Graphics => {
        console.debug("BaseShape.drawLabel not defined")
        return new PIXI.Graphics()
    }

    drawShape = (): PIXI.Graphics => {
        console.error("BaseShape.drawShape not implemented")
        return new PIXI.Graphics()
    }

    draw(renderShape=true, renderLabel=true) {
        console.error("BaseShape.draw not implemented", renderShape, renderLabel)
    }

    redraw = (renderShape=true, renderLabel=true) => {
        console.log("redraw ")
        // this.clear();
        this.draw(renderShape, renderLabel);
    }

    clear = () => {
        console.log("BaseShape.clear triggered")
        this.containerGfx.removeChildren();
    }

    setGfxPosition = (x: number, y: number) => {
        this.containerGfx.position.set(x, y);
    }



    clearStates(){
        // if ()
        // this.setUnHover();
        // this.setUnSelected();
        // this.unSetInactive();
    }

    setState(stateName: INodeStateTypes | ILinkStateTypes){
        if (stateName === ":default"){
            this.clearStates();
        }
        else if (stateName === ":hovered"){
            this.clearStates();
            this.setHover()
        }
        else if (stateName === ":selected"){
            this.clearStates();
            this.setSelected()
        }
        else if (stateName === ":inactive"){
            this.clearStates();
            this.setInactive()
        }
        else if (stateName === ":hidden"){
            this.clearStates();
            this.setInactive()
        }
    }

}


export default BaseShape;