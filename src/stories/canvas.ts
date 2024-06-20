import { GraphCanvas, ICanvasOptions } from "../canvas";
import { ICanvasLink, ICanvasNode } from "../store";


export const createCanvas = (nodes: ICanvasNode[], links: ICanvasLink[], canvasOptions?: ICanvasOptions) => {
  const html = document.createElement("div");

  const canvasDiv = document.createElement("canvas");
  canvasDiv.style.height = '100vh';
  canvasDiv.style.width = '100vw';
  // canvasDiv.style.background = "#444"
  html.appendChild(canvasDiv)

  document.addEventListener("DOMContentLoaded", function (event) {
    console.log("=DOM is ready", event,)
    const options: ICanvasOptions = canvasOptions ? canvasOptions : {
      viewElement: canvasDiv,
      debugMode: true
    }
    const canvas = new GraphCanvas(options);
    // canvas.start_drawing()
    canvas.dataStore.add(nodes, links)
    // canvas.camera.fitView();
    // canvas.camera.moveNodesToWorldCenter();
  }, false);
  return html
}
 