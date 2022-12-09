import {EdgeSetting, NodeSetting} from "./types";

class DisplayManager {

    constructor() {
    }


    createEdgeSettings = (edgeSetting: EdgeSetting) => {
        return {
            smooth: {
                type: edgeSetting.arrowShape
            },
            color: edgeSetting.arrowColor,
            width: 0.5,
            arrows: {
                to: {
                    enabled: true,
                    scaleFactor: 0.5,
                },
            },
            font:{
                color: edgeSetting.labelColor
            }
        }
    }

    createNodeSettings = (nodeSetting: NodeSetting) => {
        return {
            color: {
                border: '#2B7CE9',
                background: nodeSetting.shapeColor,
                // highlight: {
                //     border: '#2B7CE9',
                //     background: '#D2E5FF'
                // },
                // hover: {
                //     border: '#2B7CE9',
                //     background: '#D2E5FF'
                // }
            },
            borderWidth: 2,
            shape: nodeSetting.shape,
            font:{
                color: nodeSetting.labelColor
            },
            size: nodeSetting.shapeSize
        }
    }



}


export default DisplayManager