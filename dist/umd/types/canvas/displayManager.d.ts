import { EdgeSetting, NodeSetting } from "./types";
declare class DisplayManager {
    constructor();
    createEdgeSettings: (edgeSetting: EdgeSetting) => {
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
    createNodeSettings: (nodeSetting: NodeSetting) => {
        color: {
            border: string;
            background: string;
        };
        borderWidth: number;
        shape: "dot" | "image" | "diamond" | "star" | "triangle" | "triangleDown" | "hexagon" | "square";
        font: {
            color: string;
        };
        size: number;
    };
}
export default DisplayManager;
