import React from "react";
import "./artBoard.scss"
import {Canvas} from "../canvas";
import {DataSet} from "vis-data/peer/esm/vis-data";
import {VisEventLog} from "../evenStore/eventStore";
import EventStore, {EventStoreView} from "../evenStore/eventStore"

export interface ArtBoardProps {
    label: string;
}

let defaultData = {
    nodes: [
        {id: 1, label: "Node 1"},
        {id: 2, label: "Node 2"},
        {id: 3, label: "Node 3"},
        {id: 4, label: "Node 4"},
        {id: 5, label: "Node 5"},
    ],
    edges: [
        {from: 1, to: 3},
        {from: 1, to: 2},
        {from: 2, to: 4},
        {from: 2, to: 5},
        {from: 3, to: 3},
    ],
};
const ArtBoard = (props: ArtBoardProps) => {

    const eventStore = new EventStore()
    const [ events, setEvents ] = React.useState([]);

    // subscribe to any change in the DataSet
    eventStore.data.on('*', function (event, properties, senderId) {
        console.log('event happened =====', event, properties);
        const u = eventStore.data.get();
        console.log("uuuuuuuuuuuuuuuuuuu=", u, eventStore.data);
        // @ts-ignore
        setEvents(u)
    });
    return <div className={"artBoard"}>
        <h1>Artboard</h1>
        <EventStoreView events={events}/>
        {/*<EventStoreView eventStore={eventStore}/>*/}

        <Canvas data={defaultData} eventStore={eventStore}/>
    </div>;
};

export default ArtBoard;
