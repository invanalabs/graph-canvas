import GraphCanvas from "../../canvas/canvas";
import { CanvasOptions } from "../../canvas/types";
import { CanvasLink, CanvasNode } from "../../graphics/types";

export const createCanvas = (nodes: CanvasNode[], links: CanvasLink[], canvasOptions: CanvasOptions) => {
    const html = document.createElement("div");

    const canvasDiv = document.createElement("canvas");
    canvasDiv.style.height = 'calc("100vh" - 100px)';
    canvasDiv.style.width = 'calc("100vw" - 100px)';
    html.appendChild(canvasDiv)

    ///
        
    if (!canvasOptions){
        canvasOptions = {}
    }
    canvasOptions.viewDiv = canvasDiv
    const canvas = new GraphCanvas(canvasOptions);
    canvas.graph.add(nodes, links)

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