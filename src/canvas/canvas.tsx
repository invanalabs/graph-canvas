/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */
import React, {useEffect, useRef} from "react";
import isEqual from "lodash/isEqual";
import differenceWith from "lodash/differenceWith";
import {DataSet} from "vis-data/peer/esm/vis-data";
import {Network} from "vis-network/peer/esm/vis-network";
import PropTypes from "prop-types";
import "vis-network/styles/vis-network.css";
import {Node, Edge, Data, Options, NetworkEvents} from "vis-network/declarations/network/Network";
import defaultEvents from "./defaults";

const defaultOptions = {
    physics: {
        stabilization: false,
    },
    autoResize: false,
    edges: {
        smooth: false,
        color: "#000000",
        width: 0.5,
        arrows: {
            to: {
                enabled: true,
                scaleFactor: 0.5,
            },
        },
    },
};

export type getNetworkCallback = (network: Network) => {};
export type eventCallback = (params?: any) => void


export type TestData = { nodes: Node[]; edges: Edge[] };


export interface CanvasProps {
    data?: TestData; // TODO - fix this later
    options?: Options;
    // events?: { [id: string]: eventCallback };
    events?: any; // TODO - fix this later
    getNetwork?: getNetworkCallback;
    style?: {
        width: string,
        height: string
    }

}

const defaultStyle = {width: "100%", height: "100%"}
const defaultData = {nodes: [], edges: []}

const Canvas = ({
                    data = defaultData,
                    options = defaultOptions,
                    events = defaultEvents,
                    getNetwork,
                    style = defaultStyle
                }: CanvasProps) => {
    const nodes = useRef(new DataSet(data.nodes));
    const edges = useRef(new DataSet(data.edges));
    // style = ,

    // @ts-ignore
    let network: React.MutableRefObject<Network> = useRef(null);
    // @ts-ignore
    const container: React.MutableRefObject<HTMLElement> = useRef(null);
    console.log("======container", typeof container, container)
    useEffect(() => {
        network.current = new Network(
            container.current,
            {nodes: nodes.current, edges: edges.current},
            options
        );

        // @ts-ignore
        if (getNetwork) {
            getNetwork(network.current);
        }

        // if (getNodes) {
        //     getNodes(nodes.current);
        // }
        //
        // if (getEdges) {
        //     getEdges(edges.current);
        // }
    }, []);

    useEffect(() => {
        const nodesChange = !isEqual(nodes.current, data.nodes);
        const edgesChange = !isEqual(edges.current, data.edges);

        if (nodesChange) {
            const idIsEqual = (n1: Node, n2: Node) => n1.id === n2.id;
            const nodesRemoved = differenceWith(
                nodes.current.get(),
                data.nodes,
                idIsEqual
            );
            const nodesAdded = differenceWith(
                data.nodes,
                nodes.current.get(),
                idIsEqual
            );
            const nodesChanged = differenceWith(
                differenceWith(data.nodes, nodes.current.get(), isEqual),
                nodesAdded
            );

            nodes.current.remove(nodesRemoved);
            nodes.current.add(nodesAdded);
            nodes.current.update(nodesChanged);
        }

        if (edgesChange) {
            const edgesRemoved = differenceWith(
                edges.current.get(),
                data.edges,
                isEqual
            );
            const edgesAdded = differenceWith(
                data.edges,
                edges.current.get(),
                isEqual
            );
            const edgesChanged = differenceWith(
                differenceWith(data.edges, edges.current.get(), isEqual),
                edgesAdded
            );
            edges.current.remove(edgesRemoved);
            edges.current.add(edgesAdded);
            edges.current.update(edgesChanged);
        }

        if ((nodesChange || edgesChange) && getNetwork) {
            getNetwork(network.current);
        }

        // if (nodesChange && getNodes) {
        //     getNodes(nodes.current);
        // }
        //
        // if (edgesChange && getEdges) {
        //     getEdges(edges.current);
        // }
    }, [data]);

    useEffect(() => {
        network.current.setOptions(options);
    }, [options]);

    useEffect(() => {
        // Add user provied events to network
        // eslint-disable-next-line no-restricted-syntax
        for (const eventName of Object.keys(events)) {
            // @ts-ignore
            network.current.on(eventName as NetworkEvents, events[eventName]);
        }

        return () => {
            for (const eventName of Object.keys(events)) {
                // @ts-ignore
                network.current.off(eventName as NetworkEvents, events[eventName]);
            }
        };
    }, [events]);

    // @ts-ignore
    return <div ref={container} style={style}/>;

};

// Canvas.propTypes = {
//     data: PropTypes.object,
//     options: PropTypes.object,
//     events: PropTypes.object,
//     style: PropTypes.object,
//     getNetwork: PropTypes.func,
// };

export default Canvas;
