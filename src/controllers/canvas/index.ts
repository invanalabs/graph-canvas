
import { INode } from '../../canvas/types'; 
import CanvasCtrlBase from './base';
import type { CanvasShape } from './types';
import * as PIXI from "pixi.js";


export default class CanvasCtrl extends CanvasCtrlBase{
    // for drawing shapes

    addShape(shape: CanvasShape){
        // this will add the shape to the canvas
        this.viewport.addChild(shape);
    }

    zoomIn = () => {
        this.viewport.zoom(-this.viewportSettings.screenWidth / 10, true);
    };

    zoomOut = () => {
        this.viewport.zoom(this.viewportSettings.screenWidth / 10, true);
    };

    zoomLevel = () => {
        
    }
 
    fitView() {
        console.log("==fitView", this.dataCtrl.nodes);
        this.fit(this.dataCtrl.nodes);
    }

    fit(nodes: INode[], zoomLevel?: number){
        // Zooms out so all or selected nodes fit on the canvas.  
        const nodesX = nodes.map((node: INode) => node.x);
        const nodesY = nodes.map((node: INode) => node.y);

        // @ts-ignore
        const minX = Math.min(...nodesX);
        // @ts-ignore
        const maxX = Math.max(...nodesX);
        // @ts-ignore
        const minY = Math.min(...nodesY);
        // @ts-ignore
        const maxY = Math.max(...nodesY);

        const graphWidth = Math.abs(maxX - minX);
        const graphHeight = Math.abs(maxY - minY);
        const graphCenter = new PIXI.Point(
            minX + graphWidth / 2,
            minY + graphHeight / 2
        ); 
        this.viewport.setZoom(1, true);
        this.viewport.moveCenter(graphCenter)
    }

    focusNode(node: INode, zoomLevel?: number){
        // focus on the Node
        this.moveToPosition(node.x, node.y)
    }

    getViewPosition(){
        
    }

    moveToPosition(x: number, y: number){
        // pass
    }
}