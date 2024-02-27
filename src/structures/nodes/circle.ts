import * as PIXI from 'pixi.js';
import { INode } from '../../canvas/types';
import { BaseShape } from './base';


class Circle extends BaseShape {

    // @ts-ignore
    private container: PIXI.Container;
    // @ts-ignore
    private data: INode
    bgColor: string = '#ff00ff';
    radius: number = 20;

    drawLabel() {
        // Refer https://pixijs.com/examples/text/pixi-text
        const textStyle = new PIXI.TextStyle({
            fontSize: 12,
            fill: "#000",
            align: 'right'
            // wordWrap: true,
            // breakWords: true,
            // wordWrapWidth: (n.size || this.cfg.node.size) * 2
        });
        const nodeLabel = "My Label here";
        const text = new PIXI.Text(nodeLabel, textStyle);
        // text.anchor.set(0.5);
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

    draw(node: INode) {
        this.data = node;
        this.container = new PIXI.Container()
        this.container.cursor = 'pointer';
        this.container.position.set(node.x, node.y);
        // draw shape
        let shapeGfx = this.drawShape(); 
        this.container.addChild(shapeGfx);
        // draw label
        let labelGfx = this.drawLabel(); 
        this.container.addChild(labelGfx);
        // listeners for hover effect
        shapeGfx.on("pointerover", () => this.pointerOver(shapeGfx));
        shapeGfx.on("pointerout", () => this.pointerOut(shapeGfx));
        // listeners for dragging
        // this.container.on('pointerdown', this.onDragStart, this.container);
        // this.container.on('pointerup', stopDrag);
        return this.container;
    }

    update(node: INode) {
        this.container.position.set(node.x, node.y);
    }

    destroy() {
        this.container.destroy()
    }
}


export default Circle