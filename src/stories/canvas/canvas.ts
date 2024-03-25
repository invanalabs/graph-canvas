// @ts-nocheck
import GraphCanvas from "../../graphCanvas";
import { INode, ILink, GraphCanvasSetting } from "../../graphCanvas/types";
import fetchData, { convert2CanvasData } from "../datasets/miserables";





const initNodes: Array<INode> = [
    {
        id: "1",
        label: "Ravi",
        type: "Person",
        shape: "circle",
        // x: 0, 
        // y: 0

    },
    {
        id: "2",
        label: "GraphCanvas",
        type: "Project",
        shape: "circle",
        // x: 0, 
        // y: 0

    },
    {
        id: "3",
        label: "TestNode",
        type: "Test 1",
        shape: "circle"
    },
    {
        id: "4",
        label: "TestNode",
        type: "Test 2",
        shape: "circle"
    }
];


const initEdges: Array<ILink> = [
    {
        id: '1-2',
        source: '1',
        target: '2'
    }
];




const generateDummyData = (graph: GraphCanvas) => {

    // Generate a random number between min (inclusive) and max (exclusive)
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }


    // const nodeId = Date.now().toString();
    const nodeId = graph.stateCtrl.nodes.size + 1;
    console.log("===nodeId =====", nodeId)


    const nodes: INode[] = [{
        id: nodeId.toString(),
        label: "TestNode",
        type: `Test ${nodeId}`,
        shape: "circle"
    }];

    const links: ILink[] = []

    if (nodeId > 4) {
        [1, 2].forEach(() => {
            const randomTarget = getRandomNumber(1, graph.stateCtrl.nodes.size)
            links.push({
                id: `${randomTarget}-${nodeId}`,
                source: randomTarget.toString(), // nodes[0] ,
                target: nodeId.toString() //graph.stateCtrl.nodes.get()
            })
        })

    } else {
        links.push({
            id: `1-${nodeId}`,
            source: '1',
            target: nodeId.toString()
        })
    }
    console.log("==nodes, links", nodes, links)

    return { nodes, links }
}


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
    eventbar.style.top = "60px";
    eventbar.style.left = "10px";
    eventbar.style.maxHeight = "855px";
    eventbar.style.width = "300px";
    // eventbar.style.background = "red";
    eventbar.style.position = "absolute";
    eventbar.style.overflowY = "hidden";
    html.appendChild(eventbar);



    // create toolbar
    const toolbar = document.createElement('div');
    toolbar.classList.add("toolbar");
    toolbar.style.top = "10px";
    toolbar.style.left = "10px";
    toolbar.style.position = "absolute"



    const addDataButton = document.createElement('button');
    addDataButton.innerHTML = "Add dummy data";
    addDataButton.style.marginRight = "30px"
    toolbar.appendChild(addDataButton);


    const redrawButton = document.createElement('button');
    redrawButton.innerHTML = "redraw";
    toolbar.appendChild(redrawButton);


    const zoomInButton = document.createElement('button');
    zoomInButton.innerHTML = "zoom in";
    toolbar.appendChild(zoomInButton);

    const zoomOutButton = document.createElement('button');
    zoomOutButton.innerHTML = "zoom out";
    toolbar.appendChild(zoomOutButton);

    const fitViewButton = document.createElement('button');
    fitViewButton.innerHTML = "fitView"
    toolbar.appendChild(fitViewButton);


    const debugOnButton = document.createElement('button');
    debugOnButton.innerHTML = "Debug ON"
    toolbar.appendChild(debugOnButton);

    const debugOffButton = document.createElement('button');
    debugOffButton.innerHTML = "Debug OFF"
    toolbar.appendChild(debugOffButton);

    const reDoLayoutButton = document.createElement('button');
    reDoLayoutButton.innerHTML = "ReDoLayout"
    toolbar.appendChild(reDoLayoutButton);

    const loadDataSet1 = document.createElement('button');
    loadDataSet1.innerHTML = "DataSet 1"
    toolbar.appendChild(loadDataSet1);


    html.appendChild(toolbar)

    const showEvent = (eventType: string) => {
        // notify event 
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

        setTimeout(function () {
            // auto delete the even notification 
            eventbar.removeChild(eventDiv);
        }, 3000);

    }


    document.addEventListener("DOMContentLoaded", function (event) {
        /* The stuff I needed to initialise */
        console.log("=DOM is ready", event)
        const canvasSettings: GraphCanvasSetting = { canvas: { containerDiv: canvasDiv, backgroundColor: 0x2a2c2e } };
        const graph = new GraphCanvas(canvasSettings);
        graph.addData(initNodes, initEdges)


        addDataButton.onclick = function () {
            const { nodes, links } = generateDummyData(graph)
            graph.addData(nodes, links)
        }

        redrawButton.addEventListener('click', () => {
            // graph.canvasCtrl.layout.reDoLayout();
            graph.canvasCtrl.fitView()
            graph.canvasCtrl.renderer.rerender()
        })
        zoomInButton.addEventListener('click', () => graph.canvasCtrl.zoomIn());
        zoomOutButton.addEventListener('click', () => graph.canvasCtrl.zoomOut());
        fitViewButton.addEventListener('click', () => graph.canvasCtrl.fitView());

        debugOffButton.addEventListener('click', () => {
            graph.canvasCtrl.debugOff()
            graph.canvasCtrl.renderer.rerender()
        });
        debugOnButton.addEventListener('click', () => {
            graph.canvasCtrl.debugOn();
            graph.canvasCtrl.renderer.rerender();
        });

        reDoLayoutButton.addEventListener('click', () => {
            graph.canvasCtrl.layout.reDoLayout();
            graph.canvasCtrl.renderer.rerender()
        })


        loadDataSet1.addEventListener('click', () => {
            // graph.canvasCtrl.clear()
            // generateDummyData2(graph)
            fetchData().then(data => {
                // You can access the returned data here
                console.log('Returned data:', data);

                graph.canvasCtrl.clear() // clear all the graphics  
                graph.canvasCtrl.stateCtrl.clearAll(); // clear the data
                const { nodes, links } = convert2CanvasData(data);
                console.log("convert2CanvasData", nodes, links)
                graph.addData(nodes, links)


            })
        })
        // camera interactions 
        graph.canvasCtrl.camera.on('clicked', () => {
            showEvent('clicked');
            console.log("clicked - state", graph.stateCtrl.getNodes(), graph.stateCtrl.getLinks())
        });
        graph.canvasCtrl.camera.on('drag-start', () => showEvent('drag-start'));
        graph.canvasCtrl.camera.on('drag-end', () => showEvent('drag-end'));
        graph.canvasCtrl.camera.on('pinch-start', () => showEvent('pinch-start'));
        graph.canvasCtrl.camera.on('pinch-end', () => showEvent('pinch-end'));
        graph.canvasCtrl.camera.on('bounce-start-x', () => showEvent('bounce-start-x'));
        graph.canvasCtrl.camera.on('bounce-end-x', () => showEvent('bounce-end-x'));
        graph.canvasCtrl.camera.on('bounce-start-y', () => showEvent('bounce-start-y'));
        graph.canvasCtrl.camera.on('bounce-end-y', () => showEvent('bounce-end-y'));
        graph.canvasCtrl.camera.on('snap-start', () => showEvent('snap-start'));
        graph.canvasCtrl.camera.on('snap-end', () => showEvent('snap-end'));
        graph.canvasCtrl.camera.on('snap-zoom-start', () => showEvent('snap-zoom-start'));
        graph.canvasCtrl.camera.on('snap-zoom-end', () => showEvent('snap-zoom-end'));
        graph.canvasCtrl.camera.on('mouse-edges-start', () => showEvent('mouse-edges-start'));
        graph.canvasCtrl.camera.on('mouse-edges-end', () => showEvent('mouse-edges-end'));
        graph.canvasCtrl.camera.on('moved-end', () => showEvent('moved-end'));
        graph.canvasCtrl.camera.on('zoomed-end', () => showEvent('zoomed-end'));
        graph.canvasCtrl.camera.on("pointerover", () => showEvent('pointerover'));
        graph.canvasCtrl.camera.on("pointerout", () => showEvent('pointerout'));


    }, false);

    // const section = `<section class="storybook-page"></section>`;
    // canvasDiv.insertAdjacentElement('beforeend', toolbar);
    return html;
};
