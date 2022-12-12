import React, {useRef} from "react";
import "./artBoard.scss"
import {Canvas} from "../canvas";
import {VisEventLog} from "../eventStore/eventStore";
import EventStoreView from "../eventStore/eventStore"
import uuidv4 from "../eventStore/utils"
import CanvasDisplaySettings, {CanvasData} from "../canvas/types"
import GraphSchema from "../components/graphSchema/graphSchema";


export interface ArtBoardProps {
    // label: string;
    data: CanvasData,
    displaySettings: CanvasDisplaySettings
}


const ArtBoard = ({data, displaySettings}: ArtBoardProps) => {
    let [events, setEvents] = React.useState([]);

    const logEvent = (eventName: string, eventParams: any) => {
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
        {/*<h1>Artboard</h1>*/}
        <div style={{"width": "60%", "height": "100%", "float": "left"}}>
            <Canvas data={data} logEvent={logEvent}
                    nodeSizeBasedOnLinks={true}
                    displaySettings={displaySettings}/>
        </div>
        <div style={{"width": "40%", "height": "100%", "float": "left"}}>
            <GraphSchema canvasData={data}/>
            <EventStoreView events={events}/>
        </div>
    </div>;
};

export default ArtBoard;
