import { ICanvasOptions } from "./types"
// import * as PIXI from "pixi.js" 

// PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR


const getDefaultViewDiv  = () => {
  const div: HTMLCanvasElement = document.createElement('canvas')
  div.width = 800;  // Set the actual width of the canvas
  div.height = 800; // Set the actual height of the canvas
  div.style.width = '800px';  // Set the CSS width of the canvas
  div.style.height = '800px'; // Set the CSS height of the canvas
  return div  
}

const defaultViewDiv =  getDefaultViewDiv();
export const defaultCanvasOptions: ICanvasOptions = {
  viewElement: defaultViewDiv,
  background: "#222222",
  resolution: {
    nodes: window.devicePixelRatio * 2,
    links: window.devicePixelRatio,
    canvas: window.devicePixelRatio, // WARNING - dont change this;
    labels: window.devicePixelRatio * 2,
    icons: window.devicePixelRatio * 2
  },
  debugMode: true
}