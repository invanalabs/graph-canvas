import Event, {EventTypes} from "./types";

export default class EventManager {

    welcome_event() {
        const e = new Event()
        // @ts-ignore
        e.create(EventTypes.welcome, "Welcome to graph canvas (beta)...")
        return e
    }

    // welcome_event() {
    //     const e = new Event()
    //     // @ts-ignore
    //     e.create(EventTypes.welcome, "Welcome to graph canvas (beta)...")
    // }
}

