import { ICanvasOptions } from "./types";

const defaultViewDiv: HTMLCanvasElement = document.createElement('canvas')
defaultViewDiv.width = 800;  // Set the actual width of the canvas
defaultViewDiv.height = 800; // Set the actual height of the canvas
defaultViewDiv.style.width = '800px';  // Set the CSS width of the canvas
defaultViewDiv.style.height = '800px'; // Set the CSS height of the canvas


export const defaultCanvasOptions: ICanvasOptions = {
  background: "#222222",
  resolution: {
    nodes: window.devicePixelRatio,
    links: window.devicePixelRatio,
    canvas: window.devicePixelRatio, // WARNING - dont change this;
    labels: window.devicePixelRatio
  },
  viewElement: defaultViewDiv,
  debugMode: true
}