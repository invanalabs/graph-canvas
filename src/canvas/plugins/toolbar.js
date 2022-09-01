import G6 from "@antv/g6";
import LayoutManager from "../layouts/manager";


const layoutManager = new LayoutManager();

const toolbar = new G6.ToolBar({
    container: document.getElementById("toolbar"),
    getContent: () => {
        return `
          <ul>
            <!-- <li code='add'>Add Node</li> -->
            <li code='grid-layout'>grid layout</li>
            <li code='circle-layout'>circle layout</li>
            <li code='radial-layout'>radial layout</li>
            <li code='gforce-layout'>gforce layout</li>
            <li>|</li>
            <li code='undo' title="Undo">Undo</li>
            <li code='redo' title="Redo">redo</li>
            <li>|</li>
            <li code='zoom-in'>zoom in</li>
            <li code='zoom-out'>zoom out</li>
            <li code='fit-view'>fit view</li>
            <li>|</li>
            <li code='clear'>clear</li>
            <li>|</li>
            <li code='refresh'>refresh</li>

            <li>|</li>
            <li code='download-image'>dowload img</li>
          </ul>
        `;
    },
    handleClick: (code, graph) => {
        if (code === "add") {
            graph.addItem("node", {
                id: "node2",
                label: "node2",
                x: 300,
                y: 150
            });


        } else if (code === "grid-layout") {
            layoutManager.gridLayout(graph);
        } else if (code === "circle-layout") {
            layoutManager.circularLayout(graph)
        } else if (code === "radial-layout") {
            layoutManager.radialLayout(graph)
        } else if (code === "gforce-layout") {
            console.log("==gForceLayout", code)
            layoutManager.gForceLayout(graph)
        } else if (code === "undo") {
            toolbar.undo();
        } else if (code === "redo") {
            toolbar.redo();
        } else if (code === "zoom-in") {
            toolbar.zoomIn();
        } else if (code === "zoom-out") {
            toolbar.zoomOut();
        } else if (code === "fit-view") {
            graph.fitView([20, 20]);
        } else if (code === "download-image") {
            graph.downloadImage();
        } else if (code === "clear") {
            graph.clear();
        } else if (code === "refresh") {
            graph.refresh();
            graph.paint();
        }
    }
});

export default toolbar;