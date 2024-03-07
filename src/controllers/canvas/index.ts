
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
        line.lineStyle(2, 0x1ab3eb).drawRect(0, 0, this.camera.worldWidth, this.camera.worldHeight);
        // line.drawRect(0,0, 120, 20)
        // line.te
        this.camera.addChild(line);
    }

    setDebug = (debug_mode: boolean) => {  this.debug_mode = debug_mode; }
    debugOn = () => { this.debug_mode = true; }
    debugOff = () => { this.debug_mode = false; }


    addShape(shape: CanvasShape){
        // this will add the shape to the canvas
        this.camera.addChild(shape);
    }

    zoomIn = () => {
        this.camera.zoom(-this.camera.screenWidth / 10, true);
    };

    zoomOut = () => {
        this.camera.zoom(this.camera.screenWidth / 10, true);
    };

    zoomLevel = () => {
        
    }


    // think of the zoomTo as a camera action

    zoomTo = () =>{

    }

    fitView() {
        console.log("==fitView", this.dataCtrl.nodes);

        if (this.debug_mode){
            this.debugBorder()
        }
        this.fit(this.dataCtrl.nodes);
    }

    getCenter(nodes: INode[]){
        // // Zooms out so all or selected nodes fit on the canvas.  
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

    moveNodesToWorldCenter(nodes: INode[]){
        const {worldWidth, worldHeight} = this.camera;

        const minNodeX = Math.min(...nodes.map(nodeData => nodeData.x));
        const maxNodeX = Math.max(...nodes.map(nodeData => nodeData.x));
        const minNodeY = Math.min(...nodes.map(nodeData => nodeData.y));
        const maxNodeY = Math.max(...nodes.map(nodeData => nodeData.y));
        const graphWidth = Math.abs(maxNodeX - minNodeX);
        const graphHeight = Math.abs(maxNodeY - minNodeY);
        const WORLD_WIDTH = Math.max(worldWidth * 2, graphWidth * 1.1);
        const WORLD_HEIGHT = Math.max(worldHeight * 2, graphHeight * 1.1);
        nodes.forEach(nodeData => {
          nodeData.x = nodeData.x - minNodeX - graphWidth / 2 + WORLD_WIDTH / 2;
          nodeData.y = nodeData.y - minNodeY - graphHeight / 2 + WORLD_HEIGHT / 2;
        });
    }

    fit(nodes: INode[], zoomLevel?: number){

        // const graphCenter = this.getCenter(this.dataCtrl.nodes)
        // this.camera.moveCenter(graphCenter)
        this.moveNodesToWorldCenter(nodes);
        this.camera.setZoom(1, true);
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