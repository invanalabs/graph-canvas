import Graphin from "@antv/graphin";
import iconLoader from "@antv/graphin-icons";

export const ColorPalette: { [key: string]: any } = {
    user: "#b74b4b",
    company: "#59839a"
};

export const IconsPalette = Graphin.registerFontFamily(iconLoader);


// export const IconsPalette: { [key: string]: any } = {
//     // use this for selectively show few icons
// }

export const applyStylingToNodes = (nodes: Array<any>) => {
    return nodes.map((node, i) => {
        const {id} = node;
        // const labelNo = i / 6;
        if (i < 16) {
            node.data = {type: "Company"};
        } else {
            node.data = {type: "User"};
        }

        const {type, count} = node.data;
        node.style = {
            label: {
                value: id
            },
            keyshape: {
                size: count ? (count / 10) * 2 : 30,
                stroke: ColorPalette[type.toLowerCase()],
                fill: ColorPalette[type.toLowerCase()],
                fillOpacity: 0.2,
                strokeOpacity: 1
            },
            icon: {
                type: "font",
                value: IconsPalette[type.toLowerCase()],
                size: count ? count / 10 : 15,
                fill: ColorPalette[type.toLowerCase()],
                fontFamily: "graphin"
            }
        };
        return Object.assign({}, node);

    });
}

export const applyStylingToEdges = (edges: Array<any>) => {
    return edges.map(function (edge, i) {
        edge.style = {};
        edge.style.label = {
            value: edge.source.toString() + "-" + edge.target.toString(),
            fill: ColorPalette.user, // assign color based on edge type
            background: {
                fill: "#fff",
                radius: 8,
                stroke: "#fff"
            },
            strokeOpacity: 0
        };

        edge.style.keyshape = {
            stroke: ColorPalette.user // assign color based on edge type
        };
        return Object.assign({}, edge);
    });
}

export const applyStylesToData = (data: { nodes: Array<any>, edges: Array<any> }) => {
    return {
        nodes: applyStylingToNodes(data.nodes),
        edges: applyStylingToEdges(data.edges)
    }
}