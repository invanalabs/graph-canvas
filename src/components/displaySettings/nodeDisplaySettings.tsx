import React from "react";
import PropTypes from "prop-types";
import {Card} from "react-bootstrap";


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
function NodeDisplaySettings(props: any) {
    return (
        <div className="nodeDisplaySettings bg-white" style={props.style}>
            <Card  style={{height: "100%"}}>
                <Card.Header>Display Settings</Card.Header>
                <Card.Body className={""}>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

NodeDisplaySettings.propTypes = {
    style: PropTypes.object,
}
export default NodeDisplaySettings