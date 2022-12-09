/// <reference types="react" />
export interface VisEventLog {
    id: string;
    eventName: string;
    eventParams: string;
    time: string;
}
interface EventStoreViewProps {
    events: VisEventLog[];
}
export declare const EventStoreView: (props: EventStoreViewProps) => JSX.Element;
export default EventStoreView;
