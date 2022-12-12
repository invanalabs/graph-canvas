import { Network } from 'vis-network/peer/esm/vis-network';
import { Node, Edge } from 'vis-network/declarations/network/Network';

interface CanvasSetting {
    backgroundColor: string;
}
interface Properties {
    [key: string]: any;
}
interface CanvasNode {
    id: string;
    label: string;
    properties: Properties;
}
interface CanvasEdge extends CanvasNode {
    from: string;
    to: string;
}
interface CanvasData {
    nodes: CanvasNode[];
    edges: CanvasEdge[];
}
type ArrowShapeTypes = 'dynamic' | 'continuous' | 'discrete' | 'diagonalCross' | 'straightCross' | 'horizontal' | 'vertical' | 'curvedCW' | 'curvedCCW' | 'cubicBezier';
interface EdgeSetting {
    labelField?: string;
    arrowColor?: string;
    arrowShape?: ArrowShapeTypes;
    labelColor?: string;
}
type NodeShapeTypes = 'dot' | 'image' | 'diamond' | 'star' | 'triangle' | 'triangleDown' | 'hexagon' | 'square';
interface NodeSetting {
    labelField?: string;
    labelColor?: string;
    shape?: NodeShapeTypes;
    shapeColor?: string;
    shapeSize?: number;
    shapeIcon?: string;
}
interface CanvasDisplaySettings {
    canvasSettings?: CanvasSetting;
    nodeSettings?: {
        [key: string]: NodeSetting;
    };
    defaultNodeSetting?: NodeSetting;
    edgeSettings?: {
        [key: string]: EdgeSetting;
    };
    defaultEdgeSetting?: EdgeSetting;
}

interface ArtBoardProps {
    data: CanvasData;
    displaySettings: CanvasDisplaySettings;
}
declare const ArtBoard: ({ data, displaySettings }: ArtBoardProps) => JSX.Element;

type getNetworkCallback = (network: Network) => {};
interface CanvasProps {
    data?: CanvasData;
    logEvent?: any;
    displaySettings?: CanvasDisplaySettings;
    nodeSizeBasedOnLinks: Boolean;
    getNetwork?: getNetworkCallback;
    setSelectedElement?: (el: Node | Edge | null) => void;
    style?: {
        width: string;
        height: string;
    };
}
declare const Canvas: ({ data, displaySettings, nodeSizeBasedOnLinks, setSelectedElement, logEvent, getNetwork, style }: CanvasProps) => JSX.Element;

export { ArtBoard, Canvas };
