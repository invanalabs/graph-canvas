import {Utils} from "@antv/graphin";


export const defaultLayoutSettings = {
    type: "grid",
    preventOverlap: true
};

export const defaultNodeStyle = Utils.getNodeStyleByTheme({
    nodeSize: 40,
    primaryColor: "green",
    mode: "dark"
});


export const miniMapOptions = {size: [150, 100]};

