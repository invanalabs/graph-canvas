import * as PIXI from 'pixi.js';
import { INode } from '../../../../../graphCanvas/types';
import BaseShape from '../base';
import Canvas from '../../..';


class Circle extends BaseShape {


    // @ts-ignore
    shapeData: INode
    color: string = '#ff00ff';
    size: number = 16;

    // constructor(canvas: Canvas, shapeData: INode){
    //     super(canvas, shapeData)
    // }

    
    drawLabel() {
        
        const labelContainer = new PIXI.Graphics();
        // Refer https://pixijs.com/examples/text/pixi-text
        const textStyle = new PIXI.TextStyle({
            fontSize: 12,
            fill: 0xffffff, // Text color
            // align: 'right',
            wordWrap: true,
            breakWords: true,
            // wordWrapWidth: (n.size || this.cfg.node.size) * 2
        });
        // const positionX = Math.round(this.container.position.x);
        // const positionY = Math.round(this.container.position.y)
        const nodeLabel = `${this.shapeData.label}`;// - (${positionX}, ${positionY}`;
        const text = new PIXI.Text(nodeLabel, textStyle);
        // text.interactive = true;
        // text.cursor = "pointer";
        // text.anchor.set(0.5);
        text.resolution = 2;
            // Get the size of the text box
            const textBounds = text.getBounds();

            // Create a PIXI.Graphics object for the background
            const background = new PIXI.Graphics();
            background.beginFill(0x000000); // Background color
            background.drawRect(0, 0, textBounds.width, textBounds.height); // Draw rectangle behind the text
            background.endFill();

        labelContainer.addChild(background)
        labelContainer.addChild(text)

        // Position text relative to background
        text.position.set(background.x, background.y);

        return labelContainer
    }

    drawShape() {
        let shape = new PIXI.Graphics();
        shape.lineStyle(3, 0xFFFFFF);
        shape.beginFill(this.color)
        shape.drawCircle(0, 0, this.size);
        shape.interactive = true;
        shape.cursor = "pointer";
        shape.eventMode = 'static';// this will allow it to respond to mouse and touch events 
        // make it a bit bigger, so it's easier to grab
        // shape.scale.set(3);
        shape.hitArea = new PIXI.Circle(0, 0, this.size);
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

    // updateSize(size: number){
    //     this.size = size;
    //     this.node.width =  this.size * 2;
    //     this.node.height =  this.size;
    // }


    setupInteractions(shapeGfx: PIXI.Container) {
        this.container.cursor = 'pointer';

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
    }

    draw(shapeData: INode) {
        this.shapeData = shapeData
        this.clear();
        console.debug('===Drawing  node', this.shapeData?.id,  this.shapeData)
        this.shapeData.size = this.size;
        // this.container.position.set(node.x, node.y);
        if (this.shapeData.x && this.shapeData.y) {
            this.updatePosition(this.shapeData.x, this.shapeData.y)
        }
        // draw shape
        let shapeGfx = this.drawShape();
        this.container.addChild(shapeGfx);
        // draw label
        let labelGfx = this.drawLabel();
        this.container.addChild(labelGfx);

      

        return this.container;
    }


    // update(node: INode) {
    //     this.container.position.set(node.x, node.y);
    // }


}


export default Circle