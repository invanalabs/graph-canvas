// @ts-nocheck
import GraphCanvas from "../../graphCanvas";
import { INode, ILink, GraphCanvasSetting } from "../../graphCanvas/types";


const initNodes: Array<INode> = [
    {
        id: "1",
        label: "Invana",
        type: "Person",
        shape: "circle",
        // x: 0, 
        // y: 0
    },
    {
        id: "2",
        label: "Invana Studio",
        type: "Person",
        shape: "circle",
        // x: 0, 
        // y: 0
    }
];

const initEdges: Array<ILink> = [
    {
        id: '1-2',
        source: '1',
        target: '2',
        type: 'has_project'
    }
];

 

export const createPage = () => {

    const html = document.createElement("div");

    // create canvas
    const canvasDiv = document.createElement('canvas');
    canvasDiv.style.width = "100vw"
    canvasDiv.style.height = "100vh"
    // canvasDiv.style.border = "10px solid red"

    html.appendChild(canvasDiv)

 

    document.addEventListener("DOMContentLoaded", function (event) {
        /* The stuff I needed to initialise */
        console.log("=DOM is ready", event)
        const canvasSettings: GraphCanvasSetting = { canvas: { containerDiv: canvasDiv, backgroundColor: 0x2a2c2e } };
        const graph = new GraphCanvas(canvasSettings);
        graph.addData(initNodes, initEdges)
 

    }, false);
    return html;
};
