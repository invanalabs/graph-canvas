import Canvas from "../..";
import { INode, ILink } from "../../../../graphCanvas/types";
// import { AbstractShape } from "./abstract";
import * as PIXI from 'pixi.js';


 class BaseShape {
    
    // @ts-ignore
    shapeData: INode | ILink;
    // private shapeData: ILink| INode
    // app : PIXI.Application
    canvas: Canvas;
    // @ts-ignore
    container: PIXI.Container; // shape and label saved in this container

    constructor(canvas: Canvas) {
        // super();
        this.canvas = canvas;
        this.container = new PIXI.Container()
        // this.shapeData = shapeData;
        this.setupInteractions(this.container);

    }

    // setupInteractions = () => console.error("")

    // drawLabel =() => console.error("drawLabel not implemented");
    // drawShape =() => console.error("drawShape not implemented");
    // draw =() => console.error("draw not implemented");

    clear(){
        console.log("BaseShape.clear triggered")
        this.container.removeChildren();
    }

    redraw(){
        this.clear()
        this.draw(this.shapeData)
    }

    updatePosition(x: number, y:number){
        this.container.position.set(x, y);
        // this.redraw()
        // this.graphCanvas.app.render()
    }

    
    // setDimensions(width: number, height: number): void{
    //     /*
    //      set dimensions of the Node

    //     */
    //     this.shapeData.width =  this.size * 2;
    //     this.shapeData.height =  this.size * 2;
    // }

    // destroy() {
    //     this.container.destroy()
    // }
 

}
  
export default BaseShape;