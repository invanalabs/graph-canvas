import { Viewport } from "pixi-viewport";
import { INode } from "../../graphCanvas/types";


interface ZoomToOptions {
    top: number,
    left: number,
    x: number,
    y: number
}
 

export default class Camera extends Viewport {


    worldScale = 3;

    // getDefaultZoomTo = () => {
    //     return  { 
    //         top: this.worldWidth / this.worldScale , 
    //         left: this.worldHeight / this.worldScale ,
    //         x: this.screenWidth,  y: this.screenHeight 
    //     };
    // }
    // pause: boolean = false;
 
    setUpCamera(){
        this
            .drag()
            .pinch({ percent: 1 }).wheel().decelerate()
            .clamp({direction:'all',underflow:'center'})// 
            .clampZoom({ 
                minWidth: this.screenWidth/4  ,
                minHeight:  this.screenHeight/4  ,
                maxWidth: this.worldWidth,
                maxHeight: this.worldHeight 
            })
    }

    setZoomTo = (zoomToOptions : ZoomToOptions) => {
        // this.zoomTo = zoomToOptions;
    }

    zoomToCoordinates = (zoomToOptions: ZoomToOptions) => {
        console.debug("zoomToCoordinates ", zoomToOptions);
        // this.viewport
    }

    zoomToScreen = (zoomToOptions: ZoomToOptions) => {
        console.debug("zoomToScreen ", zoomToOptions);
        // this.zoomTo = { 
        //     top: this.worldWidth / (this.worldScale * 2), 
        //     left: this.worldHeight / (this.worldScale * 2),
        //     x: this.screenWidth,  y: this.screenHeight 
        // };
    }
 
    zoomToWorld = ()=>{
        console.debug("zoomToWorld ");

        // zoomTo center
        // this.zoomTo()
    }

    fitNodesToScreen = (nodes: INode[])=> {
        console.debug("fitNodesToScreen", nodes)
    }
    
} 