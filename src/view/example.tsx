import React, { useRef } from "react";
import "./artBoard.scss"
import { Canvas } from "../canvas";
// import { VisEventLog } from "../plugins/eventsList/eventsList";
import { CanvasEvent } from "../events/eventLogHandler";
import EventsList from "../plugins/eventsList/eventsList"
import uuidv4 from "../utils"
import CanvasDisplaySettings, { CanvasData } from "../canvas/types"
import GraphSchema from "../plugins/graphSchema/graphSchema";
import PropertiesViewer from "../plugins/propertiesViewer/propertiesViewer";

import { ArtBoard } from "../artBoard";

export interface ArtBoardProps {
        // label: string;
        data: CanvasData,
        displaySettings: CanvasDisplaySettings,
        eventLogger: (event: CanvasEvent) => null
    }


const ArtBoardExample = ({ data, displaySettings }: ArtBoardProps) => {
    // call ArtBoard GraphCanvas later, 
    let [events, setEvents] = React.useState([]);

    const  eventLogger = (event: CanvasEvent)=>  {
        console.log("====eventLogger", event);
        let oldEvents = JSON.parse(JSON.stringify(events));
        oldEvents.push(event)
        setEvents(oldEvents)
    }


    return <div className={"artBoard"}>
        {/*<h1>Artboard</h1>*/}

        <div style={{ "width": "60%", "height": "100%", "float": "left" }}>
            <ArtBoard data={data} displaySettings={displaySettings} eventLogger={eventLogger}>
        </div>
        <div style={{ "width": "40%", "height": "100%", "float": "left" }}>
            <PropertiesViewer element={selectedElement} />
            <GraphSchema canvasData={data} displaySettings={displaySettings} />
            <EventsList events={events} />
        </div>
    </div>;
};

export default ArtBoardExample;
