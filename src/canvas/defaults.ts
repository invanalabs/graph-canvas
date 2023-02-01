import CanvasDisplaySettings, {NodeSetting, CanvasData} from "./types";
import DisplayManager from "./displayManager";
import { Options} from "vis-network/declarations/network/Network";

const processEvent = (params: any) => {

}

const nodeStateSuffix = {
    SECONDARY_ACTIVE : "secondary-active",
    INACTIVE: "inactive",
    DEFAULT : "default",
    HIGHLIGHT: "highlight"
}


const detectGroups = (data: CanvasData) => {
    let nodeLabels = [...new Set(data.nodes.map(node => node.label))]
    let edgeLabels = [...new Set(data.edges.map(edge => edge.label))]
    return {nodeLabels, edgeLabels}
}


const createDefaultOptions = (displaySettings: CanvasDisplaySettings, data: CanvasData) => {
    const settingManager = new DisplayManager()

    let settings: Options = {
        physics: false,
        autoResize: true,
        // physics: {
        //     stabilization: true,
            // barnesHut: {
            //     gravitationalConstant: -80000,
            //     springConstant: 0.001,
            //     springLength: 200,
            // },
        // },
        interaction: {
            tooltipDelay: 200,
            hover: true,
            hideEdgesOnDrag: true,
        },

        nodes: settingManager.createNodeSettings({}, undefined, nodeStateSuffix.DEFAULT),
        edges: settingManager.createEdgeSettings({}, undefined),
    }
    console.log("===settings", settings)
    const {nodeLabels, edgeLabels} = detectGroups(data)
    let groups: any = {
        useDefaultGroups: false
    }
    // console.log("Object.keys(displaySettings.nodeSettings)", Object.keys(displaySettings.nodeSettings))
    // create default groups 
    nodeLabels.forEach((label) => {
        console.log("===============nodeLabels", label)
        groups[label + "-" + nodeStateSuffix.DEFAULT] = settingManager.createNodeSettings({}, label, nodeStateSuffix.DEFAULT)
        groups[label+ "-" + nodeStateSuffix.INACTIVE] = settingManager.createNodeSettings({}, label, nodeStateSuffix.INACTIVE)
        groups[label + "-" + nodeStateSuffix.SECONDARY_ACTIVE] = settingManager.createNodeSettings({}, label, nodeStateSuffix.SECONDARY_ACTIVE)
        groups[label + "-" + nodeStateSuffix.HIGHLIGHT] = settingManager.createNodeSettings({}, label, nodeStateSuffix.HIGHLIGHT)
        
    })
    
    // override group styles with user definitions
    for (const label in displaySettings.nodeSettings) {
        console.log("=====displaySettings.nodeSettings", label)
        const groupSetting: NodeSetting = displaySettings.nodeSettings[label];
        groups[label + "-"+nodeStateSuffix.DEFAULT] = settingManager.createNodeSettings(groupSetting, label, nodeStateSuffix.DEFAULT)
        groups[label+ "-"+ nodeStateSuffix.INACTIVE] = settingManager.createNodeSettings(groupSetting, label, nodeStateSuffix.INACTIVE)
        groups[label + "-" + nodeStateSuffix.SECONDARY_ACTIVE] = settingManager.createNodeSettings(groupSetting, label,nodeStateSuffix.SECONDARY_ACTIVE)
        groups[label + "-" + nodeStateSuffix.HIGHLIGHT] = settingManager.createNodeSettings(groupSetting, label,nodeStateSuffix.HIGHLIGHT)

    }


    console.log("======groups", groups)
    settings.groups = groups
    return settings
}

export default createDefaultOptions
export {nodeStateSuffix}