import { ArtBoard } from "../../artBoard";
import { createToolBarButton, IToolBarButton } from "../../utils/html";
import "./toolbar.css"

export default class ToolBar {

    artBoard: ArtBoard;

    constructor(artBoard: ArtBoard){
        this.artBoard = artBoard
    }

    render = () => {
        const toolBar = document.createElement("div");
        toolBar.classList.add("toolBar");
        toolBar.style.top = "10px";
        toolBar.style.left = "10px";
        toolBar.style.position = "absolute"


        
        const toolBarItems: IToolBarButton[] = [
            {
                label: "redraw",
                helpText: "re draw the items on the canvas",
                onClickListener: () => this.artBoard.renderer.renderAll()
            },
            {
                label: "clear",
                helpText: "clears the items on the canvas",
                onClickListener: () => this.artBoard.renderer.clear()
            },
            {
                label: "-",
                helpText: "zoom in to the canvas",
                onClickListener: () => this.artBoard.camera.zoomIn()
            },
            {
                label: "fitview",
                helpText: "clears the items on the canvas",
                onClickListener: () => this.artBoard.camera.fitView()
            },
            {
                label: "+",
                helpText: "zoom out of the canvas",
                onClickListener: () => this.artBoard.camera.zoomOut()
            },
           
            

        ]
        toolBarItems.forEach(toolBarItem=> {
            const btn = toolBar.appendChild(createToolBarButton(toolBarItem))
            toolBar.appendChild(btn)
        })
        
 
       

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