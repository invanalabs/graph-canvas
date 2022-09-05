import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {ContextMenuValue, GraphinContext, IG6GraphEvent} from "@antv/graphin";
import {INode, NodeConfig} from '@antv/g6';
import Button from 'react-bootstrap/Button';
import {CloseSquareOutlined} from "@ant-design/icons"
import "./selectedNodes.css";

// @ts-ignore
function ShowSelectedNodes(props: any) {
    console.log("ShowSelectedNodes props", props)
    const {graph, apis} = useContext(GraphinContext);
    const {selectedNodes, stateManager} = props

    const focusOnNode = (node: INode) => {
        // const model = node.getModel() as NodeConfig;
        stateManager.focusOnNode(apis, node);
    };
    useEffect(() => {
        console.log("ShowSelectedNodes useEffect")
        const handleSelectChanged = (evt: IG6GraphEvent) => {
            console.log("handleSelectChanged", evt.selectedItems)
            // @ts-ignore
            const nodes = evt.selectedItems.nodes;
            // @ts-ignore
            if (nodes.length !== selectedNodes.length) {
                stateManager.setSelectedNodes(nodes)
            }
        };
        const handleStateChanged = (evt: IG6GraphEvent) => {
            console.log("handleStateChanged", evt.selectedItems)
            // @ts-ignore
            const nodes = graph.findAllByState('node', 'selected')
            // @ts-ignore
            stateManager.setSelectedNodes(nodes)
        };

        graph.on('nodeselectchange', handleSelectChanged);
        graph.on('afteritemstatechange', handleStateChanged);
        return () => {
            graph.off('nodeselectchange', handleSelectChanged);
            graph.off('afteritemstatechange', handleStateChanged);
        };
    }, []);

    const removeActiveNode = (node: INode) => {
        console.log("removeActiveNode", removeActiveNode)
        graph.setItemState(node, "selected", false)
    }
    return (
        <div className={"selectedNodes"} style={props.style}>
            {selectedNodes.map((node: INode) => {
                const model = node.get("model")
                console.log("model+++", model)
                if (model) {
                    return (
                        // @ts-ignore
                        <Button className="me-3 selectedNode" size="sm"
                                onClick={()=> focusOnNode(node)}
                                style={{
                                    borderColor: model.style.keyshape.stroke,
                                    color: model.style.keyshape.stroke,
                                }}
                                variant="outline-secondary" key={model.id}>
                            {model.label.toString()}
                            <CloseSquareOutlined
                                className={"ms-1"}
                                onClick={() => removeActiveNode(node)}
                                style={{"top": "-2px", "position": "relative"}}/>
                        </Button>
                    )
                }
            })}
        </div>
    )
}

ShowSelectedNodes.propTypes = {
    selectedNodes: PropTypes.any,
    stateManager: PropTypes.any,
    style: PropTypes.object
}
export default ShowSelectedNodes
