import CanvasDisplaySettings, {NodeSetting, CanvasData} from "./types";
import DisplayManager from "./displayManager";
import { Options} from "vis-network/declarations/network/Network";

const processEvent = (params: any) => {

}

const nodeStateSufix = {
    SECONDARY_ACTIVE : "secondary-active",
    INACTIVE: "inactive",
    DEFAULT : "default"
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

        nodes: settingManager.createNodeSettings({}, undefined, nodeStateSufix.DEFAULT),
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
        groups[label + "-" + nodeStateSufix.DEFAULT] = settingManager.createNodeSettings({}, label, nodeStateSufix.DEFAULT)
        groups[label+ "-" + nodeStateSufix.INACTIVE] = settingManager.createNodeSettings({}, label, nodeStateSufix.INACTIVE)
        groups[label + "-" + nodeStateSufix.SECONDARY_ACTIVE] = settingManager.createNodeSettings({}, label, nodeStateSufix.SECONDARY_ACTIVE)
        
    })
    
    // override group styles with user definitions
    for (const label in displaySettings.nodeSettings) {
        console.log("=====displaySettings.nodeSettings", label)
        const groupSetting: NodeSetting = displaySettings.nodeSettings[label];
        groups[label + "-"+nodeStateSufix.DEFAULT] = settingManager.createNodeSettings(groupSetting, label, nodeStateSufix.DEFAULT)
        groups[label+ "-"+ nodeStateSufix.INACTIVE] = settingManager.createNodeSettings(groupSetting, label, nodeStateSufix.INACTIVE)
        groups[label + "-" + nodeStateSufix.SECONDARY_ACTIVE] = settingManager.createNodeSettings(groupSetting, label,nodeStateSufix.SECONDARY_ACTIVE)
    }


    console.log("======groups", groups)
    settings.groups = groups
    return settings
}

export default createDefaultOptions
export {nodeStateSufix}