import { ArtBoard } from "../../artBoard";
import { ICanvasLink, ICanvasNode } from "../../store";
import { PluginAbstract } from "../base";
import { createToolBarButton, createToolBarToggleButton, IToolBarButton } from "./html";
import "./toolbar.css"

export default class ArtBoardToolBar implements PluginAbstract{

    artBoard: ArtBoard;

    constructor(artBoard: ArtBoard){
        this.artBoard = artBoard
    }

    render = () => {
        const toolBar = document.createElement("div");
        toolBar.classList.add("toolBar");
        toolBar.style.top = "10px";
        toolBar.style.right = "10px";
        toolBar.style.position = "absolute"


        
        const toolBarItems: IToolBarButton[] = [
            {
                htmlType: "button",
                label: "reDraw",
                helpText: "re draw the items on the canvas",
                onClickListener: () => this.artBoard.renderer.reRender()
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
            {
                htmlType : "seperator",
                label: '|'
            },
            {
                htmlType: "button",
                label: "export",
                helpText: "Export data along with positions",
                onClickListener: () => {
                    const data: {nodes: ICanvasNode[], links: ICanvasLink[]} = {"nodes":[], "links":[]}
                    data.nodes = this.artBoard.canvas.dataStore.getNodes().map(node => node.toJson())
                    data.links = this.artBoard.canvas.dataStore.getLinks().map(link => link.toJson())
                    
                    console.log("======exported data", data)
                               // Convert JSON data to string
                    const jsonString = JSON.stringify(data, null, 2);

                    // Create a Blob from the JSON string
                    const blob = new Blob([jsonString], { type: "application/json" });

                    // Create a link element
                    const link = document.createElement('a');

                    // Set the download attribute with a filename
                    link.download = 'data.json';

                    // Create a URL for the Blob and set it as the href attribute
                    link.href = window.URL.createObjectURL(blob);

                    // Append the link to the body
                    document.body.appendChild(link);

                    // Programmatically click the link to trigger the download
                    link.click();

                    // Remove the link from the document
                    document.body.removeChild(link);
                }
            },
            // {
            //     htmlType: "toggle",
            //     label: "ON",
            //     helpText: "toggle ",
            //     onClickListener: () => this.artBoard.camera.zoomOut()
            // },
            // {
            //     htmlType: "button",
            //     label: "color by groups",
            //     helpText: "color by groups ",
            //     onClickListener: () => this.artBoard.camera.zoomOut()
            // },
            // {
            //     htmlType: "button",
            //     label: "unicolor",
            //     helpText: "unicolor ",
            //     onClickListener: () => this.artBoard.camera.zoomOut()
            // },
    
        ]
        toolBarItems.forEach(toolBarItem=> {
            if (toolBarItem.htmlType === "button"){
                const btn = toolBar.appendChild(createToolBarButton(toolBarItem))
                toolBar.appendChild(btn)    
            }
            else if (toolBarItem.htmlType === "toggle"){
                const btn = toolBar.appendChild(createToolBarToggleButton(toolBarItem))
                toolBar.appendChild(btn)    
            }
            else if (toolBarItem.htmlType === "seperator"){
                const div = document.createElement("span")
                div.classList.add('toolbar-seperator')
                div.innerHTML = toolBarItem.label
                const btn = toolBar.appendChild(div)
                toolBar.appendChild(btn)   
            }else{
                console.error(`Failed to create toolBarItem - ${JSON.stringify(toolBarItem)}`)
            }
        })
        
 
       

        // const debugOnButton = document.createElement('button');
        // debugOnButton.innerHTML = "Debug ON"
        // toolBar.appendChild(debugOnButton);

        // const debugOffButton = document.createElement('button');
        // debugOffButton.innerHTML = "Debug OFF"
        // toolBar.appendChild(debugOffButton);

        // const reComputeLayoutButton = document.createElement('button');
        // reComputeLayoutButton.innerHTML = "reComputeLayout"
        // toolBar.appendChild(reComputeLayoutButton);

        return toolBar
    }
}