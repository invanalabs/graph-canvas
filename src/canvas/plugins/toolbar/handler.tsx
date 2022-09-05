import {GraphinContextType} from "@antv/graphin/lib/GraphinContext";
import {layoutsOptions} from "../../layouts";

// const handleLayoutChange = (value: any) => {
//     console.log('value', value);
//     setState(value);
// };
export const handleToolBarClick = (graphinContext: GraphinContextType, config: any, stateManager: any) => {
    const {apis, graph} = graphinContext;
    const {handleZoomIn, handleZoomOut} = apis;
    const keyCode = config.key;
    if (keyCode === "zoomIn") {
        handleZoomOut(); // for some weird reason, this is correct
    } else if (keyCode === "zoomOut") {
        handleZoomIn(); // for some weird reason, this is correct
    } else if (keyCode === "add-data") {
        graph.addItem("node", {
            id: "node2",
            label: "node2",
            x: 300,
            y: 150
        });
        graph.layout()
    } else if (keyCode.endsWith("-layout")) {
        const layoutData = layoutsOptions.find(item => item.type === keyCode.replace("-layout", ""));
        stateManager.setLayoutSettings(layoutData)
    } else if (keyCode === "screenshot") {
        graph.downloadImage()
    } else if (keyCode === "fit-center") {
        graph.fitView()
    } else if (keyCode === "canvas-clear") {
        graph.clear()
    } else if (keyCode === "canvas-redraw") {
        const autoPaint = graph.get('autoPaint');
        graph.setAutoPaint(false);
        graph.render();
        graph.paint();
        graph.setAutoPaint(autoPaint);

    }

};

