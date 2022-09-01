import React from "react";
import {GraphinContextType} from "@antv/graphin/lib/GraphinContext";
import {
    ZoomInOutlined, ZoomOutOutlined, PartitionOutlined,
    FullscreenExitOutlined, ClearOutlined, RedoOutlined, CameraOutlined,
    ShareAltOutlined, DeploymentUnitOutlined, AppstoreOutlined
} from "@ant-design/icons";
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
    }, {
        key: "fit-center",
        name: <FullscreenExitOutlined/>
    },
    {
        key: "space-1",
        name: "|"
    },
    {
        key: "gForce-layout",
        name: <ShareAltOutlined />
    },
    // {
    //     key: "radial-layout",
    //     name: "radial"
    // },
    {
        key: "circular-layout",
        name: <DeploymentUnitOutlined />
    }, {
        key: "grid-layout",
        name: <AppstoreOutlined />
    }, {
        key: "dagre-layout",
        name: <PartitionOutlined />
    }, {
        key: "space-2",
        name: "|"
    }, {
        key: "screenshot",
        name: <CameraOutlined/>
    }, {
        key: "space-3",
        name: "|"
    }, {
        key: "canvas-clear",
        name: <ClearOutlined/>
    }, {
        key: "canvas-redraw",
        name: <RedoOutlined/>
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
        key: "space-4",
        name: "|"
    },
    {
        key: "add-data",
        name: "add data"
    }
];
