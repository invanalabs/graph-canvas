// @ts-nocheck
// Create a Pixi Application
import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport';
    

const draw = () => {

    // Create a PIXI.Application 
    const app = new PIXI.Application({ width: 800, height: 600, antialias: true, backgroundColor: 0x555555 });
    document.body.appendChild(app.view);
    
    // Create a Viewport
    const viewport = new Viewport({
        screenWidth: 800,
        screenHeight: 600,
        worldWidth: 1000,
        worldHeight: 1000,
        events: app.renderer.events,
    });
    app.stage.addChild(viewport);
    
    // Function to create a draggable node
    function createNode(x: number, y: number) {
        const node = new PIXI.Graphics();
        node.beginFill(0xff0000);
        node.drawCircle(0, 0, 30);
        node.endFill();
        node.position.set(x, y);
        node.interactive = true; // Enable mouse/touch events
        node.buttonMode = true; // Show hand cursor on hover
    
        // Event listeners for dragging
        node.on('pointerdown', onDragStart)
            .on('pointerup', onDragEnd)
            .on('pointerupoutside', onDragEnd)
            .on('pointermove', onDragMove);
    
            // app.stage.addChild(node); // Add node to the viewport

            viewport.addChild(node); // Add node to the viewport
    }
    
    // Function to handle drag start
    function onDragStart(event: PIXI.InteractionEvent) {
        const node = event.currentTarget as PIXI.Graphics;
        node.data = event.data;
        node.dragging = true;
    }
    
    // Function to handle drag end
    function onDragEnd(event: PIXI.InteractionEvent) {
        const node = event.currentTarget as PIXI.Graphics;
        node.dragging = false;
        node.data = null;
    }
    
    // Function to handle drag move
    function onDragMove(event: PIXI.InteractionEvent) {
        const node = event.currentTarget as PIXI.Graphics;
        if (node.dragging) {
            const newPosition = node.data.getLocalPosition(node.parent);
            node.x = newPosition.x;
            node.y = newPosition.y;
        }
    }
    
    // Create draggable nodes
    createNode(100, 100);
    createNode(200, 200);
    createNode(300, 300);
}


export default draw;