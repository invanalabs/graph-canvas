import PropTypes from "prop-types";


export default class StateManager {
    setState = null

    // @ts-ignore
    constructor(setState: PropTypes.func) {
        console.log("setState", typeof setState, setState)
        this.setState = setState
    }

    setMessage(msgText: string){
        // @ts-ignore
        this.setState({messageText: msgText})
    }

    setLayoutSettings(layoutConfig: object){
        // @ts-ignore
        this.setState({layoutSettings: layoutConfig})
    }
}