import { INodeStyle } from "../../../types"

const defaultNodeSize = 10 * 1.5

export const NodeStyleDefaults: INodeStyle = {
    size: defaultNodeSize,
    // state: ":default",
    shape : {
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
            // content: "&#9737;", // https://www.toptal.com/designers/htmlarrows/symbols/
            color: "#343434",
            font : {
                size: 18,
                family: "FontAwesome",
                weight: "bold",
                align: "center"
            }
        },
        // image: {
        //     url : "https://placehold.co/40x40/png"
        // }
    },
    label: {
        background: {
            color: "#555555",
            opacity: 0.9
        },
        padding: 5,
        border: {
            thickness: 1,
            type: "solid",
            color: "#efefef"
        },
        text: {
            color: "#efefef",
            font: {
                size: 12,
                family: "Arial"
            }
        }
       
    },
    states: {
        ":selected": {
            shape: {
                // border: {
                //     thickness: 2,
                //     color: 0x999999,
                //     opacity: 0.6,
                // },
                background: {
                    color: "#888888",
                    opacity: 0.3
                },
            }
        },
        ":highlighted": {
            shape: {
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