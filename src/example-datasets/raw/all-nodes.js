import { BsFillBuildingsFill } from "react-icons/bs";
import { MarkerType } from "reactflow";


export const initialNodes = [
    {
        id: "1.1",
        type: "GenericNode",
        data: {
            label: "Start",
            icon: <BsFillBuildingsFill />,
            properties: {
                "identifier": "string",
                "is_active": false
            }
        }
    },

    {
        id: "2.1",
        type: "CardNode",
        data: {
            label: "Card with Html String based Form",
            icon: <BsFillBuildingsFill />,
            body: `
            <img src='https://picsum.photos/100/40' style='    margin: 0 auto;
width: 100%; height: 80px' />
<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
when an unknown printer took a galley of type and scrambled it to make a type 
specimen book. </p>

      `
        },
        style: {
            width: "300px"
        }
    },
    {
        id: "2.2",
        type: "CardNode",
        data: {
            label: "Hello World",
            icon: <BsFillBuildingsFill />,
            body: `
 
<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
when an unknown printer took a galley of type and scrambled it to make a type 
specimen book. </p>

      `
        },
        style: {
            width: "300px"
        }
    },
    {
        id: "3.1",
        type: "CommentNode",
        data: {
            label: "CommentNode 1",
            // icon: <StickNotes />,
            commentText: "Hello World ! this is yet another attempt to create beautiful visualisations"
        }
    },
    {
        id: "4.1",
        type: "GenericNode",
        data: {
            label: "Action 1",
            icon: <BsFillBuildingsFill />,
        }
    },
    {
        id: "4.2",
        type: "GenericNode",
        data: {
            label: "Action 2",
            // icon: <BsFillBuildingsFill />,
        }
    },
    {
        id: "4.3",
        type: "GenericNode",
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
