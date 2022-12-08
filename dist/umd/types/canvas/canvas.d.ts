import { Network } from "vis-network/peer/esm/vis-network";
import "vis-network/styles/vis-network.css";
import { Node, Edge, Options } from "vis-network/declarations/network/Network";
export type getNetworkCallback = (network: Network) => {};
export type eventCallback = (params?: any) => void;
export type TestData = {
    nodes: Node[];
    edges: Edge[];
};
export interface CanvasProps {
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
export default Canvas;
