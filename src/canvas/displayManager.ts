import {CanvasSetting, EdgeSetting, NodeSetting} from "./types";
import {copyObject} from "../eventStore/utils";

const defaultShapeColor = "#2256bb";

class ColorPalleteManager {
    public colors = ["#e51c23", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5",
        "#5677fc", "#18d94f", "#4db2c0", "#12a99c", "#259b24",
        "#8bc34a", "#afb42b", "#ff9800", "#ff5722", "#795548", "#607d8b"]

    getColor(label: string): string {
        let hash = 0;
        // if (label.length === 0){
        //     return defaultShapeColor;
        // }
        for (let i = 0; i < label.length; i++) {
            hash = label.charCodeAt(i) + ((hash << 5) - hash);
            hash = hash & hash;
        }
        hash = ((hash % this.colors.length) + this.colors.length) % this.colors.length;
        return this.colors[hash];
    }
}

function addAlphaToHex(color: string, opacity: any) {
    // coerce values so ti is between 0 and 1.
    // usage: addAlphaToHex("#222222", 0.5)
    let _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return color + _opacity.toString(16).toUpperCase();
}

class DisplayManager {
    public colorPallete = new ColorPalleteManager()

    public defaultCanvasSettings: CanvasSetting = {
        backgroundColor: "#ffffff"
    }

    public defaultShapeColor = defaultShapeColor;
    public defaultArrowColor = "#222222";

    public inActiveNodeColor = "#c8c8c8"
    public secondDegreeNodeColor = "#969696"

    public defaultNodeSettings: NodeSetting = {
        labelField: "id",
        labelColor: "#f1f1f1",
        // shapeColor: "#2256bb",
        shape: "dot",
        shapeSize: 12
        // shapeIcon?: string
    }

    public defaultEdgeSettings: EdgeSetting = {
        // arrowColor: "#333333",
        arrowShape: "dynamic",
        labelField: "id",
        labelColor: "#f1f1f1"

    }

    // getDefaultNodeSetting() {
    //     return copyObject(this.defaultNodeSettings)
    // }


    getNodeColorConfigByLabel(label: string | undefined, nodeSetting: NodeSetting) {
        // let color: string = this.defaultShapeColor;
        // let color = label ? this.colorPallete.getColor(label) : nodeSetting.shapeColor

        let color = label ? this.colorPallete.getColor(label) : nodeSetting.shapeColor;
        color = !color ? this.defaultShapeColor : color
        console.log("======label", label, color)
        return this.getNodeColorConfigWithColor(color)
    }

    getNodeColorConfigWithColor(color: string) {
        // let color: string = this.defaultShapeColor;
        // let color = label ? this.colorPallete.getColor(label) : nodeSetting.shapeColor

        const highlightColor = addAlphaToHex(color, 0.8)
        // const highlightColor = color
        return {
            border: color,
            background: color,
            highlight: {
                border: highlightColor,
                background: highlightColor
            },
            hover: {
                border: highlightColor,
                background: highlightColor
            }
        }
    }

    getEdgeColorConfig(label: string | undefined, edgeSetting: EdgeSetting) {
        let color = label ? this.colorPallete.getColor(label) : edgeSetting.arrowColor;
        color = !color ? this.defaultArrowColor : color
        console.log("======label", label, color)
        return {
            inherit: "both",        
            highlight: color,
            hover: color
        };
    }

    // getInActiveNodeSettings = () => {
    //     let _ = this.createNodeSettings({}, "")
    //     _.color = this.getNodeColorConfigWithColor(this.inActiveNodeColor)
    //     return _
    // }

    createEdgeSettings = (edgeSetting: EdgeSetting, label: string | undefined) => {
        const labelColor = edgeSetting.labelColor || this.defaultEdgeSettings.labelColor;
        return {
            smooth: {
                type: edgeSetting.arrowShape ? edgeSetting.arrowShape : this.defaultEdgeSettings.arrowShape
            },
            color: this.getEdgeColorConfig(label, edgeSetting),
            // width: 0.5,
            arrows: {
                to: {
                    enabled: true,
                    scaleFactor: 0.5,
                },
            },
            font: {
                color: labelColor,
                strokeWidth: 0
            }
        }
    }

    createNodeSettings = (nodeSetting: NodeSetting, label: string | undefined) => {
        console.log("createNodeSettings:: label", label, nodeSetting);
        const color = this.getNodeColorConfigByLabel(label, nodeSetting);
        console.log("================colorConfig", color)
        return {
            color: color,
            borderWidth: 2,
            shape: nodeSetting.shape || this.defaultNodeSettings.shape,
            font: {
                color: nodeSetting.labelColor || this.defaultNodeSettings.labelColor
            },
            // size: nodeSetting.shapeSize || this.defaultNodeSettings.shapeSize
        }

    }


}


export default DisplayManager