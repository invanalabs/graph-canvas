// converting json data to G6 objects

const convertJSONToObjects = (data) => {
    return {
        nodes: data.nodes.map(function (node, i) {
            node.id = node.id.toString();
            return Object.assign({}, node);
        }),
        // edges: []
        edges: data.edges.map(function (edge, i) {
            if (edge.id) {
                edge.id = edge.id.toString();
            }
            edge.source = edge.source.toString();
            edge.target = edge.target.toString();

            return Object.assign({}, edge);
        })
    }
}

export default convertJSONToObjects