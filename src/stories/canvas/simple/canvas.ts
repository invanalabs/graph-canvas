import GraphCanvas from "../../../canvas/canvas";
import { exampleLinks, exampleNodes } from "../data";


export const createCanvas = () => {

    const html = document.createElement("div");
    html.style.height = "calc(100vh - 100px)";
    html.style.width = "calc(100vw - 100px)";
    // html.style.background = "red";

    const canvas = new GraphCanvas({viewDiv: html});
    canvas.graph.add(exampleNodes, exampleLinks)
    // canvas.clear()
    return html
}