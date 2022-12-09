declare const createDefaultOptions: () => {
    physics: boolean;
    autoResize: boolean;
    interaction: {
        hover: boolean;
    };
    nodes: {
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
    edges: {
        smooth: {
            type: ("continuous" | "dynamic" | "discrete" | "diagonalCross" | "straightCross" | "horizontal" | "vertical" | "curvedCW" | "curvedCCW" | "cubicBezier") | undefined;
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
};
declare const createDefaultEvents: (addEvent: any) => {
    click: (params?: any) => void;
    doubleClick: (params?: any) => void;
    oncontext: (params?: any) => void;
    dragStart: (params?: any) => void;
    dragging: (params?: any) => void;
    dragEnd: (params?: any) => void;
    controlNodeDragging: (params?: any) => void;
    controlNodeDragEnd: (params?: any) => void;
    zoom: (params?: any) => void;
    showPopup: (params?: any) => void;
    hidePopup: () => void;
    select: (params?: any) => void;
    selectNode: (params?: any) => void;
    selectEdge: (params?: any) => void;
    deselectNode: (params?: any) => void;
    deselectEdge: (params?: any) => void;
    hoverNode: (params?: any) => void;
    hoverEdge: (params?: any) => void;
    blurNode: (params?: any) => void;
    blurEdge: (params?: any) => void;
};
export default createDefaultEvents;
export { createDefaultOptions };
