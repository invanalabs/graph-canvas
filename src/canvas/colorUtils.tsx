import Graphin from "@antv/graphin";
import iconLoader from "@antv/graphin-icons";
import PropTypes from "prop-types";

export const IconsPalette = Graphin.registerFontFamily(iconLoader);
export const ColorPalette = [
    '#5F95FF', // blue
    '#61DDAA',
    '#65789B',
    '#F6BD16',
    '#7262FD',
    '#78D3F8',
    '#9661BC',
    '#F6903D',
    '#008685',
    '#F08BB4'
];


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


// @ts-ignore
export const applyStylingToNodes = (nodes: Array<any>, nodeDisplaySettings: PropTypes.object) => {
    return nodes.map((node, i) => {
        const {id} = node;
        // const labelNo = i / 6;
        if (i < 16) {
            node.data = {type: "Company"};
        } else {
            node.data = {type: "User"};
        }

        const {type, count} = node.data;
        const color = pastel_colour(type.toLowerCase())
        node.style = {
            label: {
                value: id
            },
            keyshape: {
                size: count ? (count / 10) * 2 : 30,
                stroke: color,
                fill: color,
                fillOpacity: 0.2,
                strokeOpacity: 1
            },
            icon: {
                type: "font",
                value: IconsPalette[type.toLowerCase()],
                size: count ? count / 10 : 15,
                fill: color,
                fontFamily: "graphin"
            }
        };
        return Object.assign({}, node);

    });
}

// @ts-ignore
export const applyStylingToEdges = (edges: Array<any>, edgeDisplaySettings: PropTypes.object) => {
    return edges.map(function (edge, i) {
        edge.style = {};
        edge.data = {type: "relation"};

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
        return Object.assign({}, edge);
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