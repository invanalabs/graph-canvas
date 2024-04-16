import { RendererTypes } from "./constants";
import { CanvasOptions, ScreenOptions } from "./types";


export const defaultScreenOptions: ScreenOptions = {
    width: 800,
    height: 600
}

export const defaultCanvasOptions: CanvasOptions = {
    // viewDiv:
    background: "#efefef",
    //@ts-ignore
    renderer: RendererTypes.WebGL,
    screen: defaultScreenOptions,
    resolution: window.devicePixelRatio
}