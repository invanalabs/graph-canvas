import { Network } from 'vis-network/peer/esm/vis-network';
import { Options, Node, Edge } from 'vis-network/declarations/network/Network';

interface CanvasSetting {
    backgroundColor: string;
}
type ArrowShapeTypes = 'dynamic' | 'continuous' | 'discrete' | 'diagonalCross' | 'straightCross' | 'horizontal' | 'vertical' | 'curvedCW' | 'curvedCCW' | 'cubicBezier';
interface EdgeSetting {
    labelField: string;
    arrowColor: string;
    arrowShape?: ArrowShapeTypes;
    labelColor?: string;
}
type NodeShapeTypes = 'dot' | 'image' | 'diamond' | 'star' | 'triangle' | 'triangleDown' | 'hexagon' | 'square';
interface NodeSetting {
    labelField: string;
    labelColor: string;
    shape: NodeShapeTypes;
    shapeColor: string;
    shapeSize: number;
    shapeIcon?: string;
}
interface DisplaySettings {
    canvasSettings?: CanvasSetting;
    nodeSettings: NodeSetting[];
    defaultNodeSetting?: NodeSetting;
    edgeSettings: EdgeSetting[];
    defaultEdgeSetting?: EdgeSetting;
}

interface ArtBoardProps {
    label: string;
    data: {
        nodes: [];
        edges: [];
    };
    displaySettings: DisplaySettings;
}
declare const ArtBoard: (props: ArtBoardProps) => JSX.Element;

type getNetworkCallback = (network: Network) => {};
type TestData = {
    nodes: Node[];
    edges: Edge[];
};
interface CanvasProps {
    data?: TestData;
    options?: Options;
    addEvent: any;
    displaySettings: DisplaySettings;
    getNetwork?: getNetworkCallback;
    style?: {
        width: string;
        height: string;
    };
}
declare const Canvas: ({ data, displaySettings, options, addEvent, getNetwork, style }: CanvasProps) => JSX.Element;

export { ArtBoard, Canvas };
