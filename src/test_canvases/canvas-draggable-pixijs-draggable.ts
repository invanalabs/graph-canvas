// @ts-nocheck
import * as PIXI from 'pixi.js';



const draw = () => {

    
    // Create a Pixi Application
const app = new PIXI.Application({ width: 1800, height: 900, antialias: true, backgroundColor: 0xFFFFFF });
document.body.appendChild(app.view);

// Create a container for the nodes
const nodesContainer = new PIXI.Container();
app.stage.addChild(nodesContainer);

// Draggable nodes
const node1 = createNode(50, 50, 0xFF0000);
const node2 = createNode(150, 150, 0x00FF00);



const edgeGraphics = new PIXI.Graphics();


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
    return node;
}

// Function to make a node draggable
function makeNodeDraggable(node) {
    node.interactive = true;
    node.buttonMode = true;

    node
        .on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onDragMove);
}

// Event handler for starting drag
function onDragStart(event) {
    this.data = event.data;
    this.dragging = true;
}

// Event handler for ending drag
function onDragEnd() {
    this.dragging = false;
    this.data = null;
}

// Event handler for dragging
function onDragMove() {
    if (this.dragging) {
        const newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x;
        this.y = newPosition.y;

        // Update the edge when dragging
        updateEdge();
    }
}


// Function to update the edge (line) between nodes
function updateEdge() {
    edgeGraphics.clear();
    app.stage.addChild(edgeGraphics);

    // Set line style for the edge
    edgeGraphics.lineStyle(2, 0x000000);

    // Move to the starting point
    edgeGraphics.moveTo(node1.x, node1.y);

    // Draw a line to the ending point
    edgeGraphics.lineTo(node2.x, node2.y);
}
}

export default draw