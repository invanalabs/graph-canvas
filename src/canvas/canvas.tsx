/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */
import React, {useEffect, useRef} from "react";
import isEqual from "lodash/isEqual";
import differenceWith from "lodash/differenceWith";
import {DataSet} from "vis-data/peer/esm/vis-data";
import {Network} from "vis-network/peer/esm/vis-network";
import "vis-network/styles/vis-network.css";
import {Node, Edge, Data, Options, NetworkEvents} from "vis-network/declarations/network/Network";
import createDefaultOptions from "./defaults";
import createDefaultEventHandlers from "./eventHandlers";
import CanvasDisplaySettings, {CanvasData} from "./types";
import {
    convertCanvasNodeToVisNode,
    detectNodeSizeBasedOnEdges,
    convertCanvasEdgeToVisEdge
} from "./utils";
import {copyObject} from "../utils";

export type getNetworkCallback = (network: Network) => {};
export type eventCallback = (params?: any) => void


export interface CanvasProps {
    data?: CanvasData; // TODO - fix this later
    // options?: Options;
    logEventHandler?: any, // TODO - fix ths later
    displaySettings?: CanvasDisplaySettings,
    nodeSizeBasedOnLinks: Boolean,
    getNetwork?: getNetworkCallback;
    setSelectedElement?: (el: Node|Edge|null) => void,
    style?: {
        width: string,
        height: string
    }

}

const defaultStyle = {width: "100%", height: "100%"}
const defaultData: CanvasData = {nodes: [], edges: []}

const defaultLogEventHandler = (eventName: string, eventParams: any) => {
    console.log("using defaultLogEventHandler", eventName, eventParams)
}


const Canvas = ({
                    data = defaultData,
                    displaySettings = {},
                    nodeSizeBasedOnLinks,
                    setSelectedElement,
                    // options = defaultOptions,
                    // eventHandlers = defaultEvents,
                    logEventHandler=defaultLogEventHandler,
                    getNetwork,
                    style = defaultStyle
                }: CanvasProps) => {


    const options: Options = createDefaultOptions(displaySettings, data)

    const nodes = useRef(new DataSet(convertCanvasNodeToVisNode(data.nodes)));
    const edges = useRef(new DataSet(convertCanvasEdgeToVisEdge(data.edges)));

    if (nodeSizeBasedOnLinks) {
        const updatedNodesArray = detectNodeSizeBasedOnEdges(
            nodes.current,
            edges.current)
        nodes.current.update(updatedNodesArray)
    }

    // @ts-ignore
    let network: React.MutableRefObject<Network> = useRef(null);
    // @ts-ignore
    const container: React.MutableRefObject<HTMLElement> = useRef(null);
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

    }, [data]);

    useEffect(() => {
        network.current.setOptions(options);
    }, [options]);

    // @ts-ignore
    const eventHandlers = createDefaultEventHandlers(logEventHandler, nodes.current,
        edges.current, network.current, setSelectedElement);

    useEffect(() => {


        // Add user provided events to network
        // eslint-disable-next-line no-restricted-syntax
        for (const eventName of Object.keys(eventHandlers)) {
            // @ts-ignore
            network.current.on(eventName as NetworkEvents, eventHandlers[eventName]);
        }

        return () => {
            for (const eventName of Object.keys(eventHandlers)) {
                // @ts-ignore
                network.current.off(eventName as NetworkEvents, eventHandlers[eventName]);
            }
        };
    }, [eventHandlers]);

    // @ts-ignore
    return <div ref={container} style={style}/>;

};


export default Canvas;
