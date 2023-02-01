import React, { useRef } from "react";
import "./artBoard.scss"
import { Canvas } from "../canvas";
import { VisEventLog } from "../eventStore/eventStore";
import EventStoreView from "../eventStore/eventStore"
import uuidv4 from "../eventStore/utils"
import CanvasDisplaySettings, { CanvasData } from "../canvas/types"
import GraphSchema from "../components/graphSchema/graphSchema";
import PropertiesViewer from "../components/propertiesViewer/propertiesViewer";
import CanvasNav from "../plugins/canvasNav/canvasNav";
import ContextMenu from "../plugins/contextMenu/contextMenu";
import CanvasCtrl from "../canvas/canvasCtrl";

export interface ArtBoardProps {
    // label: string;
    data: CanvasData,
    displaySettings: CanvasDisplaySettings
}


const ArtBoard = ({ data, displaySettings }: ArtBoardProps) => {
    let [events, setEvents] = React.useState([]);
    let [selectedElement, setSelectedElement] = React.useState(null);
    let [network, setNetwork] = React.useState(null);
    let canvasCtrl = null
    if (network){
        canvasCtrl = new CanvasCtrl(network);
    }


    const logEvent = (eventName: string, eventParams: any) => {
        console.log("====logevent", eventName, eventParams);
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

        <div style={{ "width": "60%", "height": "100%", "float": "left" }}>
            {
                network
                    ? <React.Fragment><CanvasNav network={network} /></React.Fragment>
                    : <React.Fragment />
            }
            {
                network && selectedElement
                    ? <React.Fragment><ContextMenu network={network} /></React.Fragment>
                    : <React.Fragment />
            }

            <Canvas data={data} logEventHandler={logEvent}
                nodeSizeBasedOnLinks={true}
                setSelectedElement={setSelectedElement}
                displaySettings={displaySettings}
                getNetwork={setNetwork} />
        </div>
        <div style={{ "width": "40%", "height": "100%", "float": "left" }}>
            <PropertiesViewer element={selectedElement} />
            <GraphSchema canvasData={data} displaySettings={displaySettings} />
            <EventStoreView events={events} />
        </div>
    </div>;
};

export default ArtBoard;
