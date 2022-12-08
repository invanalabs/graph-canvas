import { Network } from 'vis-network/peer/esm/vis-network';
import { Options, Node, Edge } from 'vis-network/declarations/network/Network';

interface ArtBoardProps {
    label: string;
    data: {
        nodes: [];
        edges: [];
    };
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
    getNetwork?: getNetworkCallback;
    style?: {
        width: string;
        height: string;
    };
}
declare const Canvas: ({ data, options, addEvent, getNetwork, style }: CanvasProps) => JSX.Element;

export { ArtBoard, Canvas };
