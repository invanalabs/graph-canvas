// import {NodeType} from "../../types";
import PropTypes, { any } from 'prop-types';
import { NodeDefaults } from "../../../defaults";


const SimpleNode = ({ ...props }) => {
    return (<div
        style={{
            border: '2px solid #999',
            borderTop: "5px solid " + props.accentColor ,
            background: "#fff",
            color: '#000000',
            padding: '9px 12px',
            width: 260,
            boxShadow: '0 3px 9px rgba(0, 0, 0, .35)',
        }}
    >
        <h1>SimpleNode</h1>
        <strong>ID: {props.node.id}</strong>
        <br />
        label: {props.node.label}
    </div>
    )

}
SimpleNode.propTypes = {
    node: any,
    shapeName: PropTypes.oneOf(['circle', 'square', 'reactangle']),

    label: PropTypes.string,
    labelColor: PropTypes.string,
    labelBgColor: PropTypes.string,
    
    accentColor: PropTypes.string,

    bgColor: PropTypes.string,
    bgBorderColor: PropTypes.string,
    bgBorderWidth: PropTypes.string,
    bgShadow: PropTypes.string
}

SimpleNode.defaultProps = {
    node: null,
    shapeName: 'circle',

    accentColor: '#999999',

    label: null,
    labelColor: NodeDefaults.labelColor,
    labelBgColor: NodeDefaults.labelBgColor,

    bgColor: NodeDefaults.bgColor,
    bgBorderColor: NodeDefaults.bgBorderColor,
    bgBorderWidth: NodeDefaults.bgBorderWidth,
    bgShadow: null
}

export default SimpleNode;