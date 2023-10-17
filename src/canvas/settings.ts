import { ConnectionLineType, MarkerType } from "reactflow";
import { CanvasSettingsType } from "./core/types";


export const defaultCanvasSettings: CanvasSettingsType = {
    nodes: {
        type: "Collection"
    },
    edges: {
        type: ConnectionLineType.Step,
        markerEnd: {
            type: MarkerType.ArrowClosed
        },
        animated: false
    }
} 