import { MarkerType } from "reactflow";

export const initialNodes = [
    {
        id: "1.1",
        type: "DataStore",
        data: {
            label: "Ravi Raja Merugu"
        }
    },
    {
        id: "1.2",
        type: "DataStore",
        data: {
            label: "flow-canvas"
        }
    }
]

export const initialEdges = [
    {
        id: "e0-1",
        source: "1.1",
        target: "1.2",
        animated: false,
        label: "authored",
        type: "straight",
        markerEnd: {
            type: MarkerType.ArrowClosed
        }
    }
]