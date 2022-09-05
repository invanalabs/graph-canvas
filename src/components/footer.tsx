import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import ShowSelectedNodes from "./selectedNodes";

// @ts-ignore
function Footer(props: any) {

    return (
        <div className="graphin-components-footer" style={props.style}>Footer here</div>
    )
}

Footer.propTypes = {
    style: PropTypes.object
}
export default Footer