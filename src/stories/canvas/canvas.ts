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
    // canvasDiv.style.border = "10px solid red"

    html.appendChild(canvasDiv)

    // create event list 
    const eventbar = document.createElement('div');
    eventbar.classList.add("eventbar");
    eventbar.style.top = "50px";
    eventbar.style.left = "0px";
    eventbar.style.height = "100vh";
    eventbar.style.position = "absolute"
    html.appendChild(eventbar);



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


    const showEvent = (eventType: string)=> {

        const eventDiv = document.createElement('div')
        eventDiv.innerHTML = `fired - ${eventType}`;
        eventDiv.style.borderBottom = "2px solid #999"
        eventDiv.style.padding = "10px "
        eventDiv.style.marginBottom = "5px"
        eventDiv.style.background = "#000"
        eventDiv.style.opacity = "0.5"
        eventDiv.style.width = "200px";
        eventDiv.style.color = "white"

        eventbar.prepend(eventDiv)
    }


    document.addEventListener("DOMContentLoaded", function(event) {
        /* The stuff I needed to initialise */
        console.log("=DOM is ready", event)
        const canvas = new GraphCanvas(canvasDiv);
        canvas.addData(nodes, edges)

        zoomInButton.addEventListener('click', () => canvas.zoomIn());
        zoomOutButton.addEventListener('click', () => canvas.zoomOut());
        fitViewButton.addEventListener('click', () => canvas.fitView());




        canvas.viewport.on('clicked', () => showEvent('clicked'));
        canvas.viewport.on('drag-start', () => showEvent('drag-start'));
        canvas.viewport.on('drag-end', () => showEvent('drag-end'));
        canvas.viewport.on('pinch-start', () => showEvent('pinch-start'));
        canvas.viewport.on('pinch-end', () => showEvent('pinch-end'));
        canvas.viewport.on('bounce-start-x', () => showEvent('bounce-start-x'));
        canvas.viewport.on('bounce-end-x', () => showEvent('bounce-end-x'));
        canvas.viewport.on('bounce-start-y', () => showEvent('bounce-start-y'));
        canvas.viewport.on('bounce-end-y', () => showEvent('bounce-end-y'));
        canvas.viewport.on('snap-start', () => showEvent('snap-start'));
        canvas.viewport.on('snap-end', () => showEvent('snap-end'));
        canvas.viewport.on('snap-zoom-start', () => showEvent('snap-zoom-start'));
        canvas.viewport.on('snap-zoom-end', () => showEvent('snap-zoom-end'));
        canvas.viewport.on('mouse-edges-start', () => showEvent('mouse-edges-start'));
        canvas.viewport.on('mouse-edges-end', () => showEvent('mouse-edges-end'));
        canvas.viewport.on('moved-end', () => showEvent('moved-end'));
        canvas.viewport.on('zoomed-end', () => showEvent('zoomed-end'));
        canvas.viewport.on("pointerover", () => showEvent('pointerover'));
        canvas.viewport.on("pointerout", () => showEvent('pointerout'));


    }, false);

    // const section = `<section class="storybook-page"></section>`;
    // canvasDiv.insertAdjacentElement('beforeend', toolbar);
    return html;
};
