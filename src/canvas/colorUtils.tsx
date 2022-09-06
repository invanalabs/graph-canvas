import Graphin from "@antv/graphin";
import iconLoader from "@antv/graphin-icons";
import PropTypes from "prop-types";
import {INode} from '@antv/g6';
import {IUserNode, IUserEdge} from "@antv/graphin/lib/typings/type";
export const IconsPalette = Graphin.registerFontFamily(iconLoader);
// export const ColorPalette = [
//     '#5F95FF', // blue
//     '#61DDAA',
//     '#65789B',
//     '#F6BD16',
//     '#7262FD',
//     '#78D3F8',
//     '#9661BC',
//     '#F6903D',
//     '#008685',
//     '#F08BB4'
// ];


function lightOrDark(color: any) {
    let r, g, b
    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {

        // If HEX --> store the red, green, blue values in separate variables
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

        r = color[1];
        g = color[2];
        b = color[3];
    } else {

        // If RGB --> Convert it to HEX: http://gist.github.com/983661
        color = +("0x" + color.slice(1).replace(
                color.length < 5 && /./g, '$&$&'
            )
        );

        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }

    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    let hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
    );

    // Using the HSP value, determine whether the color is light or dark
    if (hsp > 127.5) {

        return 'light';
    } else {

        return 'dark';
    }
}

const pastel_colour = function (str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = '#';
    for (let i = 0; i < 3; i++) {
        let value = (hash >> (i * 8)) & 0xFF;
        colour += ('00' + value.toString(16)).substr(-2);
    }

    if (lightOrDark(colour) === "dark") {
        return colour
    } else {
        pastel_colour(str + "1")
    }
}

const generateNodeStyle = (node: INode, styleData: object) => {
    // @ts-ignore
    const labelType = node.label;


    console.log("=====node", node)
    // @ts-ignore
    const color = (styleData && styleData.nodeColor) ? styleData.nodeColor : pastel_colour(labelType.toLowerCase())
    // @ts-ignore
    const nodeSize = (styleData && styleData.nodeSize) ? styleData.nodeSize : 28
    // @ts-ignore
    const nodeIcon = (styleData && styleData.nodeIcon) ? styleData.nodeIcon : null
    // @ts-ignore
    const nodeShape = (styleData && styleData.nodeShape) ? styleData.nodeShape : "graphin-circle"

    const iconSize = nodeSize * 0.5

    let data = {
        label: {
            // @ts-ignore
            value: node.id
        },
        keyshape: {
            size: nodeSize,
            stroke: color,
            fill: color,
            fillOpacity: 0.2,
            strokeOpacity: 1
        },

    };

    if (nodeIcon) {
        // @ts-ignore
        data["icon"] = {
            type: "font",
            value: IconsPalette[nodeIcon],
            size: iconSize,
            fill: color,
            fontFamily: "graphin"
        }
    }

    return data
}
// @ts-ignore
export const applyStylingToNodes = (nodes: Array<any>, nodeDisplaySettings: PropTypes.object) => {
    return nodes.map((node, i) => {
        // @ts-ignore
        node.originalId = node.id;

        // @ts-ignore
        node.id = node.id.toString();
        // const labelNo = i / 6;
        if (i < 16) {
            node.data = {type: "Company"};
        } else {
            node.data = {type: "User"};
        }
        const type = node.data.type;
        node.style = generateNodeStyle(node, nodeDisplaySettings[type])
        return Object.assign({}, node) as IUserNode;

    });
}

// @ts-ignore
export const applyStylingToEdges = (edges: Array<any>, edgeDisplaySettings: PropTypes.object) => {
    return edges.map(function (edge, i) {
        if (edge.id) {
            // @ts-ignore
            edge.originalId = edge.id;

            // @ts-ignore
            edge.id = edge.id.toString();
        }
        edge.style = {};
        edge.data = {type: "relation"};
        edge.sourceOriginal = edge.source
        edge.source = edge.source.toString()

        edge.targetOriginal = edge.target
        edge.target = edge.target.toString()

        const color = pastel_colour(edge.data.type.toLowerCase())

        edge.style.label = {
            value: edge.source.toString() + "-" + edge.target.toString(),
            fill: color, // assign color based on edge type
            background: {
                fill: "#fff",
                radius: 8,
                stroke: "#fff"
            },
            strokeOpacity: 0
        };

        edge.style.keyshape = {
            stroke: color // assign color based on edge type
        };
        return Object.assign({}, edge) as IUserEdge;
    });
}


export const applyStylesToData = (data: { nodes: Array<any>, edges: Array<any> },
                                  // @ts-ignore
                                  nodeDisplaySettings: PropTypes.object, edgeDisplaySettings: PropTypes.object) => {
    return {
        nodes: applyStylingToNodes(data.nodes, nodeDisplaySettings),
        edges: applyStylingToEdges(data.edges, edgeDisplaySettings)
    }
}