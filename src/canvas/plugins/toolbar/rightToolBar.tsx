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

export const rightleftToolBarOptions = [
    {
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
    {
        key: "space-3",
        name: <div className={"divider"}></div>
    },
    {
        key: "screenshot",
        name: <OverlayTrigger placement={"bottom"}
                              overlay={
                                  <Tooltip id={`tooltip-screenshot`}>
                                      Save as Image
                                  </Tooltip>
                              }><CameraOutlined/></OverlayTrigger>
    },
];
