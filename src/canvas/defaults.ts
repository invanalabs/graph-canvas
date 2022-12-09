import CanvasDisplaySettings, {CanvasSetting, NodeSetting, EdgeSetting, CanvasData} from "./types";
import DisplayManager from "./displayManager";
import {Node, Edge, Data, Options, NetworkEvents} from "vis-network/declarations/network/Network";

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
        interaction: {hover: true},
        nodes: settingManager.createNodeSettings({}, ""),
        edges: settingManager.createEdgeSettings({}, ""),
    }
    const {nodeLabels, edgeLabels} = detectGroups(data)
    let groups: any = {}
    console.log("Object.keys(displaySettings.nodeSettings)", Object.keys(displaySettings.nodeSettings))
    nodeLabels.forEach((label) => {
        groups[label] = settingManager.createNodeSettings({}, label)
    })


    for (const label in displaySettings.nodeSettings) {
        const groupSetting: NodeSetting = displaySettings.nodeSettings[label];
        groups[label] = settingManager.createNodeSettings(groupSetting, label)
    }
    console.log("======groups", groups)
    settings.groups = groups
    return settings
}

const createDefaultEvents = (addEvent: any) => {
    return {
        // @ts-ignore
        click: function (params?: any) {
            // // params.event = "[original event]";
            // @ts-ignore
            console.log("click event, getNodeAt returns: " + this.getNodeAt(params.pointer.DOM), addEvent);
            addEvent("click", params)
        },
        doubleClick: function (params?: any) {
            console.log("doubleClick Event:", params);
            // // params.event = "[original event]";
            addEvent("doubleClick", params)

        },
        oncontext: function (params?: any) {
            console.log("oncontext Event:", params);
            // // params.event = "[original event]";
            addEvent("oncontext", params)
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
            addEvent("dragStart", params)
        },
        dragging: function (params?: any) {
            // // params.event = "[original event]";
            addEvent("dragging", params)

        },
        dragEnd: function (params?: any) {
            // params.event = "[original event]";
            console.log("dragEnd Event:", params);
            console.log(
                // @ts-ignore
                "dragEnd event, getNodeAt returns: " + this.getNodeAt(params.pointer.DOM)
            );
            addEvent("dragEnd", params)
        },
        controlNodeDragging: function (params?: any) {
            // params.event = "[original event]";
            addEvent("controlNodeDragging", params)

        },
        controlNodeDragEnd: function (params?: any) {
            // params.event = "[original event]";
            console.log("controlNodeDragEnd Event:", params);
            addEvent("controlNodeDragEnd", params)

        },
        zoom: function (params?: any) {
            addEvent("zoom", params)

        },
        showPopup: function (params?: any) {
            addEvent("showPopup", params)

        },
        hidePopup: function () {
            console.log("hidePopup Event");
            addEvent("hidePopup", null)

        },
        select: function (params?: any) {
            console.log("select Event:", params);
            addEvent("select", params)

        },
        selectNode: function (params?: any) {
            console.log("selectNode Event:", params);
            addEvent("selectNode", params)

        },
        selectEdge: function (params?: any) {
            console.log("selectEdge Event:", params);
            addEvent("selectEdge", params)

        },
        deselectNode: function (params?: any) {
            console.log("deselectNode Event:", params);
            addEvent("deselectNode", params)

        },
        deselectEdge: function (params?: any) {
            console.log("deselectEdge Event:", params);
            addEvent("deselectEdge", params)

        },
        hoverNode: function (params?: any) {
            console.log("hoverNode Event:", params);
            addEvent("hoverNode", params)

        },
        hoverEdge: function (params?: any) {
            console.log("hoverEdge Event:", params);
            addEvent("hoverEdge", params)

        },
        blurNode: function (params?: any) {
            console.log("blurNode Event:", params);
            addEvent("blurNode", params)

        },
        blurEdge: function (params?: any) {
            console.log("blurEdge Event:", params);
            addEvent("blurEdge", params)

        },
    };

}

export default createDefaultEvents
export {createDefaultOptions}