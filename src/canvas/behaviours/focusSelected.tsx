import React, {useContext, useEffect} from 'react';
import Graphin, {IG6GraphEvent, Utils, GraphinData, GraphinContext} from '@antv/graphin';
import {INode, NodeConfig} from '@antv/g6';
import {highlightNodeById} from "@antv/graphin/es/apis/element";

// https://graphin.antv.vision/en-US/graphin/register/behaviors/

const FocusSelectedNodes = () => {
    const {graph, apis} = useContext(GraphinContext);

    useEffect(() => {
        // if previously selected, use this to set.
        // apis.focusNodeById('node-1');

        const handleClick = (evt: IG6GraphEvent) => {
            const node = evt.item as INode;
            // const model = node.getModel() as NodeConfig;
            // apis.focusNodeById(model.id);
            graph.focusItem(node.getID(), true, {
                duration: 300,
                easing: 'easeCubic'
            });
            graph.setItemState(node, 'active', true);
            node.toFront();
        };
        graph.on('node:click', handleClick);
        return () => {
            graph.off('node:click', handleClick);
        };
    }, []);
    return null;
};
export default FocusSelectedNodes