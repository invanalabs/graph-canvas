


import { GraphCanvas } from "../../../../canvas";
import { ICanvasLink, ICanvasNode } from "../../../../store";
import { onStoryDown } from "../../../utils/storyDown";

export default () => {

    const canvasDiv = document.getElementById("graphCanvas") as HTMLCanvasElement

    const canvas = new GraphCanvas({
        viewElement: canvasDiv,
        
    });

    const nodes: ICanvasNode[] = [
        { id: "1", group: "Person", x: 100, y: 100,  style: { size: 1 } },
        { id: "2", group: "Project", x: 450, y: 100,  style: { size: 1 } },

        { id: "3", group: "Project", x: 100, y: 200,  style: { size: 1 } },
        { id: "4", group: "Project", x: 450, y: 200,  style: { size: 1 } },

        { id: "5", group: "Person", x: 100, y: 300,  style: { size: 1 } },
        { id: "6", group: "Project", x: 450, y: 300,  style: { size: 1 } },
        
        { id: "7", group: "Person", x: 100, y: 400,  style: { size: 1 } },
        { id: "8", group: "Project", x: 450, y: 400,  style: { size: 1 } },
        
    ]

    const links: ICanvasLink[] = [
        { id: "1-2", group: "authored", label: "default", source: "1", target: "2", shapeName: "straightLine" },
        { id: "3-4", group: "authored", label: "highlighted", source: "3", target: "4", shapeName: "straightLine", state: ":highlighted" },
        { id: "5-6", group: "authored", label: "selected", source: "5", target: "6", shapeName: "straightLine", state: ":selected" },
        { id: "7-8", group: "authored", label: "muted", source: "7", target: "8", shapeName: "straightLine", state: ":muted" }
    ]


    canvas.artBoard.init().then(() => {
        canvas.dataStore.add(nodes, links)
        canvas.artBoard.camera.fitView();
    })


    onStoryDown(() => {
        canvas.artBoard.renderer.destroy();
    });

}

