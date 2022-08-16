import G6 from "@antv/g6";
import defaultSettings, {testSettings} from "./settings";
import LayoutManager from "./layouts/manager";
import toolbar from "./plugins/toolbar";
import minimap from "./plugins/minimap";
import grid from "./plugins/grid";
import data2 from "../examples/data2";
import convertJSONToObjects from "./utils";
import {registerGraphinCircle} from "@antv/graphin/es/shape";
import {registerGraphinLine} from "@antv/graphin/es/shape";

registerGraphinCircle()
registerGraphinLine()

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

        this.graph.data(convertJSONToObjects(data));
        this.graph.render();
        const canvas = this.graph.get("canvas");
        canvas.set("localRefresh", true);


        // // for testing tree
        // fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
        //     .then((res) => res.json())
        //     .then((data) => {
        //         _this.graph.data(data)
        //         this.graph.render();
        //
        //         const canvas = this.graph.get("canvas");
        //         canvas.set("localRefresh", true);
        //     })


        // this.graph.data(data2)
        // this.graph.render();
        //
        // const canvas = this.graph.get("canvas");
        // canvas.set("localRefresh", true);


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


//Highlight the node and its related nodes and edges when the mouse enter the node;
        this.graph.on('afteractivaterelations', (e) => {
            // The current manipulated item
            console.log(e.item);
            // A string tag to distinguish whether the current action is `'activate'` or `'deactivate'`
            console.log(e.action);
        });

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
            _this.graph.paint();
            _this.graph.refresh();
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
