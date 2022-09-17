import React, {useContext} from "react";
import PropTypes, {node} from "prop-types";
import {Card, Form, Button, InputGroup, FloatingLabel} from "react-bootstrap";
import {GraphinContext} from "@antv/graphin";
import {SearchOutlined} from "@ant-design/icons";
import {INode, NodeConfig} from '@antv/g6';
import ListGroup from 'react-bootstrap/ListGroup';

// @ts-ignore
function FindAndFocus(props: any) {

    const {apis, graph} = useContext(GraphinContext);
    const [filteredItems, setFilteredItems] = React.useState([]);


    const searchString = (searchStr: string) => {
        console.log(searchStr);
        // update the styles of type
        const filteredItems = graph.findAll('node', (node) => {
            return node.get('model').style.label.value.toString().match(new RegExp(searchStr, "i"));
        });
        // @ts-ignore
        setFilteredItems(filteredItems);
    }

    const focusNode = (nodeId: string) => {
        apis.focusNodeById(nodeId);
    }
    return (
        <div className="rightModal bg-white" style={props.style}>
            <Card className={"h-100"}>
                <Card.Header>Find and focus</Card.Header>
                <Card.Body className={""}>
                    <Form.Control className={"mb-3"} placeholder="Search by label"
                                  onChange={(e) => searchString(e.target.value)}/>
                    {
                        filteredItems.length > 0 ?
                            <Card>
                                <ListGroup variant="flush">
                                    {filteredItems.map((filteredItem: INode, index) => {
                                        const model = filteredItem.get("model")
                                        console.log("model+++", model)
                                        if (model) {

                                            return (<ListGroup.Item key={model.id}
                                                                    style={{
                                                                        "cursor": "pointer",
                                                                        "color": model.style.keyshape.stroke ? model.style.keyshape.stroke : "auto"
                                                                    }}
                                                                    onClick={() => focusNode(model.id)}>

                                                {
                                                    model.style.icon ?
                                                        <span className="icon-foo me-1"
                                                              style={{fontFamily: model.style.icon.fontFamily,}}>
                                                    {model.style.icon.value}</span> : <span/>
                                                }
                                                {model.style.label.value.toString()}
                                            </ListGroup.Item>)
                                        }
                                    })}
                                </ListGroup>
                            </Card>
                            : <span/>
                    }

                </Card.Body>
            </Card>
        </div>
    )
}

FindAndFocus.propTypes = {
    // style: PropTypes.object,
    FindAndFocus: PropTypes.object,
    edgeDisplaySettings: PropTypes.object,
    stateManager: PropTypes.any,
}
export default FindAndFocus