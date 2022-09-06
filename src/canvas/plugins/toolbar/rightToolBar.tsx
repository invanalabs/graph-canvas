import React from "react";
import {ClearOutlined, RedoOutlined, CameraOutlined, SettingOutlined} from "@ant-design/icons";
import "./toolbar.css"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export const rightToolBarOptions = [
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
    {
        key: "space-4",
        name: <div className={"divider"}></div>
    },
    {
        key: "display-settings",
        name: <OverlayTrigger placement={"bottom"}
                              overlay={
                                  <Tooltip id={`tooltip-display-settings`}>
                                      Display Settings
                                  </Tooltip>
                              }><SettingOutlined/></OverlayTrigger>
    }
];
