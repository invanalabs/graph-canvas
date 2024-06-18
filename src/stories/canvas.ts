import { GraphCanvas, ICanvasOptions } from "../canvas";
import { ICanvasLink, ICanvasNode } from "../store";


export const createCanvas = () => {
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


    const exampleNodes: ICanvasNode[] = [
      { id: '1', group: 'Person', label: 'Person-1' },
      { id: '2', group: 'Person', label: 'Person-2' },
      { id: '3', group: 'Person', label: 'Person-3' },
      { id: '4', group: 'Person', label: 'Person-4' },
    
    ];
    
    const exampleLinks: ICanvasLink[] = [
      { id: '1-2', group: 'authored', label: 'default-1-2', sourceId: '1', targetId: '2' },
      { id: '1-2.1', group: 'authored', label: 'default-1-2.1', sourceId: '1', targetId: '2' },
      { id: '2-3', group: 'authored', label: 'default-2-3', sourceId: '2', targetId: '3' },
      { id: '2-4', group: 'authored', label: 'default-2-4', sourceId: '2', targetId: '4' },
      { id: '3-4', group: 'authored', label: 'default-3-4', sourceId: '3', targetId: '4' },
    ];
    

    canvas.dataStore.add(exampleNodes, exampleLinks)
    // canvas.camera.fitView();
    // canvas.camera.moveNodesToWorldCenter();
  }, false);
  return html
}
 