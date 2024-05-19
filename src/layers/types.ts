import GraphCanvas from "../canvas/canvas";

export type LayerTypes = string | "FRONT" | "DATA" | "ANNOTATIONS" | "MAP";

export type LayerGfxTypes = string | "NODES_SHAPES" | "NODE_LABELS" | "LINK_SHAPES" | "LINK_LABELS";

export interface CanvasLayersOptions  {
    canvas: GraphCanvas
    screenWidth : number
    screenHeight: number
    worldWidth : number
    worldHeight: number
    zoomLevel: number
}
