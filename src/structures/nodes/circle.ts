import * as PIXI from 'pixi.js';
import { INode } from '../../canvas/types';
import { BaseShape } from './base';
import GraphCanvas from '../../canvas/graph';


class Circle extends BaseShape {


    // @ts-ignore
    private data: INode
    bgColor: string = '#ff00ff';
    radius: number = 24;

    constructor(graphCanvas: GraphCanvas){
        super(graphCanvas)
        console.log("======graphCanvas", graphCanvas)
    }

    drawLabel() {
        // Refer https://pixijs.com/examples/text/pixi-text
        const textStyle = new PIXI.TextStyle({
            fontSize: 12,
            fill: "#fff",
            align: 'right'
            // wordWrap: true,
            // breakWords: true,
            // wordWrapWidth: (n.size || this.cfg.node.size) * 2
        });
        const nodeLabel = `Node ${this.data.id} - (${this.container.position.x}, ${this.container.position.y}`;
        const text = new PIXI.Text(nodeLabel, textStyle);
        text.interactive = true;
        text.cursor = "pointer";

        text.anchor.set(0.5);
        text.resolution = 2;
        return text
    }

    drawShape() {
        let shape = new PIXI.Graphics();
        shape.lineStyle(3, 0xFFFFFF);
        shape.beginFill(this.bgColor)
        shape.drawCircle(0, 0, this.radius);
        shape.interactive = true;
        shape.cursor = "pointer";
        shape.eventMode = 'static';// this will allow it to respond to mouse and touch events 
        // make it a bit bigger, so it's easier to grab
        // shape.scale.set(3);
        shape.hitArea = new PIXI.Circle(0, 0, this.radius);
        shape.endFill();
        return shape
    }

    pointerOver(shapeGfx: PIXI.Graphics) {
        // showTooltip(node);
        shapeGfx.tint = 0x666666;
        // renderer.render(stage);
    }

    pointerOut(shapeGfx: PIXI.Graphics) {
        // hideTooltip();
        shapeGfx.tint = 0xFFFFFF;
        // renderer.render(stage);
    }
 
    //  onDragStart(event: PIXI.FederatedPointerEvent)  {
    //     // store a reference to the data
    //     // the reason for this is because of multitouch
    //     // we want to track the movement of this particular touch
    //     console.log("onDragStart event", event)
 
    //     this.graphCanvas.app.stage.on('pointermove',  this.graphCanvas.onDragMove.bind(this));
    // }


    draw(node: INode) {
        this.data = node;
        
        this.container.cursor = 'pointer';
        // this.container.position.set(node.x, node.y);
        if (node.x && node.y){
            this.updatePosition(node.x, node.y)
        }
        // draw shape
        let shapeGfx = this.drawShape(); 
        this.container.addChild(shapeGfx);
        // draw label
        let labelGfx = this.drawLabel(); 
        this.container.addChild(labelGfx);
        // listeners for hover effect
        this.container.on("pointerover", () => this.pointerOver(shapeGfx));
        this.container.on("pointerout", () => this.pointerOut(shapeGfx));
        // listeners for dragging
        // on click
        // this.container.on('pointerdown', this.onDragStart.bind(this));
        // // this.container.on('mousedown', this.onDragStart.bind(this));
        // // on release 
        // // this.container.on('mouseup', this.graphCanvas.onDragEnd.bind(this));
        // this.container.on('pointerup', this.graphCanvas.onDragEnd.bind(this));
        // this.container.on('pointerupoutside', this.graphCanvas.onDragEnd.bind(this));
        // this.container.on('pointerout', this.graphCanvas.onDragEnd.bind(this));

        
        // this.container.on('pointerup', stopDrag);
        return this.container;
    }
    
    redraw( ){
        this.container.removeChildren();
        this.draw(this.data)
    }

    update(node: INode) {
        this.container.position.set(node.x, node.y);
    }

    destroy() {
        this.container.destroy()
    }
}


export default Circle