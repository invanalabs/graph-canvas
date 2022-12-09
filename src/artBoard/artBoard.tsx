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
        <div style={{"width": "60%", "height": "100%", "float": "left"}}>
            <Canvas data={props.data} addEvent={addEvent}/>
        </div>
        <div style={{"width": "40%", "height": "100%", "float": "left"}}>
            <EventStoreView events={events}/>
        </div>
    </div>;
};

export default ArtBoard;
