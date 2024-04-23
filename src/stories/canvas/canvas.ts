import GraphCanvas from "../../canvas/canvas";
import { exampleLinks, exampleNodes } from "../datasets/hello-graph-canvas";


export const createCanvas = () => {

    const html = document.createElement("div");
    // html.style.height = "calc(100vh - 100px)";
    // html.style.width = "calc(100vw - 100px)";
    html.style.height = "600px";
    html.style.width = "800px";

    const canvas = new GraphCanvas({viewDiv: html});
    canvas.graph.add(exampleNodes, exampleLinks)
    // canvas.clear()
    return html
}