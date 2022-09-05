import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {ContextMenuValue, GraphinContext, IG6GraphEvent} from "@antv/graphin";
import {INode, NodeConfig} from '@antv/g6';
import Button from 'react-bootstrap/Button';
import {CloseSquareOutlined} from "@ant-design/icons"

// @ts-ignore
function ShowSelectedNodes(props) {
    console.log("ShowSelectedNodes props", props)
    const {style, stateManager, selectedNodes, setState} = props;
    const {graph, apis} = useContext(GraphinContext);
    // @ts-ignore
    const setSelectedNodes = (nodes) => {
        // stateManager.setSelectedNodes(nodes, setState);
    }

    useEffect(() => {
        console.log("ShowSelectedNodes useEffect")
        const handleSelectChanged = (evt: IG6GraphEvent) => {
            console.log("handleSelectChanged", evt.selectedItems)
            // @ts-ignore
            const nodes = evt.selectedItems.nodes;
            // @ts-ignore
            if (nodes.length !== selectedNodes.length) {
                setSelectedNodes(nodes)
            }
        };
        const handleStateChanged = (evt: IG6GraphEvent) => {
            console.log("handleStateChanged", evt.selectedItems)
            // @ts-ignore
            const nodes = graph.findAllByState('node', 'selected')
            // @ts-ignore
            setSelectedNodes(nodes)
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
        <div className={"selectedNodes"} style={style}>
            {selectedNodes.map((node: INode) => {
                const model = node.get("model")
                console.log("model---", model)

                if (model) {
                    return (

                        <Button className="me-3" size="sm" variant="outline-secondary" key={model.id}>
                            {model.label.toString()}
                            <CloseSquareOutlined
                                className={"ms-1"}
                                onClick={() => removeActiveNode(node)}
                                style={{
                                    "top": "-2px",
                                    "position": "relative"
                                }}/>
                        </Button>
                    )
                }
            })}
        </div>
    )
}

ShowSelectedNodes.propTypes = {
    stateManager: PropTypes.object,
    selectedNodes: PropTypes.any,
    setState: PropTypes.any,
    style: PropTypes.object
}
export default ShowSelectedNodes
