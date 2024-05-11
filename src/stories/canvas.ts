import GraphCanvas from "../canvas/canvas";
import { CanvasOptions } from "../canvas/types";
import { CanvasLink, CanvasNode } from "../graphics/types";
import D3ForceLayout from "./layouts/d3-force/layout";
import DagreLayout from "./layouts/dagre/layout";
// import * as PIXI from 'pixi.js';
// import { initDevtools } from '@pixi/devtools';


export const createCanvas = (
        nodes: CanvasNode[], 
        links: CanvasLink[], 
        canvasOptions: CanvasOptions,
        layout : null | 'd3-force' | 'dagre' = null
    ) => {
    const html = document.createElement("div");

    const canvasDiv = document.createElement("canvas");
    canvasDiv.style.height = '100vh';
    canvasDiv.style.width = '100vw';
    html.appendChild(canvasDiv)

    document.addEventListener("DOMContentLoaded", function (event) {
        console.log("=DOM is ready", event)

        if (!canvasOptions){
            canvasOptions = {
                viewDiv: canvasDiv
            }
        }
        canvasOptions.viewDiv = canvasDiv
        const canvas = new GraphCanvas(canvasOptions);
        canvas.graph.add(nodes, links)



        // initDevtools({
        //     app: canvas.pixiApp,
        //     // If you are not using a pixi app, you can pass the renderer and stage directly
        //     // renderer: myRenderer,
        //     // stage: myStage,
        // });


        // window.__PIXI_DEVTOOLS__ = {
        //     pixi: PIXI,
        //     app: canvas.pixiApp,
        //     // If you are not using a pixi app, you can pass the renderer and stage directly
        //     // renderer: myRenderer,
        //     // stage: myStage,
        //   };


        if (layout === 'd3-force'){
            const layoutInstance =  new D3ForceLayout(canvas);
            layoutInstance?.add2Layout(nodes, links);
        }
        else if (layout === 'dagre'){
            const layoutInstance =  new DagreLayout(canvas);
            layoutInstance?.add2Layout(nodes, links);
        }

        // canvas.camera.moveNodesToWorldCenter();
      
    
        

    }, false);
        

    return html
}



export const customCanvasOptions = {
    styles: {
        nodes: {
            Person: {
                size: 40
            } 
        }
    }
} 