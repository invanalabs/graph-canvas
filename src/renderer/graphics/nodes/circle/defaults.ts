import { INodeStyle } from "../../../types"


export const CircleStyleDefaults: INodeStyle = {
    size: 10 * 1.5,
    state: ":default",
    shapeName : {
        background: {
            color: "#3DA5D9",
            // color: "transparent",
            opacity: 1
        },
        border: {
            thickness: 2,
            color: "#ffffff",
            type: "solid",
            opacity: 0.9
        },
        icon: {
            content: "&#9737;", // https://www.toptal.com/designers/htmlarrows/symbols/
            color: "#ffffff",
            font : {
                size: 16,
                family: "Arial"
            }
        }
    },
    label: {
        background: {
            color: "transparent",
            opacity: 0
        },
        padding: 3,
        border: {
            thickness: 1,
            type: "solid",
            color: "#efefef"
        },
        text: {
            color: "#ffffff",
            font: {
                size: 12,
                family: "Arial"
            }
        }
       
    },
    states: {
        ":hovered": {
            shapeName: {
                border: {
                    thickness: 2,
                    color: 0x59cd90,
                    opacity: 0.6,
                }
            },
            label: {
                background: {
                    color: "#ffffff",
                    opacity: 0.3
                },
            }
        },
        ":selected": {
            shapeName: {
                border: {
                    thickness: 4,
                    color:  0xfeeb77 ,
                    opacity: 0.6
                }
            }
        }

    }
}


// selected : {
//     thickness: 5,
//     color: "#0xfeeb77"
// }