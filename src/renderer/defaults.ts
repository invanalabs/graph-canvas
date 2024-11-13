import { IRendererOptions } from "./types";


const getDefaultViewDiv = () => {
    const div: HTMLCanvasElement = document.createElement('canvas')
    div.width = 800;  // Set the actual width of the canvas
    div.height = 800; // Set the actual height of the canvas
    div.style.width = '800px';  // Set the CSS width of the canvas
    div.style.height = '800px'; // Set the CSS height of the canvas
    return div
}

export const defaultViewDiv = getDefaultViewDiv();

export const defaultCanvasOptions: IRendererOptions = {
    viewElement: defaultViewDiv,
    debugMode: false,
    preference: 'webgpu',
    stageOptions: {
        background: "#222222",
        backgroundAlpha: 1,
        worldScale: 10,
        resolution: {
            nodes: window.devicePixelRatio * 6,
            links: window.devicePixelRatio,
            stage: window.devicePixelRatio, // WARNING - dont change this;
            labels: window.devicePixelRatio * 6,
            icons: window.devicePixelRatio * 6,
            images: window.devicePixelRatio,
            svgImages: window.devicePixelRatio * 2
        }
    }
}