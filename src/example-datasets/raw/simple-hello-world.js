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
    },
    {
        id: "1.3",
        type: "DataStore",
        data: {
            label: "python"
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
        type: "default",
        markerEnd: {
            type: MarkerType.ArrowClosed
        }
    },
    {
        id: "e0-2",
        source: "1.1",
        target: "1.3",
        animated: false,
        label: "loves",
        type: "default",
        markerEnd: {
            type: MarkerType.ArrowClosed
        }
    },
    {
        id: "e0-3",
        source: "1.1",
        target: "1.1",
        animated: false,
        label: "is",
        type: "default",
        markerEnd: {
            type: MarkerType.ArrowClosed
        }
    }
]