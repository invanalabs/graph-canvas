import GraphCanvas from "../canvas";
import { ICanvasOptions } from "../canvas/types";


export const createCanvas = (
) => {
  const html = document.createElement("div");

  const canvasDiv = document.createElement("canvas");
  canvasDiv.style.height = '100vh';
  canvasDiv.style.width = '100vw';
  // canvasDiv.style.background = "#444"
  html.appendChild(canvasDiv)

  document.addEventListener("DOMContentLoaded", function (event) {
    console.log("=DOM is ready", event,)
    const canvasOptions: ICanvasOptions = {
      viewElement: canvasDiv,
      debugMode: true
    }
    const canvas = new GraphCanvas(canvasOptions);
    canvas.draw()

    // canvas.graph.add(nodes, links)
    // canvas.camera.fitView();
    // canvas.camera.moveNodesToWorldCenter();
  }, false);
  return html
}



export const customICanvasOptions = {
  styles: {
    nodes: {
      Person: {
        size: 40
      }
    }
  }
} 