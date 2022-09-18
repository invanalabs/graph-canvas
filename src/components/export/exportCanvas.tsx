import React, {useContext} from "react";
import PropTypes, {node} from "prop-types";
import {Card, Form, Button, InputGroup, FloatingLabel} from "react-bootstrap";
import {GraphinContext} from "@antv/graphin";
import {SearchOutlined} from "@ant-design/icons";
import {INode, NodeConfig} from '@antv/g6';
import ListGroup from 'react-bootstrap/ListGroup';

// @ts-ignore
function ExportCanvas(props: any) {

    const {apis, graph} = useContext(GraphinContext);

    // graph.downloadImage()

    return (
        <div className="rightModal bg-white" style={props.style}>
            <Card className={"h-100"}>
                <Card.Header>Export canvas</Card.Header>
                <Card.Body className={""}>

                    <Button className={"me-3"} onClick={() => graph.downloadImage("canvas.png", 'image/png' )}>PNG</Button>
                    <Button className={"me-3"} onClick={() => graph.downloadImage("canvas.jpeg", 'image/jpeg', "#ffffff" )}>JPEG</Button>
                    {/*<Button className={"me-3"} onClick={() => graph.toDataURL()}>SVG</Button>*/}


                </Card.Body>
            </Card>
        </div>
    )
}

ExportCanvas.propTypes = {
    stateManager: PropTypes.any,
}
export default ExportCanvas