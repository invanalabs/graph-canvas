import GraphCanvas from "../../canvas/canvas";
import { CanvasOptions } from "../../canvas/types";
import { CanvasLink, CanvasNode } from "../../graphics/types";

export const createCanvas = (nodes: CanvasNode[], links: CanvasLink[], canvasOptions: CanvasOptions) => {
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