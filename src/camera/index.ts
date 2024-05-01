import { Viewport } from "pixi-viewport";
import { CanvasNode } from "../graphics/types";
import { getCenter } from "./utils";
import { CameraOptions } from "./types";
import GraphCanvas from "../canvas/canvas";


export default class Camera {


    worldScale = 3;
    viewport : Viewport;
    readonly options: CameraOptions;
    canvas: GraphCanvas

    constructor(options: CameraOptions){
        this.options = options;
        this.canvas = options.canvas;
        this.viewport = new Viewport({
            events: options.canvas.pixiApp.renderer.events, 
            screenWidth : options.screenWidth,
            screenHeight: options.screenHeight,
            worldWidth : options.worldWidth,
            worldHeight: options.worldHeight
        })

        this.options.canvas.pixiApp.stage.addChild(this.viewport)
        this.setUpCamera();

    }

    // getDefaultZoomTo = () => {
    //     return  { 
    //         top: this.worldWidth / this.worldScale , 
    //         left: this.worldHeight / this.worldScale ,
    //         x: this.screenWidth,  y: this.screenHeight 
    //     };
    // }
    // pause: boolean = false;

    setUpCamera() {
        this.viewport
            .drag()
            .pinch({ percent: 1 }).wheel().decelerate()
            .clamp({ direction: 'all', underflow: 'center' })// 
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
        const { center } = getCenter(selectedNodes)
        this.viewport.moveCenter(center)
        // this.moveNodesToWorldCenter(nodes);
        // this.setZoom(1, true);
    }


    // setZoomTo = (zoomToOptions : ZoomToOptions) => {
    //     // this.zoomTo = zoomToOptions;
    // }

    // zoomToCoordinates = (zoomToOptions: ZoomToOptions) => {
    //     console.debug("zoomToCoordinates ", zoomToOptions);
    //     // this.viewport
    // }

    // zoomToScreen = (zoomToOptions: ZoomToOptions) => {
    //     console.debug("zoomToScreen ", zoomToOptions);
    //     // this.zoomTo = { 
    //     //     top: this.worldWidth / (this.worldScale * 2), 
    //     //     left: this.worldHeight / (this.worldScale * 2),
    //     //     x: this.screenWidth,  y: this.screenHeight 
    //     // };
    // }

    // zoomToWorld = ()=>{
    //     console.debug("zoomToWorld ");

    //     // zoomTo center
    //     // this.zoomTo()
    // }

    // fitNodesToScreen = (nodes: CanvasNode[])=> {
    //     console.debug("fitNodesToScreen", nodes)
    // }

} 