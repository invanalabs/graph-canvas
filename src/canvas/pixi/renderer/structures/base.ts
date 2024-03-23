import Canvas from "../..";
// import GraphCanvas from "../../../../graphCanvas";
import { INode, ILink } from "../../../../graphCanvas/types";
import * as PIXI from 'pixi.js';



export abstract class BaseShape {


    private shapeData: ILink| INode


    // app : PIXI.Application
    canvas: Canvas;
    // @ts-ignore
    container: PIXI.Container; // shape and label saved in this container

    constructor(canvas: Canvas) {
        this.canvas = canvas;
        this.container = new PIXI.Container()
    }

    abstract drawLabel(): void;
    abstract drawShape(): void;
    setDimensions(width: number, height: number): void{
        /*
         set dimensions of the Node

        */
        this.shapeData.width =  this.size * 2;
        this.shapeData.height =  this.size * 2;
    }
    abstract draw(shapeData: INode | ILink): PIXI.Container<PIXI.DisplayObject>;
    
    redraw( ){
        if (!this.shapeData){
            console.error("cannot call .redraw() method without calling .draw() first.")
        }
        this.container.removeChildren();
        this.draw(this.shapeData)
    }

    abstract update(shapeData: INode | ILink): void;

    updatePosition(x: number, y:number){
        this.container.position.set(x, y);
        // this.redraw()
        // this.graphCanvas.app.render()
    }
    
    destroy() {
        this.container.destroy()
    }
}
  