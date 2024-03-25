import * as PIXI from 'pixi.js';
import { INode } from '../../../../../graphCanvas/types';
import BaseShape from '../base';
import Canvas from '../../..';


class Circle extends BaseShape {


    // @ts-ignore
    shapeData: INode
    color: string = '#ff00ff';
    size: number = 12;
    dragging: boolean = false;
    dragPoint : PIXI.Point ;

    constructor(canvas: Canvas) {
        super(canvas)
        // this.container.hitArea = new PIXI.Circle(0, 0, this.size);

    }


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
        shape.interactive = true; // Enable mouse/touch events
        // shape.buttonMode = true; // Show hand cursor on hover

        shape.cursor = "pointer";
        shape.eventMode = 'static';// this will allow it to respond to mouse and touch events 

        // make it a bit bigger, so it's easier to grab
        // shape.scale.set(3);
        shape.hitArea = new PIXI.Circle(0, 0, this.size);
        shape.endFill();
        return shape
    }

    pointerOver() { // shapeGfx: PIXI.Graphics
        // showTooltip(node);
        this.container.tint = 0x666666;
        // this.container.getChildAt[0].tint = 0x666666;

        // renderer.render(stage);
    }

    pointerOut() {// shapeGfx: PIXI.Graphics
        // hideTooltip();
        this.container.tint = 0xFFFFFF;
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

    // // Event handler for starting drag
    // onDragStart(event: PIXI.InteractionEvent) {
    //     console.log("===onDragStart", event)
    //     // disable the viewport’s panning while allowing sprite dragging.
    //     // this.canvas.camera.drag({ pressDrag: false });
    //     // this.data = event.data;
    //     // this.dragging = true;
    //     const node = event.currentTarget as PIXI.Graphics;
    //     node.data = event.data;
    //     node.dragging = true;
    // }

    // // Event handler for ending drag
    // onDragEnd(event: PIXI.InteractionEvent) {
    //     console.log("===onDragEnd", event.client.x, event)

    //     //  reactivate viewport panning when drag event is completed.
    //     this.canvas.camera.drag();

    //     const node = event.currentTarget as PIXI.Graphics;
    //     if (node.dragging) {
    //         // node.data = event.data;

    //         const newPosition = node.data.getLocalPosition(node.parent);
    //         node.x = newPosition.x;
    //         node.y = newPosition.y;
    //     }

    // }

    // // Event handler for dragging
    // onDragMove(event: PIXI.InteractionEvent,) {
    //     console.log("===onDragMove", event.client.x, event, event.parent, event.data)


    //     // if (dragTarget)
    //     // {
    //         // this.parent.toLocal(event.global, null, dragTarget.position);
    //     // }

    //     // this.canvas.stateCtrl.updateNodePosition(this.shapeData.id, event.client.x, event.client.y)
    //     // this.updatePosition( event.client.x, event.client.y)

    //   //  reactivate viewport panning when drag event is completed.
    //   this.canvas.camera.drag();


    //     if (this.dragging) {
    //     const newPosition = event.data.getLocalPosition(event.parent);
    //     console.log("===onDragMove newPosition",newPosition)

    //     this.x = newPosition.x;
    //     this.y = newPosition.y;

    //     // Update the edge when dragging
    //     // updateEdge();
    //     }
    // }


     onDragStart = (event: PIXI.InteractionEvent) => {
        event.stopPropagation();
        this.dragPoint = event.data.getLocalPosition(this.container.parent);
        this.dragPoint.x -= this.container.x;
        this.dragPoint.y -= this.container.y;
        this.container.parent.on("pointermove", this.onDragMove);
      };
      
      onDragMove = (event: PIXI.InteractionEvent) => {
        const newPoint = event.data.getLocalPosition(this.container.parent);
        const x = newPoint.x - this.dragPoint.x;
        const y = newPoint.y - this.dragPoint.y;

        // TODO - FIXME - next 2 lines are re-used
        this.canvas.stateCtrl.updateNodePosition(this.shapeData.id, x, y)
        this.updatePosition(x, y)
        

      };
      
      onDragEnd = (event: PIXI.InteractionEvent) => {
        event.stopPropagation();
        this.container.parent.off("pointermove", this.onDragMove);
      };

    // Function to update the edge (line) between nodes
    updateEdges() {
        // edgeGraphics.clear();
        // app.stage.addChild(edgeGraphics);

        // // Set line style for the edge
        // edgeGraphics.lineStyle(2, 0x000000);

        // // Move to the starting point
        // edgeGraphics.moveTo(node1.x, node1.y);

        // // Draw a line to the ending point
        // edgeGraphics.lineTo(node2.x, node2.y);
    }

    setupInteractions() {

        // Remove all listeners
        this.container.removeAllListeners();
        this.container.cursor = 'pointer';

        // listeners for hover effect
        this.container.on("pointerover", () => this.pointerOver());
        this.container.on("pointerout", () => this.pointerOut());

        this.container
            .on('pointerdown', this.onDragStart.bind(this))
            .on('pointerup', this.onDragEnd.bind(this))
            .on('pointerupoutside', this.onDragEnd.bind(this))
            // .on('pointermove', this.onDragMove.bind(this));


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
        console.debug('===Drawing  node', this.shapeData?.id, this.shapeData)
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


        this.setupInteractions()

  
        return this.container;
    }


    // update(node: INode) {
    //     this.container.position.set(node.x, node.y);
    // }


}


export default Circle