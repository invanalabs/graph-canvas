import {CanvasSetting, EdgeSetting, NodeSetting} from "./types";


class ColorPalleteManager {
    public colors = ["#e51c23", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5",
        "#5677fc", "#03a9f4", "#00bcd4", "#009688", "#259b24",
        "#8bc34a", "#afb42b", "#ff9800", "#ff5722", "#795548", "#607d8b"]

    getColor(label: string) {
        let hash = 0;
        if (label.length === 0) return hash;
        for (let i = 0; i < label.length; i++) {
            hash = label.charCodeAt(i) + ((hash << 5) - hash);
            hash = hash & hash;
        }
        hash = ((hash % this.colors.length) + this.colors.length) % this.colors.length;
        return this.colors[hash];
    }
}

class DisplayManager {
    public colorPallete = new ColorPalleteManager()

    public defaultCanvasSettings: CanvasSetting = {
        backgroundColor: "#ffffff"
    }


    public defaultNodeSettings: NodeSetting = {
        labelField: "id",
        labelColor: "#333333",
        // shapeColor: "#2256bb",
        shape: "dot",
        shapeSize: 12
        // shapeIcon?: string
    }

    public defaultEdgeSettings: EdgeSetting = {
        // arrowColor: "#333333",
        arrowShape: "continuous",
        labelField: "id",
        labelColor: "#333333"

    }

    getNodeColorConfig(label: string, nodeSetting: NodeSetting) {
        const color = nodeSetting.shapeColor ? nodeSetting.shapeColor : this.colorPallete.getColor(label);
        console.log("======label", label, color)
        return {
            // border: '#2B7CE9',
            background: color,
            // highlight: {
            //     border: '#2B7CE9',
            //     background: '#D2E5FF'
            // },
            // hover: {
            //     border: '#2B7CE9',
            //     background: '#D2E5FF'
            // }
        }
    }

    getEdgeColorConfig(label: string, edgeSetting: EdgeSetting) {
        const color = edgeSetting.arrowColor ? edgeSetting.arrowColor : this.colorPallete.getColor(label);
        console.log("======label", label, color)
        return color;
    }


    createEdgeSettings = (edgeSetting: EdgeSetting, label: string = "") => {
        return {
            smooth: {
                type: edgeSetting.arrowShape || this.defaultEdgeSettings.arrowShape
            },
            color: this.getEdgeColorConfig(label, edgeSetting),
            width: 0.5,
            arrows: {
                to: {
                    enabled: true,
                    scaleFactor: 0.5,
                },
            },
            font: {
                color: edgeSetting.labelColor || this.defaultEdgeSettings.labelColor
            }
        }
    }

    createNodeSettings = (nodeSetting: NodeSetting, label: string = "") => {
        console.log("createNodeSettings:: label", label, nodeSetting)
        return {
            color: this.getNodeColorConfig(label, nodeSetting),
            borderWidth: 2,
            shape: nodeSetting.shape || this.defaultNodeSettings.shape,
            font: {
                color: nodeSetting.labelColor || this.defaultNodeSettings.labelColor
            },
            size: nodeSetting.shapeSize || this.defaultNodeSettings.shapeSize
        }

    }


}


export default DisplayManager