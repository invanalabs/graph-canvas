// @ts-nocheck
import * as PIXI from "pixi.js";


const draw = ()=> {
    // Create a Pixi Application
const app = new PIXI.Application({ width: 800, height: 600, antialias: true, backgroundColor: 0xFFFFFF });
document.body.appendChild(app.view);

// Function to create a node with a border
function createNode(x, y, radius, fillColor, borderColor) {
    const node = new PIXI.Graphics();

    // Draw the node
    node.beginFill(fillColor);
    node.drawCircle(0, 0, radius);
    node.endFill();

    // Draw the border
    node.lineStyle(2, borderColor);
    node.drawCircle(0, 0, radius);

    // Set initial position
    node.x = x;
    node.y = y;

    // Make the node interactive
    node.interactive = true;
    node.buttonMode = true;

    // Set up event listeners for hover effects
    node.on('pointerover', onNodeHover.bind(null, node, borderColor));
    node.on('pointerout', onNodeOut.bind(null, node, borderColor));

    return node;
}

// Create nodes with borders
const node1 = createNode(100, 100, 30, 0xFF0000, 0x000000);
const node2 = createNode(200, 200, 30, 0x00FF00, 0x000000);

// Add nodes to the stage
app.stage.addChild(node1);
app.stage.addChild(node2);

// Function to handle node hover
function onNodeHover(node, borderColor) {
    node.clear();
    
    // Draw the node with an active state (different fill color)
    node.beginFill(0xCCCCCC); // Set the active fill color
    node.drawCircle(0, 0, 30);
    node.endFill();
    
    // Draw the border
    node.lineStyle(5, borderColor);
    node.drawCircle(0, 0, 30);
}

// Function to handle node mouseout
function onNodeOut(node, borderColor) {
    node.clear();
    
    // Draw the node with the original fill color
    node.beginFill(node.tint); // Use the original fill color
    node.drawCircle(0, 0, 30);
    node.endFill();
    
    // Draw the border
    node.lineStyle(2, borderColor);
    node.drawCircle(0, 0, 30);
}
}





export default draw;