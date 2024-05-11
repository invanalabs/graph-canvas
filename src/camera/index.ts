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
    readonly zoomPercentage = 0.1

    viewport : Viewport;
    canvas: GraphCanvas

    constructor(options: CameraOptions){
        this.options = {...options, ...defaultCameraOptions};
        console.log("camera options, ", this.options)
        this.canvas = this.options.canvas;
        this.viewport = new Viewport({
            events: this.options.canvas.pixiApp.renderer.events, 
            screenWidth : this.options.screenWidth,
            screenHeight: this.options.screenHeight,
            worldWidth : this.options.worldWidth,
            worldHeight: this.options.worldHeight
        })

        this.options.canvas.pixiApp.stage.addChild(this.viewport)
        this.setUpCamera();

    }
 
    setUpCamera() {
        this.viewport
            .drag()
            .pinch({ percent: 1 })
            .wheel()
            .decelerate()
            // .clamp({ direction: 'all', underflow: 'center' })// 
            .clampZoom({
                minWidth: this.options.screenWidth / 5,
                minHeight: this.options.screenHeight / 5,
                maxWidth: this.options.worldWidth,
                maxHeight: this.options.worldHeight
            })
    }

    
    fitView(selectedNodes: CanvasNode[] = [], zoomLevel?: number) {
        console.log("==fitView", selectedNodes, zoomLevel);
        if (selectedNodes.length == 0 ){
            selectedNodes = this.canvas.graph.getNodes()
        }
        const { center, graphHeight, graphWidth } = getCenter(selectedNodes)
        this.viewport.moveCenter(center)
        this.viewport.fit(true, graphWidth, graphHeight)
        // this.viewport.zoom(graphWidth, true)
        // this.viewport.toScreen(graphWidth, graphHeight)
        // this.viewport.toScreen(graphWidth, graphHeight)
        // this.moveNodesToWorldCenter(nodes);
        // this.setZoom(1, true);
    }

    setZoomTo = (zoomToOptions : ZoomToOptions) => {
        // this.zoomTo = zoomToOptions;

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