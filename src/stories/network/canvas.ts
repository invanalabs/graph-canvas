import GraphCanvas from "../../canvas/canvas";
import { CanvasLink, CanvasNode } from "../../graphics/types";

export const createCanvas = (nodes: CanvasNode[], links: CanvasLink[]) => {

    const html = document.createElement("div");
    html.style.height = "100vh";
    html.style.width = "100vw";
    // html.style.height = "600px";
    // html.style.width = "800px";

    const canvas = new GraphCanvas({viewDiv: html});
    canvas.graph.add(nodes, links)
    // canvas.clear()
    return html
}