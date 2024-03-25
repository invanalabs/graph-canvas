// @ts-nocheck
import * as PIXI from "pixi.js";


const draw = ()=> {
  

    const app = new PIXI.Application({ width: 800, height: 600, antialias: true, backgroundColor: 0xFFFFFF });
    document.body.appendChild(app.view);
    
    // Container for the draggable node
    const nodeContainer = new PIXI.Container();
    app.stage.addChild(nodeContainer);
    
    // Create a node
    const node = new PIXI.Graphics();
    node.beginFill(0xFF0000);
    node.drawCircle(0, 0, 20);
    node.endFill();
    node.interactive = true;
    node.buttonMode = true;
    
    // Add the node to the container
    nodeContainer.addChild(node);
    
    // Initial scale and position
    let scale = 1;
    let position = new PIXI.Point(0, 0);
    
    // Register the pointer events
    node
      .on('pointerdown', onDragStart)
      .on('pointerup', onDragEnd)
      .on('pointerupoutside', onDragEnd)
      .on('pointermove', onDragMove)
      .on('wheel', onZoom);
    
    function onDragStart(event) {
      this.data = event.data;
      this.dragging = true;
      this.dragPoint = this.data.getLocalPosition(this.parent);
    }
    
    function onDragEnd() {
      this.dragging = false;
      this.data = null;
    }
    
    function onDragMove() {
      if (this.dragging) {
        const newPosition = this.data.getLocalPosition(this.parent);
        const delta = new PIXI.Point(newPosition.x - this.dragPoint.x, newPosition.y - this.dragPoint.y);
    
        this.x += delta.x;
        this.y += delta.y;
    
        this.dragPoint = newPosition;
      }
    }
    
    function onZoom(event) {
      const delta = event.deltaY;
      const zoomSpeed = 0.1;
    
      scale += delta * zoomSpeed;
    
      // Limit the scale to a reasonable range
      scale = Math.min(Math.max(scale, 0.5), 2);
    
      // Set the new scale
      nodeContainer.scale.set(scale);
    
      // Update the position to keep the zoom centered around the pointer
      const newPosition = event.data.getLocalPosition(nodeContainer);
      const anchorX = (newPosition.x - position.x) / (scale - 1);
      const anchorY = (newPosition.y - position.y) / (scale - 1);
    
      nodeContainer.pivot.set(anchorX, anchorY);
      nodeContainer.position.set(position.x - anchorX * scale, position.y - anchorY * scale);
    }
    
    // Handle application resize
    window.addEventListener('resize', () => {
      app.renderer.resize(window.innerWidth, window.innerHeight);
    });
    
    // Add a sprite for the background or other elements
    // ...
    
    // Start the PIXI update loop
    app.ticker.add(() => {
      // Update any animations or additional logic here
    });


}





export default draw;