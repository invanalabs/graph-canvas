import {DataSet} from "vis-data/peer/esm/vis-data";
import {VisEventLog} from "../evenStore/eventStore";


const createDefaultEvents = (addEvent: any) => {
    return {
        // @ts-ignore
        click: function (params?: any) {
            params.event = "[original event]";
            // @ts-ignore
            console.log("click event, getNodeAt returns: " + this.getNodeAt(params.pointer.DOM), addEvent);
            addEvent("click", params)
        },
        doubleClick: function (params?: any) {
            console.log("doubleClick Event:", params);
            params.event = "[original event]";
        },
        oncontext: function (params?: any) {
            console.log("oncontext Event:", params);

            params.event = "[original event]";
        },
        dragStart: function (params?: any) {
            // There's no point in displaying this event on screen, it gets immediately overwritten
            params.event = "[original event]";
            console.log("dragStart Event:", params);
            console.log(
                "dragStart event, getNodeAt returns: " +
                // @ts-ignore

                this.getNodeAt(params.pointer.DOM)
            );
        },
        dragging: function (params?: any) {
            params.event = "[original event]";
        },
        dragEnd: function (params?: any) {
            params.event = "[original event]";
            console.log("dragEnd Event:", params);
            console.log(
                // @ts-ignore

                "dragEnd event, getNodeAt returns: " + this.getNodeAt(params.pointer.DOM)
            );
        },
        controlNodeDragging: function (params?: any) {
            params.event = "[original event]";
        },
        controlNodeDragEnd: function (params?: any) {
            params.event = "[original event]";
            console.log("controlNodeDragEnd Event:", params);
        },
        zoom: function (params?: any) {
        },
        showPopup: function (params?: any) {
        },
        hidePopup: function () {
            console.log("hidePopup Event");
        },
        select: function (params?: any) {
            console.log("select Event:", params);
        },
        selectNode: function (params?: any) {
            console.log("selectNode Event:", params);
        },
        selectEdge: function (params?: any) {
            console.log("selectEdge Event:", params);
        },
        deselectNode: function (params?: any) {
            console.log("deselectNode Event:", params);
        },
        deselectEdge: function (params?: any) {
            console.log("deselectEdge Event:", params);
        },
        hoverNode: function (params?: any) {
            console.log("hoverNode Event:", params);
        },
        hoverEdge: function (params?: any) {
            console.log("hoverEdge Event:", params);
        },
        blurNode: function (params?: any) {
            console.log("blurNode Event:", params);
        },
        blurEdge: function (params?: any) {
            console.log("blurEdge Event:", params);
        },
    };

}

export default createDefaultEvents