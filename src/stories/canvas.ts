import GraphCanvas from "../canvas/canvas";
import { CanvasOptions } from "../canvas/types";
import { CanvasLink, CanvasNode } from "../graphics/types";
import D3ForceLayout from "./layouts/d3-force/layout";
// import D3HierarchyLayout from "./layouts/d3-hierarchy/layout";


export const createCanvas = (
        nodes: CanvasNode[], 
        links: CanvasLink[], 
        canvasOptions: CanvasOptions,
        layout : null | 'd3-force' | 'd3-hierarchy' = null
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

        if (layout === 'd3-force'){
            const layoutInstance =  new D3ForceLayout(canvas);
            layoutInstance?.add2Layout(nodes, links);
        }
        else if (layout === 'd3-hierarchy'){
            const layoutInstance =  new D3HierarchyLayout(canvas);
            layoutInstance?.add2Layout(nodes, links);
        }
    
        

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