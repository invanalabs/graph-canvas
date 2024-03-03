import { Viewport } from "pixi-viewport";
import { INode } from "../../canvas/types";


interface ZoomToOptions {
    top: number,
    left: number,
    x: number,
    y: number
}
 

export default class Camera extends Viewport {


    worldScale = 2;

    getDefaultZoomTo = () => {
        return  { 
            top: this.worldWidth / this.worldScale , 
            left: this.worldHeight / this.worldScale ,
            x: this.screenWidth,  y: this.screenHeight 
        };
    }

 
    setUpCamera(){
        this
            .drag().pinch({ percent: 1 }).wheel().decelerate()
            .clampZoom({ 
                minWidth: this.screenWidth / 4,
                minHeight:  this.screenHeight / 4,
                maxWidth: this.worldWidth *2 ,
                maxHeight: this.worldHeight * 2 
            });
 
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