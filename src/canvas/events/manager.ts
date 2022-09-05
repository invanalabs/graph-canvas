import Event, {EventTypes} from "./types";

const event_types = new EventTypes()

export default class EventManager {

    welcome_event() {
        const e = new Event()
        // @ts-ignore
        e.create(event_types.welcome, "Welcome to graph canvas (beta)...")
        return e
    }

    // welcome_event() {
    //     const e = new Event()
    //     // @ts-ignore
    //     e.create(EventTypes.welcome, "Welcome to graph canvas (beta)...")
    // }
}

