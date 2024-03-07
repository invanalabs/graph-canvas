// @ts-nocheck
import * as PIXI from "pixi.js";



const draw = ( ) => {
    // Create a Pixi Application
    const app = new PIXI.Application({ width: 800,  height: 600, backgroundColor: 0xFFFFFF });
    document.body.appendChild(app.view);

    // Create a graphics object
    const graphics = new PIXI.Graphics();
    app.stage.addChild(graphics);

    // Draggable nodes
    const node1 = new PIXI.Graphics();
    node1.beginFill(0xFF0000);
    node1.drawCircle(0, 0, 20);
    node1.endFill();
    node1.x = 50;
    node1.y = 50;
    node1.interactive = true;
    // node1.buttonMode = true;

    const node2 = new PIXI.Graphics();
    node2.beginFill(0x00FF00);
    node2.drawCircle(0, 0, 20);
    node2.endFill();
    node2.x = 150;
    node2.y = 150;
    node2.interactive = true;
    // node2.buttonMode = true;

    // Add nodes to the stage
    app.stage.addChild(node1);
    app.stage.addChild(node2);

    // Make nodes draggable
    // node1.draggable();
    // node2.draggable();

    // Draw arrow initially
    drawArrow(node1.x, node1.y, node2.x, node2.y);

    // Update arrow on drag
    node1.on('dragmove', updateArrow);
    node2.on('dragmove', updateArrow);

    function updateArrow() {
        drawArrow(node1.x, node1.y, node2.x, node2.y);
    }

    // Function to draw arrow between two nodes
    function drawArrow(startX: number, startY: number, endX: number, endY: number) {
        // Clear previous graphics
        graphics.clear();

        // Set line style for the arrow
        graphics.lineStyle(2, 0x000000);

        // Move to starting point
        graphics.moveTo(startX, startY);

        // Draw a line to the ending point
        graphics.lineTo(endX, endY);

        // Calculate the angle of the arrow
        const angle = Math.atan2(endY - startY, endX - startX);

        // Calculate the position of the rounded end
        const roundedEndX = endX - 15 * Math.cos(angle);
        const roundedEndY = endY - 15 * Math.sin(angle);

        // Draw a rounded end
        graphics.arc(roundedEndX, roundedEndY, 15, 0, Math.PI * 2);

        // Draw an arrowhead (triangle)
        graphics.beginFill(0x000000);
        graphics.moveTo(endX, endY);
        graphics.lineTo(endX - 10 * Math.cos(angle - Math.PI / 6), endY - 10 * Math.sin(angle - Math.PI / 6));
        graphics.lineTo(endX - 10 * Math.cos(angle + Math.PI / 6), endY - 10 * Math.sin(angle + Math.PI / 6));
        graphics.endFill();
    }
}


export default draw;