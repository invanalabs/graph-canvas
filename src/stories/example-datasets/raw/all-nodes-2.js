import { BsFillBuildingsFill } from "react-icons/bs";
import { MarkerType } from "reactflow";
// import { CanvasNode } from "../../../core/types";


export const initialNodes = [
    {
        id: "1.1",
        type: "CardNode",
        data: {
            label: "Start",
            icon: <BsFillBuildingsFill />,
            properties: {
                "identifier": "string",
                "is_active": false
            }
        },
        style: {
            width: "200px",
            height: "70px"
        }
    },

    {
        id: "2.1",
        type: "CardNode",
        data: {
            label: "Card with Html String based Form",
            icon: <BsFillBuildingsFill />
        },
        style: {
            width: "200px",
            height: "70px"
        }
    },
    {
        id: "2.2",
        type: "CardNode",
        data: {
            label: "Hello World",
            icon: <BsFillBuildingsFill />,

        },
        style: {
            width: "200px",
            height: "70px"
        }
    },
    {
        id: "3.1",
        type: "CardNode",
        data: {
            label: "CommentNode 1",
            // icon: <StickNotes />,

        },
        style: {
            width: "200px",
            height: "70px"
        }
    },
    {
        id: "4.1",
        type: "CardNode",
        data: {
            label: "Action 1",
            icon: <BsFillBuildingsFill />,
        },
        style: {
            width: "200px",
            height: "70px"
        }
    },
    {
        id: "4.2",
        type: "CardNode",
        data: {
            label: "Action 2",
            // icon: <BsFillBuildingsFill />,
        },
        style: {
            width: "200px",
            height: "70px"
        }
    },
    {
        id: "4.3",
        type: "CardNode",
        data: {
            // label: "Action 3",
            icon: <BsFillBuildingsFill />,
        }
    },

];

export const initialEdges = [
    {
        id: "1-1-2.1",
        source: "1.1",
        target: "2.1",
        animated: false,
        // label: "has_NodeWithDataTypeFields",
        type: "step",
        markerEnd: {
            type: MarkerType.ArrowClosed
        }
    },
    {
        id: "2.1-3.1",
        source: "2.1",
        target: "3.1",
        animated: false,
        // label: "has_NodeWithDataTypeFields",
        type: "step",
        markerEnd: {
            type: MarkerType.ArrowClosed
        }
    },
    {
        id: "2.1-2.2",
        source: "2.1",
        target: "2.2",
        animated: false,
        // label: "has_NodeWithDataTypeFields",
        type: "step",
        markerEnd: {
            type: MarkerType.ArrowClosed
        }
    },
    {
        id: "2.2-4.1",
        source: "2.2",
        target: "4.1",
        animated: false,
        // label: "has_NodeWithDataTypeFields",
        type: "step",
        markerEnd: {
            type: MarkerType.ArrowClosed
        }
    },
    {
        id: "2.2-4.2",
        source: "2.2",
        target: "4.2",
        animated: false,
        // label: "has_NodeWithDataTypeFields",
        type: "step",
        markerEnd: {
            type: MarkerType.ArrowClosed
        }
    },
    {
        id: "4.1-4.3",
        source: "4.1",
        target: "4.3",
        animated: false,
        // label: "has_NodeWithDataTypeFields",
        type: "step",
        markerEnd: {
            type: MarkerType.ArrowClosed
        }
    },
    {
        id: "4.2-4.3",
        source: "4.2",
        target: "4.3",
        animated: false,
        // label: "has_NodeWithDataTypeFields",
        type: "step",
        markerEnd: {
            type: MarkerType.ArrowClosed
        }
    },
]
