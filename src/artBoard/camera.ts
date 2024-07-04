import { Viewport } from "pixi-viewport";
import { Point } from "pixi.js";
import { ArtBoard } from "./artBoard";
import { getCenter } from "./utils/center";
import { CanvasNode } from "../store";

export class Camera {

 
    readonly zoomPercentage = 0.15
    viewport: Viewport
    artBoard : ArtBoard

    constructor(artBoard: ArtBoard){
        this.artBoard = artBoard
        // this.canvas = this.options.canvas;
        this.viewport = this.artBoard.viewport
    }

    fitView(selectedNodes: CanvasNode[] = [], zoomLevel?: number) {
        console.log("==fitView", selectedNodes, zoomLevel);
        if (selectedNodes.length == 0 ){
            selectedNodes = this.artBoard.canvas.dataStore.getNodes()
        }
        const { center, graphHeight, graphWidth } = getCenter(selectedNodes)
        this.viewport.moveCenter(center)
        const padding = 100;
        this.viewport.fit(true, graphWidth + padding, graphHeight + padding)
 
    }

    setZoomLevel = (zoomLevel: number) =>{
        console.log("==setZoomLevel", zoomLevel)
        this.viewport.setZoom(zoomLevel , true);
    }
    
    zoomIn = () => {
        this.viewport.zoomPercent(this.zoomPercentage, true)

        console.log(`zoomIn now at ${this.viewport.scaled}`)
    };

    zoomOut = () => {
        this.viewport.zoomPercent(-this.zoomPercentage, true)
        console.log(`zoomOut now at ${this.viewport.scaled}`)
    };

    setZoom = (zoomScale: number) =>{
        /* e.g., 1 would be 100%, 0.25 would be 25%  */
        this.viewport.setZoom(zoomScale)
        // this.viewport.
    }
      
    resetViewport = () => {
        this.viewport.center = new Point(this.viewport.worldWidth / 2, this.viewport.worldHeight / 2);
        this.viewport.fitWorld(true);
    };
 

} 