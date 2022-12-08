import { Network } from 'vis-network/peer/esm/vis-network';
import { Options, Node, Edge } from 'vis-network/declarations/network/Network';

interface ArtBoardProps {
    label: string;
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
    events?: any;
    getNetwork?: getNetworkCallback;
    style?: {
        width: string;
        height: string;
    };
}
declare const Canvas: ({ data, options, events, getNetwork, style }: CanvasProps) => JSX.Element;

export { ArtBoard, Canvas };
