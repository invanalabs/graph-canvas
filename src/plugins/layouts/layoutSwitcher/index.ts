import { ArtBoard } from "../../../artBoard";
import D3ForceLayoutComputer from "../../../layout/d3-force";
import DagreLayoutComputer from "../../../layout/dagre";
import { PluginAbstract } from "../../base";
import { createToolBarButton, createToolBarToggleButton, IToolBarButton } from "../../toolbar/html";
import "../toolbar/toolbar.css"

export default class LayoutSwitcherToolBar implements PluginAbstract {

    artBoard: ArtBoard;

    constructor(artBoard: ArtBoard) {
        this.artBoard = artBoard
    }

    render = () => {
        const toolBar = document.createElement("div");
        toolBar.classList.add("toolBar");
        toolBar.style.top = "10px";
        toolBar.style.left = "10px";
        toolBar.style.position = "absolute"

        const d3ForceLayoutComputer = new D3ForceLayoutComputer(this.artBoard.canvas);
        // layoutInstance?.computeLayout(nodes, links);


        const dagreLayoutInstance = new DagreLayoutComputer(this.artBoard.canvas);

        const toolBarItems: IToolBarButton[] = [
            {
                htmlType: "button",
                label: "d3-force",
                onClickListener: () => {
                    d3ForceLayoutComputer?.computeLayout(
                        this.artBoard.canvas.dataStore.getNodes(),
                        this.artBoard.canvas.dataStore.getLinks()
                    );
                }
            },
            {
                htmlType: "button",
                label: "dagre",
                onClickListener: () => {
                    dagreLayoutInstance?.computeLayout(
                        this.artBoard.canvas.dataStore.getNodes(),
                        this.artBoard.canvas.dataStore.getLinks()
                    );
                }
            },
        ]
        toolBarItems.forEach(toolBarItem => {
            if (toolBarItem.htmlType === "button") {
                const btn = toolBar.appendChild(createToolBarButton(toolBarItem))
                toolBar.appendChild(btn)
            }
            else if (toolBarItem.htmlType === "toggle") {
                const btn = toolBar.appendChild(createToolBarToggleButton(toolBarItem))
                toolBar.appendChild(btn)
            }
            else if (toolBarItem.htmlType === "seperator") {
                const div = document.createElement("span")
                div.classList.add('toolbar-seperator')
                div.innerHTML = toolBarItem.label
                const btn = toolBar.appendChild(div)
                toolBar.appendChild(btn)
            } else {
                console.error(`Failed to create toolBarItem - ${JSON.stringify(toolBarItem)}`)
            }
        })


        return toolBar
    }
}