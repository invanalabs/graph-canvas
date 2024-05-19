import GraphCanvas from "../../canvas/canvas";


export default class ToolBar {

    canvas: GraphCanvas;

    constructor(canvas: GraphCanvas){
        this.canvas = canvas
    }

    render = () => {
        const _this = this;
        const toolBar = document.createElement("div");
        toolBar.classList.add("toolBar");
        toolBar.style.top = "10px";
        toolBar.style.left = "10px";
        toolBar.style.position = "absolute"


        const redrawButton = document.createElement('button');
        redrawButton.innerHTML = "redraw";
        redrawButton.addEventListener('click', () => {
            console.log("redrawing")
            _this.canvas.renderer.rerender()
        })

        toolBar.appendChild(redrawButton);


        const zoomInButton = document.createElement('button');
        zoomInButton.innerHTML = "zoom in";
        zoomInButton.addEventListener('click', () => {
            console.log("zoomInButton")
            _this.canvas.camera.zoomIn()
        })
        toolBar.appendChild(zoomInButton);

        const zoomOutButton = document.createElement('button');
        zoomOutButton.innerHTML = "zoom out";
        zoomOutButton.addEventListener('click', () => {
            console.log("zoomOutButton")
            _this.canvas.camera.zoomOut()
        })
        toolBar.appendChild(zoomOutButton);

        const fitViewButton = document.createElement('button');
        fitViewButton.innerHTML = "fitView"
        fitViewButton.addEventListener('click', () => {
            console.log("fitViewButton")
            _this.canvas.camera.fitView()
        })
        toolBar.appendChild(fitViewButton);


        // const debugOnButton = document.createElement('button');
        // debugOnButton.innerHTML = "Debug ON"
        // toolBar.appendChild(debugOnButton);

        // const debugOffButton = document.createElement('button');
        // debugOffButton.innerHTML = "Debug OFF"
        // toolBar.appendChild(debugOffButton);

        // const reDoLayoutButton = document.createElement('button');
        // reDoLayoutButton.innerHTML = "ReDoLayout"
        // toolBar.appendChild(reDoLayoutButton);

        return toolBar
    }
}