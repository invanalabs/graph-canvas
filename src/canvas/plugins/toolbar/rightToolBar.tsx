import React from "react";
import {ClearOutlined, RedoOutlined, SearchOutlined ,  CameraOutlined, SettingOutlined} from "@ant-design/icons";
import "./toolbar.css"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export const rightToolBarOptions = [

    {
        key: "find-and-focus",
        name: <OverlayTrigger placement={"bottom"}
                              overlay={
                                  <Tooltip id={`tooltip-screenshot`}>
                                      Find and focus node
                                  </Tooltip>
                              }><SearchOutlined/></OverlayTrigger>
    },
    {
        key: "space-4",
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
        key: "space-5",
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
