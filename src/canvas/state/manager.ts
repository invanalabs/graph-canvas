import PropTypes, {arrayOf} from "prop-types";
import EventManager from "../events/manager";
import {INode} from "@antv/g6";
import {EventTypes} from "../events/types";


export default class StateManager {
    // state = null
    // setState = null
    eventManager = new EventManager();

    // // @ts-ignore
    // constructor(state, setState: PropTypes.func) {
    //     console.log("setState", typeof setState, setState)
    //     this.setState = setState
    //     this.state = state
    // }

    // @ts-ignore
    setMessage(msgText: string, setState: PropTypes.any) {
        setState({messageText: msgText})
    }

    // @ts-ignore
    welcome(setState) {
        const e = this.eventManager.welcome_event()
        // @ts-ignore
        // this.setMessage(e.message, setState)
    }

    // @ts-ignore
    setSelectedNodes(nodes, setState) {
        // @ts-ignore
        console.log("***** state", this.state)
        // @ts-ignore
        setState({selectedNodes: nodes})
        // this.setMessage("Updated selected nodes")
    }

    //
    // setLayoutSettings(layoutConfig: object) {
    //     // @ts-ignore
    //     this.setState({layoutSettings: layoutConfig})
    // }
}