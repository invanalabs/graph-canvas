import { CanvasSetting, EdgeSetting, NodeSetting } from "./types";
declare class ColorPalleteManager {
    colors: string[];
    getColor(label: string): string | number;
}
declare class DisplayManager {
    colorPallete: ColorPalleteManager;
    defaultCanvasSettings: CanvasSetting;
    defaultNodeSettings: NodeSetting;
    defaultEdgeSettings: EdgeSetting;
    getNodeColorConfig(label: string, nodeSetting: NodeSetting): {
        background: string | number;
    };
    getEdgeColorConfig(label: string, edgeSetting: EdgeSetting): string | number;
    createEdgeSettings: (edgeSetting: EdgeSetting, label?: string) => {
        smooth: {
            type: ("continuous" | "dynamic" | "discrete" | "diagonalCross" | "straightCross" | "horizontal" | "vertical" | "curvedCW" | "curvedCCW" | "cubicBezier") | undefined;
        };
        color: string | number;
        width: number;
        arrows: {
            to: {
                enabled: boolean;
                scaleFactor: number;
            };
        };
        font: {
            color: string | undefined;
        };
    };
    createNodeSettings: (nodeSetting: NodeSetting, label?: string) => {
        color: {
            background: string | number;
        };
        borderWidth: number;
        shape: ("dot" | "image" | "diamond" | "star" | "triangle" | "triangleDown" | "hexagon" | "square") | undefined;
        font: {
            color: string | undefined;
        };
        size: number | undefined;
    };
}
export default DisplayManager;
