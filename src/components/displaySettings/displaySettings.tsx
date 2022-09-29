import React, {useContext} from "react";
import PropTypes from "prop-types";
import {Card, FloatingLabel, Form} from "react-bootstrap";
import {ContextMenuValue, GraphinContext, IG6GraphEvent} from "@antv/graphin";


/*

nodeDisplaySettings = {
    "labelType":
    "nodeIcon": !
    "nodeSize",
    "nodeColor"
    "nodeShape",
}

 */

// @ts-ignore
function DisplaySettings(props: any) {

    const {apis, graph} = useContext(GraphinContext);
    const updateConfig = (labelType: string) => {

        // update the styles of type
        const nodes = graph.findAll('node', (node) => {
            return node.get('model').type === labelType;
        });
        // props.stateManager.
    }
    return (
        <div className="rightModal  bg-white" style={props.style}>
            <Card>
                <Card.Header>Node display settings</Card.Header>
                <Card.Body className={""}>
                    <Card.Text>
                        {Object.keys(props.stateManager.nodeDisplaySettings).map((nodeLabel, index) => {
                            const nodeSetting = props.stateManager.nodeDisplaySettings[nodeLabel];
                            if (nodeSetting) {
                                return (<div className={"propertyItem border-bottom pb-1 "}>
                                    <h6 className={"mb-1"}>{nodeLabel} :</h6>
                                    <FloatingLabel
                                        controlId="nodeDisplayFloatingTextarea"
                                        label="Node Display config"
                                        className="mb-3"
                                    > <Form.Control
                                        style={{"minHeight": "130px"}}
                                        as="textarea" placeholder="add node display config here"
                                        value={JSON.stringify(nodeSetting, null, 2)}
                                    />
                                    </FloatingLabel>
                                </div>)
                            }
                        })
                        }


                    </Card.Text>
                </Card.Body>
            </Card>
            <Card>
                <Card.Header>Edge display settings</Card.Header>
                <Card.Body className={""}>
                     <Card.Text>
                        {Object.keys(props.stateManager.edgeDisplaySettings).map((edgeLabel, index) => {
                            const edgeSetting = props.stateManager.edgeDisplaySettings[edgeLabel] || {};
                            if (edgeSetting) {
                                return (<div className={"propertyItem border-bottom pb-1 "}>
                                    <h6 className={"mb-1"}>{edgeLabel} :</h6>
                                    <FloatingLabel
                                        controlId="edgeDisplayFloatingTextarea"
                                        label="edge Display config"
                                        className="mb-3"
                                    > <Form.Control
                                        style={{"minHeight": "130px"}}
                                        as="textarea" placeholder="update edge display config here"
                                        value={JSON.stringify(edgeSetting, null, 2)}
                                    />
                                    </FloatingLabel>
                                </div>)
                            }
                        })
                        }

                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

DisplaySettings.propTypes = {
    style: PropTypes.object,
    nodeDisplaySettings: PropTypes.object,
    edgeDisplaySettings: PropTypes.object,
    stateManager: PropTypes.any,
}
export default DisplaySettings