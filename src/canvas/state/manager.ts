import PropTypes from "prop-types";
import EventManager from "../events/manager";


export default class StateManager {
    setState = null
    eventManager = new EventManager();

    // @ts-ignore
    constructor(setState: PropTypes.func) {
        console.log("setState", typeof setState, setState)
        this.setState = setState
    }

    setMessage(msgText: string) {
        // @ts-ignore
        this.setState({messageText: msgText})
    }

    welcome() {
        // this.setState({messageText: msgText})
        this.eventManager.welcome_event()
    }

    setLayoutSettings(layoutConfig: object) {
        // @ts-ignore

        this.setState({layoutSettings: layoutConfig})
    }
}