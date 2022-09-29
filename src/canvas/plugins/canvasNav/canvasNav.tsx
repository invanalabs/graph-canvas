import React, {useContext} from "react";
import PropTypes, {node} from "prop-types";
import {Card, Form, Button, InputGroup, FloatingLabel} from "react-bootstrap";
import {GraphinContext} from "@antv/graphin";
import "./canvasNav.css"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {
    AppstoreOutlined,
    ClearOutlined, DeploymentUnitOutlined, ExportOutlined,
    FullscreenExitOutlined, PartitionOutlined,
    RedoOutlined, SearchOutlined, SettingOutlined, ShareAltOutlined,
    UploadOutlined,
    ZoomInOutlined,
    ZoomOutOutlined
} from "@ant-design/icons"
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {handleCanvasNavClick} from "./handler";

// @ts-ignore
import DisplaySettings from "../../../components/displaySettings/displaySettings";
import FindAndFocus from "../../../components/find/findAndFocus";
import ExportCanvas from "../../../components/export/exportCanvas";

// @ts-ignore
function CanvasNav(props: any) {

    const {apis, graph} = useContext(GraphinContext);
    const [filteredItems, setFilteredItems] = React.useState([]);

    const clickButton = (k: string) => {
        handleCanvasNavClick(k, props.stateManager, apis, graph)
    }

    return (
        <Navbar bg="white" className={"canvasNav p-0 border"} expand="lg">
            {/* <Container> */}
            {/*<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>*/}

            <Nav className="me-auto">

                <NavDropdown title={<UploadOutlined/>} id="basic-nav-dropdown4">
                    <NavDropdown.Item href="#action/3.1">Upload from local machine</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Load from remote url</NavDropdown.Item>
                    {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                               <NavDropdown.Divider/>
                               <NavDropdown.Item href="#action/3.4">
                                   Separated link
                               </NavDropdown.Item> */}
                </NavDropdown>


                <Nav.Item className={"ps-3 pe-3 pt-0 pb-0"}>
                    <Button variant="link" size="sm" className={"text-dark"}
                            onClick={() => clickButton("canvas-clear")}>
                        <OverlayTrigger placement={"bottom"}
                                        overlay={
                                            <Tooltip id={`tooltip-clear`}>
                                                Clear Canvas
                                            </Tooltip>
                                        }>
                            <ClearOutlined/>
                        </OverlayTrigger>
                    </Button>
                </Nav.Item>
                <Nav.Item className={"ps-3 pe-3 pt-0 pb-0"}>
                    <Button variant="link" size="sm" className={"text-dark"}
                            onClick={() => clickButton("canvas-redraw")}>
                        <OverlayTrigger placement={"bottom"}
                                        overlay={
                                            <Tooltip id={`tooltip-redraw`}>
                                                Redraw Canvas
                                            </Tooltip>
                                        }><RedoOutlined/></OverlayTrigger>
                    </Button>
                </Nav.Item>
                <Nav.Item className={"divider align-middle "}>|</Nav.Item>
                <Nav.Item className={"ps-3 pe-3 pt-0 pb-0"}>
                    <Button variant="link" size="sm" className={"text-dark"}
                            onClick={() => clickButton("zoomOut")}>
                        <OverlayTrigger placement={"bottom"}
                                        overlay={
                                            <Tooltip id={`tooltip-zoomOut`}>
                                                Zoom out
                                            </Tooltip>
                                        }><ZoomOutOutlined/>
                        </OverlayTrigger>
                    </Button>
                </Nav.Item>
                <Nav.Item className={"ps-3 pe-3 pt-0 pb-0"}>
                    <Button variant="link" size="sm" className={"text-dark"}
                            onClick={() => clickButton("zoomIn")}>
                        <OverlayTrigger placement={"bottom"}
                                        overlay={
                                            <Tooltip id={`tooltip-zoomIn`}>
                                                Zoom In
                                            </Tooltip>
                                        }><ZoomInOutlined/></OverlayTrigger>
                    </Button>
                </Nav.Item>
                <Nav.Item className={"ps-3 pe-3 pt-0 pb-0"}>
                    <Button variant="link" size="sm" className={"text-dark"}
                            onClick={() => clickButton("fit-center")}>
                        <OverlayTrigger placement={"bottom"}
                                        overlay={
                                            <Tooltip id={`tooltip-fit-center`}>
                                                Fit to view
                                            </Tooltip>
                                        }><FullscreenExitOutlined/></OverlayTrigger>
                    </Button>
                </Nav.Item>
                <Nav.Item className={" divider align-middle "}>|</Nav.Item>
                <Nav.Item className={"ps-3 pe-3 pt-0 pb-0"}>
                    <Button variant="link" size="sm" className={"text-dark"}
                            onClick={() => clickButton("gForce-layout")}>
                        <OverlayTrigger placement={"bottom"}
                                        overlay={
                                            <Tooltip id={`tooltip-gForce`}>
                                                gForce Layout
                                            </Tooltip>
                                        }><ShareAltOutlined/></OverlayTrigger>
                    </Button>
                </Nav.Item>
                <Nav.Item className={"ps-3 pe-3 pt-0 pb-0"}>
                    <Button variant="link" size="sm" className={"text-dark"}
                            onClick={() => clickButton("circular-layout")}>
                        <OverlayTrigger placement={"bottom"}
                                        overlay={
                                            <Tooltip id={`tooltip-circular`}>
                                                Circular Layout
                                            </Tooltip>
                                        }><DeploymentUnitOutlined/></OverlayTrigger>
                    </Button>
                </Nav.Item>
                <Nav.Item className={"ps-3 pe-3 pt-0 pb-0"}>
                    <Button variant="link" size="sm" className={"text-dark"}
                            onClick={() => clickButton("grid-layout")}>
                        <OverlayTrigger placement={"bottom"}
                                        overlay={
                                            <Tooltip id={`tooltip-grid`}>
                                                Grid Layout
                                            </Tooltip>
                                        }><AppstoreOutlined/></OverlayTrigger>
                    </Button></Nav.Item>
                <Nav.Item className={"ps-3 pe-3 pt-0 pb-0"}>
                    <Button variant="link" size="sm" className={"text-dark"}
                            onClick={() => clickButton("dagre-layout")}>
                        <OverlayTrigger placement={"bottom"}
                                        overlay={
                                            <Tooltip id={`tooltip-dagre`}>
                                                Dagre Layout
                                            </Tooltip>
                                        }><PartitionOutlined/></OverlayTrigger>
                    </Button>
                </Nav.Item>

            </Nav>

            <Nav>
                <Nav.Item className={"ps-3 pe-3 pt-0 pb-0"}>
                    <NavDropdown className={"p-0"}
                                 title={<Button variant="link" size="sm" className={"text-dark"}
                                                onClick={() => clickButton("find-and-focus")}>

                                     <OverlayTrigger placement={"bottom"}
                                                     overlay={
                                                         <Tooltip id={`tooltip-screenshot`}>
                                                             Find and focus node in the canvas
                                                         </Tooltip>
                                                     }><SearchOutlined/></OverlayTrigger>
                                 </Button>} id="basic-nav-dropdown2" align="end">

                        <FindAndFocus/>
                    </NavDropdown>
                </Nav.Item>
                <Nav.Item className={" divider align-middle "}>|</Nav.Item>

                <Nav.Item className={"ps-3 pe-3 pt-0 pb-0"}>
                    <NavDropdown className={"p-0"}
                                 title={<Button variant="link" size="sm" className={"text-dark"}
                                                onClick={() => clickButton("screenshots")}>

                                     <OverlayTrigger placement={"bottom"}
                                                     overlay={
                                                         <Tooltip id={`export-canvas`}>
                                                             Export canvas
                                                         </Tooltip>
                                                     }><ExportOutlined/></OverlayTrigger>
                                 </Button>} id="basic-nav-dropdown1" align="end">
                        <ExportCanvas/>
                    </NavDropdown>
                </Nav.Item>
                <Nav.Item className={" divider align-middle "}>|</Nav.Item>

                <NavDropdown className={"p-0"}
                             title={<Button variant="link" size="sm" className={"text-dark"}>

                                 <OverlayTrigger placement={"bottom"}
                                                 overlay={
                                                     <Tooltip id={`tooltip-display-settings`}>
                                                         Display Settings
                                                     </Tooltip>
                                                 }><SettingOutlined/></OverlayTrigger>
                             </Button>} id="basic-nav-dropdown" align="end">

                    <DisplaySettings stateManager={props.stateManager}/>

                </NavDropdown>

                {/*<Nav.Item className={"ps-3 pe-3 pt-0 pb-0"}>Link</Nav.Item>*/}
                {/*<Nav.Item className={"ps-3 pe-3 pt-0 pb-0"}>*/}
                {/*    <NavDropdown title={<UploadOutlined/>} id="basic-nav-dropdown">*/}
                {/*        <NavDropdown title="Dropdown" id="basic-nav-dropdown3" drop="end">*/}
                {/*            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>*/}
                {/*            <NavDropdown.Item href="#action/3.2">*/}
                {/*                Another action*/}
                {/*            </NavDropdown.Item>*/}
                {/*            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
                {/*            <NavDropdown.Divider/>*/}
                {/*            <NavDropdown.Item href="#action/3.4">*/}
                {/*                Separated link*/}
                {/*            </NavDropdown.Item>*/}
                {/*        </NavDropdown>*/}

                {/*    </NavDropdown>*/}
                {/*</Nav.Item>*/}
            </Nav>
            {/* </Container> */}
        </Navbar>
    )
}

CanvasNav.propTypes = {
    stateManager: PropTypes.any,
}
export default CanvasNav