
import { INode } from '../../canvas/types'; 
import CanvasCtrlBase from './base';
import type { CanvasShape } from './types';
import * as PIXI from "pixi.js";


export default class CanvasCtrl extends CanvasCtrlBase{
    // for drawing shapes


    // for debug
    debugBorder() {
        console.log("debugBorder triggered")
        const line = new PIXI.Graphics();
        // add the label also
        line.lineStyle(2, 0x1ab3eb).drawRect(0, 0, this.viewport.worldWidth, this.viewport.worldHeight);
        // line.drawRect(0,0, 120, 20)
        // line.te
        this.viewport.addChild(line);
    }

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


    // think of the zoomTo as a camera action

    zoomTo = () =>{

    }

    fitView() {
        console.log("==fitView", this.dataCtrl.nodes);
        this.debugBorder()
        this.fit(this.dataCtrl.nodes);
    }

    getCenter(nodes: INode[]){
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
        return new PIXI.Point(
            minX + graphWidth / 2,
            minY + graphHeight / 2
        ); 
    }

    fit(nodes: INode[], zoomLevel?: number){

        const graphCenter = this.getCenter(this.dataCtrl.nodes)
        this.viewport.moveCenter(graphCenter)
        this.viewport.setZoom(1, true);
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