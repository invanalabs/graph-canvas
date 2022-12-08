/// <reference types="react" />
import { Network } from "vis-network/peer/esm/vis-network";
import "vis-network/styles/vis-network.css";
import { Node, Edge, Options } from "vis-network/declarations/network/Network";
import EventStore from "../evenStore/eventStore";
export type getNetworkCallback = (network: Network) => {};
export type eventCallback = (params?: any) => void;
export type TestData = {
    nodes: Node[];
    edges: Edge[];
};
export interface CanvasProps {
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
export default Canvas;
