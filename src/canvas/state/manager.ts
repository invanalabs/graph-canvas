import PropTypes from "prop-types";


export default class StateManager {
    setLayoutSettings = null
    setSelectedNodes = null
    setMessageText = null
    setHoveredItem = null

    // @ts-ignore
    constructor(setLayoutSettings: PropTypes.func, setSelectedNodes: PropTypes.func,
                // @ts-ignore
                setMessageText: PropTypes.func, setHoveredItem: PropTypes.func) {
        this.setLayoutSettings = setLayoutSettings
        this.setSelectedNodes = setSelectedNodes
        this.setMessageText = setMessageText
        this.setHoveredItem = setHoveredItem
    }

}