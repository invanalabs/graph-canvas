import CanvasDisplaySettings, {CanvasSetting, NodeSetting, EdgeSetting, CanvasData} from "./types";
import DisplayManager from "./displayManager";
import {Node, Edge, Data, Options, NetworkEvents} from "vis-network/declarations/network/Network";
import {DataSet} from "vis-data/peer/esm/vis-data";
import CanvasEventHandler from "./clickHandlers";
import {Network} from "vis-network/peer/esm/vis-network";
import {createCanvasEdge,createCanvasNode} from "./utils";

const processEvent = (params: any) => {

}

const nodeStateSufix = {
    SECONDARY_ACTIVE : "secondary-active",
    INACTIVE: "inactive",
    DEFAULT : "default"
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

        nodes: settingManager.createNodeSettings({}, undefined, nodeStateSufix.DEFAULT),
        edges: settingManager.createEdgeSettings({}, undefined),
    }
    console.log("===settings", settings)
    const {nodeLabels, edgeLabels} = detectGroups(data)
    let groups: any = {
        useDefaultGroups: false
    }
    // console.log("Object.keys(displaySettings.nodeSettings)", Object.keys(displaySettings.nodeSettings))
    // create default groups 
    nodeLabels.forEach((label) => {
        console.log("===============nodeLabels", label)
        groups[label + "-" + nodeStateSufix.DEFAULT] = settingManager.createNodeSettings({}, label, nodeStateSufix.DEFAULT)
        groups[label+ "-" + nodeStateSufix.INACTIVE] = settingManager.createNodeSettings({}, label, nodeStateSufix.INACTIVE)
        groups[label + "-" + nodeStateSufix.SECONDARY_ACTIVE] = settingManager.createNodeSettings({}, label, nodeStateSufix.SECONDARY_ACTIVE)
        
    })
    
    // override group styles with user definitions
    for (const label in displaySettings.nodeSettings) {
        console.log("=====displaySettings.nodeSettings", label)
        const groupSetting: NodeSetting = displaySettings.nodeSettings[label];
        groups[label + "-"+nodeStateSufix.DEFAULT] = settingManager.createNodeSettings(groupSetting, label, nodeStateSufix.DEFAULT)
        groups[label+ "-"+ nodeStateSufix.INACTIVE] = settingManager.createNodeSettings(groupSetting, label, nodeStateSufix.INACTIVE)
        groups[label + "-" + nodeStateSufix.SECONDARY_ACTIVE] = settingManager.createNodeSettings(groupSetting, label,nodeStateSufix.SECONDARY_ACTIVE)
    }


    console.log("======groups", groups)
    settings.groups = groups
    return settings
}

const createDefaultEventHandlers = (logEventHandler: any, 
                            nodes: DataSet<Node>, edges: DataSet<Edge>,
                             network: Network,
                             setSelectedElement: (el: any)=> void) => {

    const eventHandler = new CanvasEventHandler()
    return {
        // @ts-ignore
        click: function (params?: any) {
            // // params.event = "[original event]";
            // @ts-ignore
            const selectedNode = this.getNodeAt(params.pointer.DOM)
            console.log("click event, getNodeAt returns: " + selectedNode, logEventHandler);
            logEventHandler("click", params)
            if (selectedNode) {
                eventHandler.highlightNeighbors([selectedNode], nodes, edges, network)
            } else {
                eventHandler.resetHighlight(nodes, edges)
            }
        },
        doubleClick: function (params?: any) {
            console.log("doubleClick Event:", params);
            // // params.event = "[original event]";
            logEventHandler("doubleClick", params)

        },
        oncontext: function (params?: any) {
            console.log("oncontext Event:", params);
            // // params.event = "[original event]";
            logEventHandler("oncontext", params)
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
            logEventHandler("dragStart", params)
        },
        dragging: function (params?: any) {
            // // params.event = "[original event]";
            logEventHandler("dragging", params)

        },
        dragEnd: function (params?: any) {
            // params.event = "[original event]";
            console.log("dragEnd Event:", params);
            console.log(
                // @ts-ignore
                "dragEnd event, getNodeAt returns: " + this.getNodeAt(params.pointer.DOM)
            );
            logEventHandler("dragEnd", params)
        },
        controlNodeDragging: function (params?: any) {
            // params.event = "[original event]";
            logEventHandler("controlNodeDragging", params)

        },
        controlNodeDragEnd: function (params?: any) {
            // params.event = "[original event]";
            console.log("controlNodeDragEnd Event:", params);
            logEventHandler("controlNodeDragEnd", params)

        },
        zoom: function (params?: any) {
            logEventHandler("zoom", params)

        },
        showPopup: function (params?: any) {
            logEventHandler("showPopup", params)

        },
        hidePopup: function () {
            console.log("hidePopup Event");
            logEventHandler("hidePopup", null)

        },
        select: function (params?: any) {
            console.log("select Event:", params);
            logEventHandler("select", params)

        },
        selectNode: function (params?: any) {
            console.log("selectNode Event:", params);
            logEventHandler("selectNode", params)

        },
        selectEdge: function (params?: any) {
            console.log("selectEdge Event:", params);
            logEventHandler("selectEdge", params)

        },
        deselectNode: function (params?: any) {
            console.log("deselectNode Event:", params);
            logEventHandler("deselectNode", params)

        },
        deselectEdge: function (params?: any) {
            console.log("deselectEdge Event:", params);
            logEventHandler("deselectEdge", params)

        },
        hoverNode: function (params?: any) {
            console.log("hoverNode Event:", params);
            logEventHandler("hoverNode", params)
            // @ts-ignore
            const selectedNode = this.getNodeAt(params.pointer.DOM)
            console.log("proper hovered", selectedNode)
            setSelectedElement(createCanvasNode(nodes.get(selectedNode)))

        },
        hoverEdge: function (params?: any) {
            console.log("hoverEdge Event:", params);
            logEventHandler("hoverEdge", params)
            // @ts-ignore
            const selectedEdge = this.getEdgeAt(params.pointer.DOM)
            console.log("proper", selectedEdge)
            setSelectedElement(createCanvasEdge(edges.get(selectedEdge)))

        },
        blurNode: function (params?: any) {
            console.log("blurNode Event:", params);
            logEventHandler("blurNode", params)
            setSelectedElement(null)

        },
        blurEdge: function (params?: any) {
            console.log("blurEdge Event:", params);
            logEventHandler("blurEdge", params)
                        setSelectedElement(null)


        },
    };

}

export default createDefaultEventHandlers
export {createDefaultOptions, nodeStateSufix}