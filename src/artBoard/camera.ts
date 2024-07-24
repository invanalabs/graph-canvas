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
        this.artBoard.canvas.dataStore.updateMessage("zoomed to fit all the nodes")

    }

    setZoomLevel = (zoomLevel: number) =>{
        console.log("==setZoomLevel", zoomLevel)
        this.setZoom(zoomLevel , true);
        this.artBoard.showLabelsBasedOnZoom(zoomLevel)
        this.artBoard.canvas.dataStore.updateMessage(`Zoomed to ${Math.ceil(this.viewport.scaled * 100)}%`)

    }
    
    zoomIn = () => {
        this.viewport.zoomPercent(this.zoomPercentage, true)
        // console.log(`zoomIn now at ${this.viewport.scaled}`)
        this.artBoard.showLabelsBasedOnZoom(this.viewport.scaled)
        this.artBoard.canvas.dataStore.updateMessage(`Zoomed in to ${Math.ceil(this.viewport.scaled * 100)}%`)

    };

    zoomOut = () => {
        this.viewport.zoomPercent(-this.zoomPercentage, true)
        // console.log(`zoomOut now at ${this.viewport.scaled}`)
        this.artBoard.showLabelsBasedOnZoom(this.viewport.scaled)

        this.artBoard.canvas.dataStore.updateMessage(`Zoomed out to ${Math.ceil(this.viewport.scaled * 100)}%`)
    };

    private setZoom = (zoomScale: number, center: true) =>{
        /* e.g., 1 would be 100%, 0.25 would be 25%  */
        this.viewport.setZoom(zoomScale, center)
        // this.viewport.
    }
      
    resetViewport = () => {
        this.viewport.center = new Point(this.viewport.worldWidth / 2, this.viewport.worldHeight / 2);
        this.viewport.fitWorld(true);
    };
 

} 