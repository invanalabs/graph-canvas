import { ArtBoard } from "../../artBoard";


export default class ToolBar {

    artBoard: ArtBoard;

    constructor(artBoard: ArtBoard){
        this.artBoard = artBoard
    }

    render = () => {
        const _this = this;
        const toolBar = document.createElement("div");
        toolBar.classList.add("toolBar");
        toolBar.style.top = "10px";
        toolBar.style.left = "10px";
        toolBar.style.position = "absolute"

        // redraw
        const redrawButton = document.createElement('button');
        redrawButton.innerHTML = "redraw";
        redrawButton.addEventListener('click', () => {
            console.log("redrawing")
            _this.artBoard.renderer.renderAll()
        })
        toolBar.appendChild(redrawButton);

        // clear
        const clearButton = document.createElement('button');
        clearButton.innerHTML = "clear";
        clearButton.addEventListener('click', () => {
            console.log("clearButton")
            _this.artBoard.renderer.clear()
        })
        toolBar.appendChild(clearButton);



        const zoomInButton = document.createElement('button');
        zoomInButton.innerHTML = "zoom in";
        zoomInButton.addEventListener('click', () => {
            console.log("zoomInButton")
            _this.artBoard.camera.zoomIn()
        })
        toolBar.appendChild(zoomInButton);

        const zoomOutButton = document.createElement('button');
        zoomOutButton.innerHTML = "zoom out";
        zoomOutButton.addEventListener('click', () => {
            console.log("zoomOutButton")
            _this.artBoard.camera.zoomOut()
        })
        toolBar.appendChild(zoomOutButton);

        const fitViewButton = document.createElement('button');
        fitViewButton.innerHTML = "fitView"
        fitViewButton.addEventListener('click', () => {
            console.log("fitViewButton")
            _this.artBoard.camera.fitView()
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