import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {ContextMenuValue, GraphinContext, IG6GraphEvent} from "@antv/graphin";
import {INode, NodeConfig} from '@antv/g6';
import Button from 'react-bootstrap/Button';
import {CloseSquareOutlined} from "@ant-design/icons"

// @ts-ignore
function HoveredItemInfo(props: any) {
    console.log("ShowSelectedNodes props", props)
    const {graph, apis} = useContext(GraphinContext);

    const createItemText = (model: any) => {
        return `<strong>${model.label}</strong>[id:${model.id}]`
    }

    useEffect(() => {

        var handleNodeMouseEnter = function handleNodeMouseEnter(evt: IG6GraphEvent) {
            // @ts-ignore
            const model = evt.item.get("model");
            props.stateManager.setHoveredItem(evt.item)
            // @ts-ignore
            props.stateManager.setMessageText(`Hovered on ${createItemText(model)}`)
        }; // eslint-disable-next-line @typescript-eslint/no-explicit-any


        var handleNodeMouseLeave = function handleNodeMouseLeave(evt: IG6GraphEvent) {
            props.stateManager.setHoveredItem(null)
            props.stateManager.setMessageText(null)
        }; // eslint-disable-next-line @typescript-eslint/no-explicit-any


        var handleEdgeMouseEnter = function handleEdgeMouseEnter(evt: IG6GraphEvent) {
            // @ts-ignore
            const model = evt.item.get("model");
            console.log("====model", model)
            props.stateManager.setHoveredItem(evt.item)
            // @ts-ignore
            props.stateManager.setMessageText(`Hovered on ${createItemText(model)}`)

        }; // eslint-disable-next-line @typescript-eslint/no-explicit-any


        var handleEdgeMouseLeave = function handleEdgeMouseLeave(evt: IG6GraphEvent) {
            props.stateManager.setHoveredItem(null)
            props.stateManager.setMessageText(null)
        };

        graph.on('node:mouseenter', handleNodeMouseEnter);
        graph.on('node:mouseleave', handleNodeMouseLeave);

        graph.on('edge:mouseenter', handleEdgeMouseEnter);
        graph.on('edge:mouseleave', handleEdgeMouseLeave);

        return function () {
            graph.off('node:mouseenter', handleNodeMouseEnter);
            graph.off('node:mouseleave', handleNodeMouseLeave);

            graph.off('edge:mouseenter', handleEdgeMouseEnter);
            graph.off('edge:mouseleave', handleEdgeMouseLeave);
        };
    }, []);
    return (<div/>)

}

HoveredItemInfo.propTypes = {
    stateManager: PropTypes.any,
}
export default HoveredItemInfo
