import { ArtBoard } from "../../artBoard";
import { createToolBarButton, IToolBarButton } from "./html";
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
                htmlType: "button",
                label: "redraw",
                helpText: "re draw the items on the canvas",
                onClickListener: () => this.artBoard.renderer.renderAll()
            },
            {
                htmlType: "button",
                label: "clear",
                helpText: "clears the items on the canvas",
                onClickListener: () => this.artBoard.renderer.clear()
            },
            {
                htmlType : "seperator",
                label: '|'
            },
            {
                htmlType: "button",
                label: "+",
                helpText: "zoom in to the canvas",
                onClickListener: () => this.artBoard.camera.zoomIn()
            },
            {
                htmlType: "button",
                label: "fitview",
                helpText: "clears the items on the canvas",
                onClickListener: () => this.artBoard.camera.fitView()
            },
            {
                htmlType: "button",
                label: "-",
                helpText: "zoom out of the canvas",
                onClickListener: () => this.artBoard.camera.zoomOut()
            },
            // {
            //     htmlType : "seperator",
            //     label: '|'
            // },
    
        ]
        toolBarItems.forEach(toolBarItem=> {
            if (toolBarItem.htmlType === "button"){
                const btn = toolBar.appendChild(createToolBarButton(toolBarItem))
                toolBar.appendChild(btn)    
            }
            else if (toolBarItem.htmlType === "seperator"){
                const div = document.createElement("span")
                div.classList.add('toolbar-seperator')
                div.innerHTML = toolBarItem.label
                const btn = toolBar.appendChild(div)
                toolBar.appendChild(btn)   
            }else{
                console.error(`Failed to create toolBarItem - ${toolBarItem}`)
            }
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