import React from "react";
import PropTypes from "prop-types";
import "./footer.css"

// @ts-ignore
function Footer(props: any) {

    return (
        <div className="graphin-components-footer" style={props.style}>{props.messageText}</div>
    )
}

Footer.propTypes = {
    style: PropTypes.object,
    messageText: PropTypes.string
}
export default Footer