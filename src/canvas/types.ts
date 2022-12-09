interface CanvasSetting {
    backgroundColor: string;
}

type ArrowShapeTypes =
    'dynamic' |
    'continuous' |
    'discrete' | 'diagonalCross' |
    'straightCross' |
    'horizontal' |
    'vertical' |
    'curvedCW' |
    'curvedCCW' |
    'cubicBezier'

interface EdgeSetting {
    labelField: string;
    arrowColor: string;
    arrowShape?: ArrowShapeTypes;
    labelColor?: string;
}


type NodeShapeTypes =
    'dot' |
    'image' |
    'diamond' |
    'star' |
    'triangle' |
    'triangleDown' |
    'hexagon' |
    'square'
// 'icon' |
// 'circle' |
// 'ellipse' |
// 'database' |
// 'box' |
// 'image' |
// 'text'

interface NodeSetting {
    labelField: string;
    labelColor: string;
    shape: NodeShapeTypes;
    shapeColor: string;
    shapeSize: number;
    shapeIcon?: string
}

interface DisplaySettings {
    canvasSettings?: CanvasSetting;
    nodeSettings: NodeSetting[];
    defaultNodeSetting?: NodeSetting;
    edgeSettings: EdgeSetting[];
    defaultEdgeSetting?: EdgeSetting;
}

export default DisplaySettings
export {CanvasSetting, EdgeSetting, NodeSetting}