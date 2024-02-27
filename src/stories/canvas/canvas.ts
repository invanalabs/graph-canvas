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

    const html = document.createElement("div");

    // create canvas
    const canvasDiv = document.createElement('canvas');
    canvasDiv.style.width = "100vw"
    canvasDiv.style.height = "100vh"
    canvasDiv.style.border = "10px solid red"

    html.appendChild(canvasDiv)


    // create toolbar
    const toolbar = document.createElement('div');
    toolbar.classList.add("toolbar");
    toolbar.style.top = "0px";
    toolbar.style.left = "0px";
    toolbar.style.position = "absolute"

    const zoomInButton = document.createElement('button');
    zoomInButton.innerHTML = "zoom in";
    toolbar.appendChild(zoomInButton);
    
    const zoomOutButton = document.createElement('button');
    zoomOutButton.innerHTML = "zoom out";
    toolbar.appendChild(zoomOutButton);

    const fitViewButton = document.createElement('button');
    fitViewButton.innerHTML = "fitView"
    toolbar.appendChild(fitViewButton);



    
    html.appendChild(toolbar)


    document.addEventListener("DOMContentLoaded", function(event) {
        /* The stuff I needed to initialise */
        console.log("=DOM is ready", event)
        const canvas = new GraphCanvas(canvasDiv);
        canvas.addData(nodes, edges)

        zoomInButton.addEventListener('click', () => canvas.zoomIn());
        zoomOutButton.addEventListener('click', () => canvas.zoomOut());
        fitViewButton.addEventListener('click', () => canvas.fitView());
    }, false);

    // const section = `<section class="storybook-page"></section>`;
    // canvasDiv.insertAdjacentElement('beforeend', toolbar);
    return html;
};
