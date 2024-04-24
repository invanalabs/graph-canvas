import GraphCanvas from "../../canvas/canvas";
import { CanvasOptions } from "../../canvas/types";
import { CanvasLink, CanvasNode } from "../../graphics/types";

export const createCanvas = (nodes: CanvasNode[], links: CanvasLink[], canvasOptions: CanvasOptions) => {
    const html = document.createElement("div");
    html.style.height = "100vh";
    html.style.width = "100vw";
    if (!canvasOptions){
        canvasOptions = {}
    }
    canvasOptions.viewDiv = html
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