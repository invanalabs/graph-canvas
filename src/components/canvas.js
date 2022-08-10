import G6 from "@antv/g6";
import defaultSettings, {testSettings} from "../canvas/settings";
import LayoutManager from "../canvas/layouts/manager";
import toolbar from "../canvas/plugins/toolbar";
import minimap from "../canvas/plugins/minimap";
import grid from "../canvas/plugins/grid";

export default class GraphCanvas {
    constructor(containerId, canvasWidth, canvasHeight) {
        this.container = document.getElementById(containerId);

        this.containerId = containerId;
        this.canvasWidth = canvasWidth || this.container.scrollWidth;
        this.canvasHeight = canvasHeight || this.container.scrollHeight || 600;

        /*
        to ignore sideeffects from StrictMode
        which happens when componentDidMount is triggered twice
        */
        this.removeAllChildNodes(this.container);
        this.graph = this.createGraph();
        this.menu = new LayoutManager(this.graph);
        console.log("this.graph", this.graph.getContainer());
    }

    removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    getSettings() {
        let defaultSettings_ = Object.assign({}, defaultSettings);
        // let defaultSettings_ = Object.assign({}, testSettings);
        // Configure Grid and Minimap to the graph


        defaultSettings_.plugins = [grid, minimap, toolbar];

        defaultSettings_.height = this.canvasHeight;
        defaultSettings_.width = this.canvasWidth;
        defaultSettings_.container = this.container;
        return defaultSettings_;
    }

    createGraph() {
        console.log("createGraph");
        return new G6.Graph(this.getSettings());
    }

    refreshDragedNodePosition(e) {
        const model = e.item.get("model");
        model.fx = e.x;
        model.fy = e.y;
        model.x = e.x;
        model.y = e.y;
    }

    render(data) {
        const _this = this;

        G6.Util.processParallelEdges(data.edges);

        this.graph.data({
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
        });
        this.graph.render();

        const canvas = this.graph.get("canvas");
        canvas.set("localRefresh", true);

        // this.graph.on("node:dragstart", function (e) {
        //   const forceLayout = _this.graph.get("layoutController").layoutMethods[0];
        //   forceLayout.stop();
        // });

        // this.graph.on("node:drag", function (e) {
        //   _this.refreshDragedNodePosition(e);
        //   _this.graph.layout();
        // });

        // this.graph.on("node:dragstart", function (e) {
        //   _this.graph.layout();
        //   _this.refreshDragedNodePosition(e);
        // });

        // this.graph.on("node:drag", function (e) {
        //   const forceLayout = _this.graph.get("layoutController").layoutMethods[0];
        //   forceLayout.execute();
        //   _this.refreshDragedNodePosition(e);
        // });

        // this.graph.on("node:dragend", function (e) {
        //   e.item.get("model").fx = null;
        //   e.item.get("model").fy = null;
        // });

        // Listen to the mouse enter event on node
        this.graph.on("node:mouseenter", (evt) => {
            const node = evt.item;
            // activate the hover state of the node
            _this.graph.setItemState(node, "hover", true);
        });
        // Listen to the mouse leave event on node
        this.graph.on("node:mouseleave", (evt) => {
            const node = evt.item;
            // inactivate the hover state of the node
            _this.graph.setItemState(node, "hover", false);
        });

        this.graph.on("edge:mouseenter", (evt) => {
            const {item} = evt;
            _this.graph.setItemState(item, "active", true);
        });

        this.graph.on("edge:mouseleave", (evt) => {
            const {item} = evt;
            _this.graph.setItemState(item, "active", false);
        });

        this.graph.on("edge:click", (evt) => {
            const {item} = evt;
            _this.graph.setItemState(item, "selected", true);
        });

        this.graph.on("canvas:click", (evt) => {
            _this.graph.getEdges().forEach((edge) => {
                _this.graph.clearItemStates(edge);
            });
        });

        this.graph.on("afterlayout", function () {
            //descriptionDiv.innerHTML = 'Done!';
            console.log("after layout is done.");
            const nodes = _this.graph.getNodes();
            const edges = _this.graph.getEdges();
            nodes.forEach((node) => {
                node.show();
            });
            edges.forEach((edge) => {
                edge.show();
            });
            _this.graph.fitView();
        });
        this.graph.on("beforelayout", function () {
            //descriptionDiv.innerHTML = 'Done!';
            console.log("before layout is done.");
            const nodes = _this.graph.getNodes();
            const edges = _this.graph.getEdges();
            nodes.forEach((node) => {
                node.hide();
            });
            edges.forEach((edge) => {
                edge.hide();
            });
        });

        if (typeof window !== "undefined")
            window.onresize = () => {
                if (!_this.graph || _this.graph.get("destroyed")) return;
                if (
                    !_this.container ||
                    !_this.container.scrollWidth ||
                    !_this.container.scrollHeight
                )
                    return;
                _this.graph.changeSize(
                    _this.container.scrollWidth,
                    _this.container.scrollHeight
                );
            };
    }
}
