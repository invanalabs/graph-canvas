import React from "react";
import {GraphinContextType} from "@antv/graphin/lib/GraphinContext";
import {
    ZoomInOutlined, ZoomOutOutlined, PartitionOutlined,
    FullscreenExitOutlined, ClearOutlined, RedoOutlined, CameraOutlined,
    ShareAltOutlined, DeploymentUnitOutlined, AppstoreOutlined
} from "@ant-design/icons";
import "./toolbar.css"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export const toolBarOptions = [
    {
        key: "zoomOut",
        // name: (
        //   <span>
        //     zoom out
        //   </span>
        // ),
        name: <OverlayTrigger placement={"bottom"}
            overlay={
                <Tooltip id={`tooltip-zoomOut`}>
                    Zoom out
                </Tooltip>
            }><ZoomOutOutlined/>
        </OverlayTrigger>
    },
    {
        key: "zoomIn",
        name: <OverlayTrigger placement={"bottom"}
            overlay={
                <Tooltip id={`tooltip-zoomIn`}>
                    Zoom In
                </Tooltip>
            }><ZoomInOutlined/></OverlayTrigger>
    }, {
        key: "fit-center",
        name: <OverlayTrigger placement={"bottom"}
            overlay={
                <Tooltip id={`tooltip-fit-center`}>
                    Fit to view
                </Tooltip>
            }><FullscreenExitOutlined/></OverlayTrigger>
    },
    {
        key: "space-1",
        name: <div className={"divider"}></div>
    },
    {
        key: "gForce-layout",
        name: <OverlayTrigger placement={"bottom"}
            overlay={
                <Tooltip id={`tooltip-gForce`}>
                    gForce Layout
                </Tooltip>
            }><ShareAltOutlined/></OverlayTrigger>
    },
    // {
    //     key: "radial-layout",
    //     name: "radial"
    // },
    {
        key: "circular-layout",
        name: <OverlayTrigger placement={"bottom"}
            overlay={
                <Tooltip id={`tooltip-circular`}>
                    Circular Layout
                </Tooltip>
            }><DeploymentUnitOutlined/></OverlayTrigger>
    }, {
        key: "grid-layout",
        name: <OverlayTrigger placement={"bottom"}
            overlay={
                <Tooltip id={`tooltip-grid`}>
                    Grid Layout
                </Tooltip>
            }><AppstoreOutlined/></OverlayTrigger>
    }, {
        key: "dagre-layout",
        name: <OverlayTrigger placement={"bottom"}
            overlay={
                <Tooltip id={`tooltip-dagre`}>
                    Dagre Layout
                </Tooltip>
            }><PartitionOutlined/></OverlayTrigger>
    }, {
        key: "space-2",
        name: <div className={"divider"}></div>
    }, {
        key: "screenshot",
        name: <OverlayTrigger placement={"bottom"}
            overlay={
                <Tooltip id={`tooltip-screenshot`}>
                    Save as Image
                </Tooltip>
            }><CameraOutlined/></OverlayTrigger>
    }, {
        key: "space-3",
        name: <div className={"divider"}></div>
    }, {
        key: "canvas-clear",
        name: <OverlayTrigger placement={"bottom"}
            overlay={
                <Tooltip id={`tooltip-clear`}>
                    Clear Canvas
                </Tooltip>
            }><ClearOutlined/></OverlayTrigger>
    }, {
        key: "canvas-redraw",
        name: <OverlayTrigger placement={"bottom"}
            overlay={
                <Tooltip id={`tooltip-redraw`}>
                    Redraw Canvas
                </Tooltip>
            }><RedoOutlined/></OverlayTrigger>
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
        name: <div className={"divider"}></div>
    },
    // {
    //     key: "add-data",
    //     name: "add data"
    // }
];
