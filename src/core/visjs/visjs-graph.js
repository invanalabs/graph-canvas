/*
 * Copyright 2021 Invana
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http:www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */
import React, {useEffect, useRef} from "react";
import isEqual from "lodash/isEqual";
import differenceWith from "lodash/differenceWith";
import {Network} from "vis-network/peer/esm/vis-network";
import {DataSet} from "vis-data/peer/esm/vis-data";
import PropTypes from "prop-types";
import "vis-network/styles/vis-network.css";
import ArtBoard from "../artboard";
 

const VisJsGraph = ({
                   containerId,
                   artBoard,
       
                   options = {},
                   events = {},
                   style = {},
                //    getNetwork,
                   getNodes,
                   getEdges,
               }) => {
    const nodes = useRef(artBoard.dataStore.nodes);
    const edges = useRef(artBoard.dataStore.edges);
    const network = useRef(null);
    const container = useRef(null);

    useEffect(() => {
        network.current = new Network(
            container.current,
            {nodes: nodes.current, edges: edges.current},
            options
        );
 
        artBoard.setNetwork(network.current);
  

        if (getNodes) {
            getNodes(nodes.current);
        }

        if (getEdges) {
            getEdges(edges.current);
        }
    }, []);

    useEffect(() => {
        const nodesChange = !isEqual(nodes.current, artBoard.dataStore.nodes);
        const edgesChange = !isEqual(edges.current, artBoard.dataStore.edges);

        if (nodesChange) {
            const idIsEqual = (n1, n2) => n1.id === n2.id;
            const nodesRemoved = differenceWith(
                nodes.current.get(),
                artBoard.dataStore.nodes,
                idIsEqual
            );
            const nodesAdded = differenceWith(
                artBoard.dataStore.nodes,
                nodes.current.get(),
                idIsEqual
            );
            const nodesChanged = differenceWith(
                differenceWith(artBoard.dataStore.nodes, nodes.current.get(), isEqual),
                nodesAdded
            );

            nodes.current.remove(nodesRemoved);
            nodes.current.add(nodesAdded);
            nodes.current.update(nodesChanged);
        }

        if (edgesChange) {
            const edgesRemoved = differenceWith(
                edges.current.get(),
                artBoard.dataStore.edges,
                isEqual
            );
            const edgesAdded = differenceWith(
                artBoard.dataStore.edges,
                edges.current.get(),
                isEqual
            );
            const edgesChanged = differenceWith(
                differenceWith(artBoard.dataStore.edges, edges.current.get(), isEqual),
                edgesAdded
            );
            edges.current.remove(edgesRemoved);
            edges.current.add(edgesAdded);
            edges.current.update(edgesChanged);
        }

        if (nodesChange || edgesChange) {
            artBoard.setNetwork(network.current);
        }

        if (nodesChange && getNodes) {
            getNodes(nodes.current);
        }

        if (edgesChange && getEdges) {
            getEdges(edges.current);
        }
    }, [artBoard.dataStore]);

    useEffect(() => {
        network.current.setOptions(options);
    }, [options]);

    useEffect(() => {
        // Add user provied events to network
        // eslint-disable-next-line no-restricted-syntax
        for (const eventName of Object.keys(events)) {
            network.current.on(eventName, events[eventName]);
        }

        return () => {
            for (const eventName of Object.keys(events)) {
                network.current.off(eventName, events[eventName]);
            }
        };
    }, [events]);

    return (<div id={containerId} ref={container} style={style}/>);
};

VisJsGraph.propTypes = {
    containerId: PropTypes.string,
    artBoard: ArtBoard,
 
    options: PropTypes.object,
    events: PropTypes.object,
    style: PropTypes.object,
    // getNetwork: PropTypes.func,
    getNodes: PropTypes.func,
    getEdges: PropTypes.func,
};

export default VisJsGraph;