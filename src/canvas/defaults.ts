import CanvasDisplaySettings, {CanvasSetting, NodeSetting, EdgeSetting, CanvasData} from "./types";
import DisplayManager from "./displayManager";
import {Node, Edge, Data, Options, NetworkEvents} from "vis-network/declarations/network/Network";
import {DataSet} from "vis-data/peer/esm/vis-data";
import CanvasEventHandler from "./clickHandlers";
import {Network} from "vis-network/peer/esm/vis-network";

const processEvent = (params: any) => {

}


const detectGroups = (data: CanvasData) => {
    let nodeLabels = [...new Set(data.nodes.map(node => node.label))]
    let edgeLabels = [...new Set(data.edges.map(edge => edge.label))]
    return {nodeLabels, edgeLabels}
}


const createDefaultOptions = (displaySettings: CanvasDisplaySettings, data: CanvasData) => {
    const settingManager = new DisplayManager()

    let settings: Options = {
        physics: false,
        autoResize: true,
        // physics: {
        //     stabilization: true,
            // barnesHut: {
            //     gravitationalConstant: -80000,
            //     springConstant: 0.001,
            //     springLength: 200,
            // },
        // },
        interaction: {
            tooltipDelay: 200,
            hover: true,
            hideEdgesOnDrag: true,
        },

        nodes: settingManager.createNodeSettings({}, undefined),
        edges: settingManager.createEdgeSettings({}, undefined),
    }
    const {nodeLabels, edgeLabels} = detectGroups(data)
    let groups: any = {}
    console.log("Object.keys(displaySettings.nodeSettings)", Object.keys(displaySettings.nodeSettings))
    nodeLabels.forEach((label) => {
        console.log("===============nodeLabels", label)
        groups[label] = settingManager.createNodeSettings({}, label)
    })


    for (const label in displaySettings.nodeSettings) {
        console.log("=====displaySettings.nodeSettings", label)
        const groupSetting: NodeSetting = displaySettings.nodeSettings[label];
        groups[label] = settingManager.createNodeSettings(groupSetting, label)
    }
    console.log("======groups", groups)
    // settings.groups = groups
    return settings
}

const createDefaultEvents = (logEvent: any, nodes: DataSet<Node>, edges: DataSet<Edge>,
                             network: Network) => {

    const eventHandler = new CanvasEventHandler()
    return {
        // @ts-ignore
        click: function (params?: any) {
            // // params.event = "[original event]";
            // @ts-ignore
            const selectedNode = this.getNodeAt(params.pointer.DOM)
            console.log("click event, getNodeAt returns: " + selectedNode, logEvent);
            logEvent("click", params)
            if (selectedNode) {
                eventHandler.highlightNeighbors([selectedNode], nodes, edges, network)
            } else {
                eventHandler.resetHighlight(nodes, edges)
            }
        },
        doubleClick: function (params?: any) {
            console.log("doubleClick Event:", params);
            // // params.event = "[original event]";
            logEvent("doubleClick", params)

        },
        oncontext: function (params?: any) {
            console.log("oncontext Event:", params);
            // // params.event = "[original event]";
            logEvent("oncontext", params)
        },
        dragStart: function (params?: any) {
            // There's no point in displaying this event on screen, it gets immediately overwritten
            // // params.event = "[original event]";
            console.log("dragStart Event:", params);
            console.log(
                "dragStart event, getNodeAt returns: " +
                // @ts-ignore
                this.getNodeAt(params.pointer.DOM)
            );
            logEvent("dragStart", params)
        },
        dragging: function (params?: any) {
            // // params.event = "[original event]";
            logEvent("dragging", params)

        },
        dragEnd: function (params?: any) {
            // params.event = "[original event]";
            console.log("dragEnd Event:", params);
            console.log(
                // @ts-ignore
                "dragEnd event, getNodeAt returns: " + this.getNodeAt(params.pointer.DOM)
            );
            logEvent("dragEnd", params)
        },
        controlNodeDragging: function (params?: any) {
            // params.event = "[original event]";
            logEvent("controlNodeDragging", params)

        },
        controlNodeDragEnd: function (params?: any) {
            // params.event = "[original event]";
            console.log("controlNodeDragEnd Event:", params);
            logEvent("controlNodeDragEnd", params)

        },
        zoom: function (params?: any) {
            logEvent("zoom", params)

        },
        showPopup: function (params?: any) {
            logEvent("showPopup", params)

        },
        hidePopup: function () {
            console.log("hidePopup Event");
            logEvent("hidePopup", null)

        },
        select: function (params?: any) {
            console.log("select Event:", params);
            logEvent("select", params)

        },
        selectNode: function (params?: any) {
            console.log("selectNode Event:", params);
            logEvent("selectNode", params)

        },
        selectEdge: function (params?: any) {
            console.log("selectEdge Event:", params);
            logEvent("selectEdge", params)

        },
        deselectNode: function (params?: any) {
            console.log("deselectNode Event:", params);
            logEvent("deselectNode", params)

        },
        deselectEdge: function (params?: any) {
            console.log("deselectEdge Event:", params);
            logEvent("deselectEdge", params)

        },
        hoverNode: function (params?: any) {
            console.log("hoverNode Event:", params);
            logEvent("hoverNode", params)

        },
        hoverEdge: function (params?: any) {
            console.log("hoverEdge Event:", params);
            logEvent("hoverEdge", params)

        },
        blurNode: function (params?: any) {
            console.log("blurNode Event:", params);
            logEvent("blurNode", params)

        },
        blurEdge: function (params?: any) {
            console.log("blurEdge Event:", params);
            logEvent("blurEdge", params)

        },
    };

}

export default createDefaultEvents
export {createDefaultOptions}