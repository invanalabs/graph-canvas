/// <reference types="react" />
import { Network } from 'vis-network/peer/esm/vis-network';
import { Options, Node, Edge } from 'vis-network/declarations/network/Network';
import { DataSet } from 'vis-data/peer/esm/vis-data';

interface ArtBoardProps {
    label: string;
}
declare const ArtBoard: (props: ArtBoardProps) => JSX.Element;

interface VisEventLog {
    id: string;
    eventName: string;
    eventParams: string;
    time: string;
}
declare class EventStore {
    data: DataSet<VisEventLog>;
    addEvent: (eventName: string, eventParams: any) => void;
}

type getNetworkCallback = (network: Network) => {};
type TestData = {
    nodes: Node[];
    edges: Edge[];
};
interface CanvasProps {
    data?: TestData;
    options?: Options;
    eventStore: EventStore;
    getNetwork?: getNetworkCallback;
    style?: {
        width: string;
        height: string;
    };
}
declare const Canvas: ({ data, options, eventStore, getNetwork, style }: CanvasProps) => JSX.Element;

export { ArtBoard, Canvas };
