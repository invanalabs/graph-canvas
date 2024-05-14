
import * as PIXI from 'pixi.js';
import { CanvasLink, CanvasNode } from './types';
import GraphCanvas from '../canvas/canvas';
import { LinkStateTypesList, NodeStateTypesList } from '../canvas/types';


abstract class Shape {
    abstract readonly originalData: CanvasLink | CanvasNode;
    abstract data: CanvasLink | CanvasNode;
    // abstract state: "hovered" | "selected" | ;
    abstract gfxContainer: PIXI.Graphics;
    abstract labelGfx: PIXI.Graphics;
    abstract shapeGfx: PIXI.Graphics; 

    /* this wil  */
    abstract processData(data: CanvasLink | CanvasNode): CanvasLink | CanvasNode; 
    abstract setupInteractions(): void;
    abstract pointerOver(): void;
    abstract pointerOut(): void;

    abstract draw(drawShape: boolean, drawLabel:boolean): void;
    abstract drawShape(): PIXI.Graphics;
    abstract redraw(): void;

    abstract clear(): void;
    // abstract destroy(): void;
    abstract setGfxPosition(x: number, y: number): void;
}

export class BaseShape extends Shape {
    /*
        this is the base shape for the Shape and the LabelShape
    */
    originalData: CanvasLink | CanvasNode
    declare data: CanvasLink | CanvasNode;
    gfxContainer: PIXI.Graphics;
    canvas: GraphCanvas
    declare labelGfx: PIXI.Graphics;
    declare shapeGfx: PIXI.Graphics; 
    declare shapeHoveredGfx : PIXI.Graphics;

    constructor(data: CanvasLink | CanvasNode, canvas: GraphCanvas) {
        super()
        this.originalData = data
        this.canvas = canvas;
        this.gfxContainer = new PIXI.Graphics()
        // in v8; { isRenderGroup:true} // this containers transform is now handled on the GPU!
        // Make the gfxContainer interactive...
        this.gfxContainer.cursor = 'pointer';
        // this.gfxContainer.eventMode = 'static';
    }

    processData = (data: CanvasLink | CanvasNode): CanvasLink | CanvasNode => {
         console.error("BaseShape.processData triggered but not implemented") 
         return data;
    }
    setupInteractions() { console.error("BaseShape.setupInteractions triggered") }
    pointerOver() { console.error("BaseShape.pointerOver not implemented") }
    pointerOut() { console.error("BaseShape.pointerOut not implemented") }


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
        this.gfxContainer.removeChildren();
    }

    setGfxPosition = (x: number, y: number) => {
        this.gfxContainer.position.set(x, y);
    }

    clearStates(){
        this.setUnHover();
        this.setUnSelected();
        this.unSetInactive();
    }

    setState(stateName: NodeStateTypesList | LinkStateTypesList){
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
    }

}


export default BaseShape;