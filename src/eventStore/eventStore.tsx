import React from "react";

export interface VisEventLog {
    id: string;
    eventName: string;
    eventParams: string;
    time: string
}


interface EventStoreViewProps {
    events: VisEventLog[]
}


export const EventStoreView = (props: EventStoreViewProps) => {
    return <div>
        <h3>Events</h3>
        {
            props.events.reverse().map((event: any, index: any) => {
                    return <div key={index}>
                        <h4>{event.eventName} --- {event.id}</h4>
                        <p>{event.time}</p>
                        <pre>{JSON.stringify(event, null, 4)}</pre>
                        <hr/>
                    </div>
                }
            )
        }
    </div>
}
export default EventStoreView
