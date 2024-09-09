// import { LayoutComputerAbstract } from "../layout/base";
// import { NoLayoutComputer } from "../layout/no-layout";
import { LinkStyleDefaults } from "../renderer/shapes/links/defaults";
import { NodeStyleDefaults } from "../renderer/shapes/nodes/circle/defaults";
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
  // layout: NoLayoutComputer,
  viewElement: defaultViewDiv,
  background: "#222222",
  backgroundAlpha: 1,
  resolution: {
    nodes: window.devicePixelRatio * 6,
    links: window.devicePixelRatio,
    canvas: window.devicePixelRatio, // WARNING - dont change this;
    labels: window.devicePixelRatio * 6,
    icons: window.devicePixelRatio * 6,
    images: window.devicePixelRatio,
    svgImages: window.devicePixelRatio * 2
  },
  debugMode: false,
  styles: {
    defaultNodeStyle: NodeStyleDefaults,
    defaultLinkStyle: LinkStyleDefaults
  },
  extraSettings: {
    nodeSizeBasedOn: 'default',
    nodeColorBasedOn : 'default',
    linkColorBasedOn : 'default',
    labelVisibilityZoomThreshold: 0.30
  }
}