import React from "react";
import PropTypes from "prop-types";
import "./footer.css"
import {INode} from "@antv/g6";





// @ts-ignore
function Footer(props: any) {


    const selectedNode = props.selectedNodes[0] ? props.selectedNodes.length == 1 : null

    return (
        <div className="graphin-components-footer" style={props.style}>
            <div className="statusMessage float-start pt-1"><span dangerouslySetInnerHTML={{__html: props.messageText}}></span></div>
            <div className={"nodeSettings float-end"}>{selectedNode &&
                <div>node settings here</div>
            }</div>
        </div>
    )
}

Footer.propTypes = {
    style: PropTypes.object,
    messageText: PropTypes.string,
    selectedNodes: PropTypes.any
}
export default Footer