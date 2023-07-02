import uuidv4 from "../utils"

export interface CanvasEvent {
    id: string;
    eventName: string;
    eventParams: string;
    time: string
}


const defaultEventLogHandler = (eventName: string, eventParams: any,    eventLogger: (event: CanvasEvent)=> null
    ) => {
    console.log("====logevent", eventName, eventParams);
    const event: CanvasEvent = {
        id: uuidv4(),
        eventName: eventName,
        eventParams: eventParams,
        time: JSON.stringify(new Date())
    }

    eventLogger(event)

    // let old_events = JSON.parse(JSON.stringify(events));
    // old_events.push(d)
    // setEvents(old_events)
}


export default defaultEventLogHandler
