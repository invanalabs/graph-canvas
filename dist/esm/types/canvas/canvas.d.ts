import { Network } from "vis-network/peer/esm/vis-network";
import "vis-network/styles/vis-network.css";
import CanvasDisplaySettings, { CanvasData } from "./types";
export type getNetworkCallback = (network: Network) => {};
export type eventCallback = (params?: any) => void;
export interface CanvasProps {
    data?: CanvasData;
    addEvent: any;
    displaySettings: CanvasDisplaySettings;
    getNetwork?: getNetworkCallback;
    style?: {
        width: string;
        height: string;
    };
}
declare const Canvas: ({ data, displaySettings, addEvent, getNetwork, style }: CanvasProps) => JSX.Element;
export default Canvas;
