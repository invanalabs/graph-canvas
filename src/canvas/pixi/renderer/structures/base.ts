import Canvas from "../..";
// import GraphCanvas from "../../../../graphCanvas";
import { INode, ILink } from "../../../../graphCanvas/types";
import * as PIXI from 'pixi.js';



export abstract class BaseShape {


    private data: ILink| INode


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
    abstract draw(data: INode | ILink): PIXI.Container<PIXI.DisplayObject>;
    
    redraw( ){
        if (!this.data){
            console.error("cannot call .redraw() method without calling .draw() first.")
        }
        this.container.removeChildren();
        this.draw(this.data)
    }

    abstract update(data: INode | ILink): void;

    updatePosition(x: number, y:number){
        this.container.position.set(x, y);
        // this.redraw()
        // this.graphCanvas.app.render()
    }
    
    destroy() {
        this.container.destroy()
    }
}
  