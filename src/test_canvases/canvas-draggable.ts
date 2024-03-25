// @ts-nocheck
import * as PIXI from "pixi.js";



const draw = ( ) => {
   
    // Create a Pixi Application
const app = new PIXI.Application({ width: 800, height: 600, backgroundColor: 0xFFFFFF });
document.body.appendChild(app.view);

// Create a graphics object for the edge
const edgeGraphics = new PIXI.Graphics();
app.stage.addChild(edgeGraphics);

// Create a container for the nodes and edge
const nodesContainer = new PIXI.Container();
app.stage.addChild(nodesContainer);

// Draggable nodes
const node1 = createNode(50, 50, 0xFF0000);
const node2 = createNode(150, 150, 0x00FF00);

// Add nodes to the container
nodesContainer.addChild(node1);
nodesContainer.addChild(node2);

// Make nodes draggable
makeNodeDraggable(node1);
makeNodeDraggable(node2);

// Initial update of the edge
updateEdge();

// Function to create a draggable node
function createNode(x, y, color) {
    const node = new PIXI.Graphics();
    node.beginFill(color);
    node.drawCircle(0, 0, 20);
    node.endFill();
    node.x = x;
    node.y = y;
    // node.interactive = true;
    node.eventMode = 'auto';
    node.buttonMode = true;
    return node;
}

// Function to make a node draggable
function makeNodeDraggable(node) {
    node.draggable = true;

    node.on('dragmove', () => {
        console.log("dragmove triggered")

        updateEdge();
    });
}

// Function to update the edge (line) between nodes
function updateEdge() {
    console.log("updateEdge")
    edgeGraphics.clear();

    // Set line style for the edge
    edgeGraphics.lineStyle(2, 0x000000);

    // Move to the starting point
    edgeGraphics.moveTo(node1.x, node1.y);

    // Draw a line to the ending point
    edgeGraphics.lineTo(node2.x, node2.y);
}
}


export default draw;