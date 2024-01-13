import React from 'react';
import PropTypes from "prop-types";
import NetworkLayout from '../../layouts/network';
import data from "../datasets/nivo-dataset";


export const NetworkLayoutStory = ({data})=> (
    <div  style={{ height: 650, }}>
       <NetworkLayout data={data}  />
    </div>
)

NetworkLayoutStory.propTypes = {
    data: PropTypes.any
}

// NetworkLayoutStory.defaultProps = {
//     data: data
// }
