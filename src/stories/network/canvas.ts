import GraphCanvas from "../../canvas/canvas";
import { CanvasLink, CanvasNode } from "../../graphics/types";

export const createCanvas = (nodes: CanvasNode[], links: CanvasLink[]) => {

    const html = document.createElement("div");
    html.style.height = "calc(100vh - 100px)";
    html.style.width = "calc(100vw - 100px)";
    // html.style.height = "600px";
    // html.style.width = "800px";

    const canvas = new GraphCanvas({viewDiv: html});
    canvas.graph.add(nodes, links)
    // canvas.clear()
    return html
}