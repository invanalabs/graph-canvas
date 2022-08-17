// create g6 graph instance

export default class GraphCanvas {
  graph = null;
  constructor(props) {
    this.graph = this.createGraph(props);
  }

  createGraph(props) {}

  updateData(data) {
    this.graph.changeData(data);
  }

  removeNodes(nodeIds) {}

  removeEdges(edgeIds) {}
}
