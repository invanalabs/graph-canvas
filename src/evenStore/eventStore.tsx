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
            props.events.map((event: any, index: any) => {
                    return <div key={index}>
                        {JSON.stringify(event)}
                    </div>
                }
            )
        }
    </div>
}
export default EventStoreView
