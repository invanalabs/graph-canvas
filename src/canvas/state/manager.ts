import PropTypes from "prop-types";
import Event, {EVENT_TYPES} from "./events";


export default class StateManager {
    setLayoutSettings_ = null
    setSelectedNodes = null
    setMessageText = null
    setHoveredItem = null

    // @ts-ignore
    constructor(setLayoutSettings: PropTypes.func, setSelectedNodes: PropTypes.func,
                // @ts-ignore
                setMessageText: PropTypes.func, setHoveredItem: PropTypes.func) {
        this.setLayoutSettings_ = setLayoutSettings
        this.setSelectedNodes = setSelectedNodes
        this.setMessageText = setMessageText
        this.setHoveredItem = setHoveredItem
    }

    setLayoutSettings(data: any) {
        // @ts-ignore
        console.log("setLayoutSettings", data)
        const event = new Event(EVENT_TYPES.updateLayout, `Updated to ${data.label} layout`, data).commit();
        // @ts-ignore
        this.setMessageText(event.message)
        // @ts-ignore
        this.setLayoutSettings_(data)
    }

    focusOnNode(apis: any, node: any) {
        // graph.focusItem(node.getID(), true, {
        //     duration: 300,
        //     easing: 'easeCubic'
        // });
        apis.focusNodeById(node.getID());

        node.toFront();
    }

}