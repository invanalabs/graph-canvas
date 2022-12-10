import { Node, Edge, Network } from "vis-network/declarations/network/Network";
import { DataSet } from "vis-data/peer/esm/vis-data";
declare class CanvasEventHandler {
    inActiveEdgeFontColor: string;
    highlightNeighbors: (selectedItems: Node[], nodes: DataSet<Node>, edges: DataSet<Edge>, network: Network) => void;
    resetHighlight: (nodes: DataSet<Node>, edges: DataSet<Edge>) => void;
}
export default CanvasEventHandler;
