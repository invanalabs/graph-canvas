import React from "react";
import {GraphinContextType} from "@antv/graphin/lib/GraphinContext";
import {ZoomInOutlined, ZoomOutOutlined, PartitionOutlined} from "@ant-design/icons";
// import '@antv/graphin-icons/dist/index.css';



export const toolBarOptions = [
    {
        key: "zoomOut",
        // name: (
        //   <span>
        //     zoom out
        //   </span>
        // ),
        name: <ZoomOutOutlined/>
    },
    {
        key: "zoomIn",
        name: <ZoomInOutlined/>
    },
    {
        key: "space-1",
        name: "|"
    },
    {
        key: "gForce-layout",
        name: "gForce"
    },    {
        key: "radial-layout",
        name: "radial"
    },    {
        key: "circular-layout",
        name: "circular"
    },    {
        key: "grid-layout",
        name: "grid"
    },    {
        key: "dagre-layout",
        name: "dagre"
    },    {
        key: "space-2",
        name: "|"
    },   {
        key: "screenshot",
        name: "screenshot"
    }, {
        key: "fit-center",
        name: "fit-center"
    },    {
        key: "space-3",
        name: "|"
    }, {
        key: "canvas-clear",
        name: "canvas-clear"
    },{
        key: "canvas-redraw",
        name: "canvas-redraw"
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
