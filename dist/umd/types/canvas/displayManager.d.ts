import { CanvasSetting, EdgeSetting, NodeSetting } from "./types";
declare class ColorPalleteManager {
    colors: string[];
    getColor(label: string): string;
}
declare class DisplayManager {
    colorPallete: ColorPalleteManager;
    defaultCanvasSettings: CanvasSetting;
    defaultShapeColor: string;
    defaultArrowColor: string;
    inActiveNodeColor: string;
    secondDegreeNodeColor: string;
    defaultNodeSettings: NodeSetting;
    defaultEdgeSettings: EdgeSetting;
    getNodeColorConfigByLabel(label: string | undefined, nodeSetting: NodeSetting): {
        border: string;
        background: string;
        highlight: {
            border: string;
            background: string;
        };
        hover: {
            border: string;
            background: string;
        };
    };
    getNodeColorConfigWithColor(color: string): {
        border: string;
        background: string;
        highlight: {
            border: string;
            background: string;
        };
        hover: {
            border: string;
            background: string;
        };
    };
    getEdgeColorConfig(label: string | undefined, edgeSetting: EdgeSetting): string;
    createEdgeSettings: (edgeSetting: EdgeSetting, label: string | undefined) => {
        smooth: {
            type: ("dynamic" | "continuous" | "discrete" | "diagonalCross" | "straightCross" | "horizontal" | "vertical" | "curvedCW" | "curvedCCW" | "cubicBezier") | undefined;
        };
        color: string;
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
    createNodeSettings: (nodeSetting: NodeSetting, label: string | undefined) => {
        color: {
            border: string;
            background: string;
            highlight: {
                border: string;
                background: string;
            };
            hover: {
                border: string;
                background: string;
            };
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
