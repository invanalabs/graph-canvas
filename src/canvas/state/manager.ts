import PropTypes, {arrayOf} from "prop-types";
import EventManager from "../events/manager";
import {INode} from "@antv/g6";


export default class StateManager {
    state = null
    setState = null
    eventManager = new EventManager();

    // @ts-ignore
    constructor(state, setState: PropTypes.func) {
        console.log("setState", typeof setState, setState)
        this.setState = setState
        this.state = state
    }

    setMessage(msgText: string) {
        // @ts-ignore
        this.setState({messageText: msgText})
    }

    welcome() {
        const e = this.eventManager.welcome_event()
        // @ts-ignore
        this.setState({messageText: e.message})

    }

    // @ts-ignore
    setSelectedNodes(nodes) {
        // @ts-ignore
        // this.setState({selectedNodes: nodes})
        // this.setMessage("Updated selected nodes")
    }

    setLayoutSettings(layoutConfig: object) {
        // @ts-ignore

        this.setState({layoutSettings: layoutConfig})
    }
}