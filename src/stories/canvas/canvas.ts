import GraphCanvas from "../../canvas/graph";
import { INode, ILink } from "../../canvas/types";





const nodes: Array<INode> = [
    {
        id : "1",
        label: "Ravi",
        type: "Person",
        shape: "circle",
        // x: 0, 
        // y: 0

    },
    {
        id : "2",
        label: "GraphCanvas",
        type: "Project",
        shape: "circle",
        // x: 0, 
        // y: 0

    },
    {
        id: "3",
        label: "TestNode",
        type: "Test",
        shape: "circle"
    }
];

const edges: Array<ILink> = [
    // {
    //     id: '1-2',
    //     source: '1',
    //     target: '2'
    // }
];

export const createPage = () => {
    const canvasDiv = document.createElement('canvas');
    canvasDiv.style.width = "100vw"
    canvasDiv.style.height = "100vh"



    // canvas.fitView()


    document.addEventListener("DOMContentLoaded", function(event) {
        /* The stuff I needed to initialise */
        console.log("=DOM is ready", event)
        const canvas = new GraphCanvas(canvasDiv);
        canvas.addData(nodes, edges)
    }, false);

    // const section = `<section class="storybook-page"></section>`;
    // canvasDiv.insertAdjacentHTML('beforeend', section);
    return canvasDiv;
};
