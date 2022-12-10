/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */
import React, {useEffect, useRef} from "react";
import isEqual from "lodash/isEqual";
import differenceWith from "lodash/differenceWith";
import {DataSet} from "vis-data/peer/esm/vis-data";
import {Network} from "vis-network/peer/esm/vis-network";
import "vis-network/styles/vis-network.css";
import {Node, Edge, Data, Options, NetworkEvents} from "vis-network/declarations/network/Network";
import createDefaultEvents, {createDefaultOptions} from "./defaults";
import CanvasDisplaySettings, {CanvasData} from "./types";
import {convertCanvasNodeToVisNode, convertCanvasEdgeToVisEdge} from "./utils";
import {copyObject} from "../eventStore/utils";

export type getNetworkCallback = (network: Network) => {};
export type eventCallback = (params?: any) => void


export interface CanvasProps {
    data?: CanvasData; // TODO - fix this later
    // options?: Options;
    addEvent: any, // TODO - fix ths later
    displaySettings: CanvasDisplaySettings
    getNetwork?: getNetworkCallback;
    style?: {
        width: string,
        height: string
    }

}

const defaultStyle = {width: "100%", height: "100%"}
const defaultData: CanvasData = {nodes: [], edges: []}


const Canvas = ({
                    data = defaultData,
                    displaySettings,
                    // options = defaultOptions,
                    // events = defaultEvents,
                    addEvent,
                    getNetwork,
                    style = defaultStyle
                }: CanvasProps) => {


    const options: Options = createDefaultOptions(displaySettings, data)

    const nodes = useRef(new DataSet(convertCanvasNodeToVisNode(data.nodes)));
    const edges = useRef(new DataSet(convertCanvasEdgeToVisEdge(data.edges)));

    // add value to nodes
    let nodeLinkStats = {}
    nodes.current.forEach((node: Node) => {
        // @ts-ignore
        nodeLinkStats[node.id] = 0
    })
    edges.current.forEach((edge: Edge) => {
        // @ts-ignore
        nodeLinkStats[edge.from] += 1
        // @ts-ignore
        nodeLinkStats[edge.to] += 1
    })
    let nodesArray: any[] = []
    nodes.current.forEach((node: Node) => {
        // @ts-ignore
        let _ = copyObject(node)
        // @ts-ignore
        _.value = nodeLinkStats[node.id]
        nodesArray.push(_)
    })

    nodes.current.update(nodesArray);


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

    const events = createDefaultEvents(addEvent, nodes.current, edges.current, network.current);

    useEffect(() => {


        // Add user provided events to network
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


export default Canvas;
