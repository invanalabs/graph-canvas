import GraphCanvas from "../../canvas/graph";
import { INode, ILink } from "../../canvas/types";
import * as PIXI from 'pixi.js';



export abstract class BaseShape {
    // app : PIXI.Application
    graphCanvas: GraphCanvas
    // @ts-ignore
    container: PIXI.Container; // shape and label saved in this container

    constructor(graphCanvas: GraphCanvas) {
        this.graphCanvas = graphCanvas;
        this.container = new PIXI.Container()
        console.log("======graphCanvas BaseShape", graphCanvas)

    }

    abstract draw(data: INode | ILink): PIXI.Container<PIXI.DisplayObject>;
    abstract redraw(): void;
    abstract update(data: INode | ILink): void;
    updatePosition(x: number, y:number){
        this.container.position.set(x, y);
        // this.redraw()
        // this.graphCanvas.app.render()
    }
}
  