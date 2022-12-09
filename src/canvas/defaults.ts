import {CanvasSetting, NodeSetting, EdgeSetting} from "./types";
import DisplayManager from "./displayManager";

const processEvent = (params: any) => {

}


const defaultCanvasSettings: CanvasSetting = {
    backgroundColor: "#ffffff"
}


const defaultNodeSettings: NodeSetting = {
    labelField: "id",
    labelColor: "#333333",
    shapeColor: "#2256bb",
    shape: "dot",
    shapeSize: 12
    // shapeIcon?: string
}

const defaultEdgeSettings: EdgeSetting = {
    arrowColor: "#333333",
    arrowShape: "continuous",
    labelField: "id",
    labelColor: "#333333"

}

const createDefaultOptions = () => {
    const settingManager = new DisplayManager()

    return {
        physics: false,
        autoResize: true,
        interaction: {hover: true},
        nodes: settingManager.createNodeSettings(defaultNodeSettings),
        edges: settingManager.createEdgeSettings(defaultEdgeSettings)

    }
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