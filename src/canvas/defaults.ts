import { RendererTypes } from "./constants";
import { CanvasOptions, ScreenOptions } from "./types";


export const defaultScreenOptions: ScreenOptions = {
    width: 800,
    height: 600
}

export const defaultCanvasOptions: CanvasOptions = {
    // viewDiv:
    background: "#222222",
    //@ts-ignore
    renderer: RendererTypes.WebGL,
    screen: defaultScreenOptions,
    resolution:  6 //window.devicePixelRatio | 2 
}