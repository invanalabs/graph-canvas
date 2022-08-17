import React from "react";
import {GraphinContextType} from "@antv/graphin/lib/GraphinContext";
import { ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";
// import '@antv/graphin-icons/dist/index.css';

export const handleToolBarClick = (graphinContext: GraphinContextType, config: any) => {
    const {apis, graph} = graphinContext;
    const {handleZoomIn, handleZoomOut} = apis;
    if (config.key === "zoomIn") {

        handleZoomOut(); // for some weird reason, this is correct
    } else if (config.key === "zoomOut") {
        handleZoomIn(); // for some weird reason, this is correct
    } else if (config.key === "add-data") {
        graph.addItem("node", {
            id: "node2",
            label: "node2",
            x: 300,
            y: 150
        });
    }
};

export const toolBarOptions = [
    {
        key: "zoomOut",
        // name: (
        //   <span>
        //     zoom out
        //   </span>
        // ),
        name: <ZoomOutOutlined />
    },
    {
        key: "zoomIn",
        name: <ZoomInOutlined />
    },
    // {
    //     key: "visSetting",
    //     name: <PieChartOutlined/>
    // },
    // {
    //     key: "clearCanvas",
    //     name: <DeleteOutlined/>
    // },
    // {
    //     key: "showHideElement",
    //     name: <VideoCameraAddOutlined/>
    // },
    {
        key: "add-data",
        name: "add data"
    }
];
