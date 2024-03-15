import { ICanvas } from "pixi.js";
import * as PIXI from "pixi.js";


export type CanvasShape = PIXI.Container | PIXI.Graphics | PIXI.Sprite

export interface CanvasSetting {
    containerDiv: ICanvas,
    backgroundColor: string | number
}

export interface CViewportSetting {
    screenWidth: number;
    screenHeight: number;
    worldWidth: number;
    worldHeight: number;
}