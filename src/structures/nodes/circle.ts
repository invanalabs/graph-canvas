
import * as PIXI from 'pixi.js';
import { INode } from '../../canvas/types';

import { BaseShape } from './base';


class Circle extends BaseShape {

    // shape: PIXI.Graphics;
    // text: PIXI.Text;
    // @ts-ignore
    private container : PIXI.Container;
    // @ts-ignore
    private data : INode

    bgColor: string  = '#ff00ff';
    radius : number = 10;

    // constructor(node: any) {
    //     super(node);
    //     // this.data = node
    //     // this.container = this.draw(node)
 
    // }

    drawLabel(){
        const nodeLabel = "My Label here";
        const text = new PIXI.Text(nodeLabel, {
            fontSize: 12,
            fill: '#000'
        });
        text.anchor.set(0.5);
        text.resolution = 2;
        return text
    }

    drawShape(){
        let shape = new PIXI.Graphics();
        shape.lineStyle(1.5, 0xFFFFFF);
        shape.beginFill(this.bgColor)
        shape.drawCircle(0, 0, this.radius);
        shape.interactive = true;
        shape.hitArea = new PIXI.Circle(0, 0, this.radius);

        shape.endFill();
        return shape
    }

    draw(node: INode){        
        this.data = node;
        this.container = new PIXI.Container()
        this.container.addChild(this.drawShape());
        this.container.addChild(this.drawLabel());
        this.container.position.set(node.x, node.y);
        return this.container;
    }

    update(node: INode){
        this.container.position.set(node.x, node.y);
    }
 
    destroy(){
        this.container.destroy()
    }

}

export default Circle