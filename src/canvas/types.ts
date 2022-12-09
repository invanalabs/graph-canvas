interface CanvasSetting {
    backgroundColor: string;
}

export interface Properties {
    [key: string]: any;
}

interface GCNodeType {
    id: string;
    label: string;
    properties: Properties
}

interface GCEdgeType extends GCNodeType {
    from: string
    to: string
}

interface CanvasData {
    nodes: GCNodeType[],
    edges: GCEdgeType[]
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

interface CanvasDisplaySettings {
    canvasSettings?: CanvasSetting;
    nodeSettings: NodeSetting[];
    defaultNodeSetting?: NodeSetting;
    edgeSettings: EdgeSetting[];
    defaultEdgeSetting?: EdgeSetting;
}

export default CanvasDisplaySettings
export {CanvasSetting, EdgeSetting, NodeSetting, CanvasData, GCEdgeType, GCNodeType}