import React, {useRef} from "react";
import "./artBoard.scss"
import {Canvas} from "../canvas";
import {VisEventLog} from "../evenStore/eventStore";
import EventStoreView from "../evenStore/eventStore"
import uuidv4 from "../evenStore/utils"

export interface ArtBoardProps {
    label: string;
    data: {
        nodes: [],
        edges: []
    }
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
    let [events, setEvents] = React.useState([]);

    const addEvent = (eventName: string, eventParams: any) => {
        let old_events = JSON.parse(JSON.stringify(events));
        const d: VisEventLog = {
            id: uuidv4(),
            eventName: eventName,
            eventParams: eventParams,
            time: JSON.stringify(new Date())
        }
        old_events.push(d)
        setEvents(old_events)
    }

    return <div className={"artBoard"}>
        <h1>Artboard</h1>
        <EventStoreView events={events}/>
        <Canvas data={defaultData} addEvent={addEvent}/>
    </div>;
};

export default ArtBoard;
