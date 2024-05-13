import { Viewport } from "pixi-viewport";
import { CanvasNode } from "../graphics/types";
import { getCenter } from "./utils";
import { CameraOptions, ZoomToOptions } from "./types";
import GraphCanvas from "../canvas/canvas";
import { Point } from "pixi.js";
import { defaultCameraOptions } from "./defaults";

export default class Camera {

    readonly worldScale = 3;
    readonly options: CameraOptions;
    readonly zoomPercentage = 0.05

    viewport : Viewport;
    canvas: GraphCanvas

    constructor(options: CameraOptions){
        this.options = {...options, ...defaultCameraOptions};
        console.log("camera options, ", this.options)
        this.canvas = this.options.canvas;
        this.viewport = this.canvas.viewport
    }

    fitView(selectedNodes: CanvasNode[] = [], zoomLevel?: number) {
        console.log("==fitView", selectedNodes, zoomLevel);
        if (selectedNodes.length == 0 ){
            selectedNodes = this.canvas.graph.getNodes()
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
        this.viewport.zoom(-this.viewport.worldWidth * this.zoomPercentage, true);
      };

    zoomOut = () => {
        this.viewport.zoom(this.viewport.worldWidth * this.zoomPercentage, true);
    };
      
    resetViewport = () => {
        this.viewport.center = new Point(this.viewport.worldWidth / 2, this.viewport.worldHeight / 2);
        this.viewport.fitWorld(true);
    };
 

} 