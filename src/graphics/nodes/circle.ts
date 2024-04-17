import * as PIXI from 'pixi.js';
import { NodeShapeBase } from '../base';


class Circle extends NodeShapeBase {

    color: string =  '#ff00ff';
    size: number = 20
  
    // constructor(data: CanvasNode){
    //     super(data)
    // }





    // setupInteractions() {

    //     // Remove all listeners
    //     this.gfxContainer.removeAllListeners();
    //     this.gfxContainer.cursor = 'pointer';

    //     // listeners for hover effect
    //     this.gfxContainer.on("pointerover", () => this.pointerOver());
    //     this.gfxContainer.on("pointerout", () => this.pointerOut());

    //     // this.gfxContainer
    //     //     .on('pointerdown', this.onDragStart.bind(this))
    //     //     .on('pointerup', this.onDragEnd.bind(this))
    //     //     .on('pointerupoutside', this.onDragEnd.bind(this))
    //         // .on('pointermove', this.onDragMove.bind(this));


    //     // listeners for dragging
    //     // on click
    //     // this.gfxContainer.on('pointerdown', this.onDragStart.bind(this));
    //     // // this.gfxContainer.on('mousedown', this.onDragStart.bind(this));
    //     // // on release 
    //     // // this.gfxContainer.on('mouseup', this.graphCanvas.onDragEnd.bind(this));
    //     // this.gfxContainer.on('pointerup', this.graphCanvas.onDragEnd.bind(this));
    //     // this.gfxContainer.on('pointerupoutside', this.graphCanvas.onDragEnd.bind(this));
    //     // this.gfxContainer.on('pointerout', this.graphCanvas.onDragEnd.bind(this));


    //     // this.gfxContainer.on('pointerup', stopDrag);
    // }

    drawShape = () => {
        console.debug("Circle.drawShape triggered")
        let shape = new PIXI.Graphics();
        shape.circle(0, 0, this.size);
        shape.fill(this.color, 1);
        shape.stroke({ width: 2, color: 0xfeeb77 });

        
        shape.cursor = "pointer";
        shape.eventMode = 'static';// this will allow it to respond to mouse and touch events 

        // make it a bit bigger, so it's easier to grab
        // shape.scale.set(3);
        // shape.hitArea = new PIXI.Circle(0, 0, this.size);
        // shape.endFill();
        return shape
    }

}


export default Circle