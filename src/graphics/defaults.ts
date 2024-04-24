import { LinkStyleType, NodeStyleType } from "../canvas/types"




export const NodeStyleDefaults: NodeStyleType = {
    shape : {
        background: {
            // color: "#333333",
            color: "transparent",
            opacity: 1
        },
        border: {
            thickness: 3,
            color: "#efefef",
            type: "solid"
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
            color: "#222222",
            opacity: 1
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
            shape: {
                border: {
                    thickness: 3,
                    color: 0xfeeb77
                }
            }
        },
        ":selected": {
            shape: {
                border: {
                    thickness: 3,
                    color: "#F6B26B"
                }
            }
        },
        ":inactive": {
            shape: {
                opacity: 0.5,
            }
        },

    }
}


export const LinkStyleDefaults: LinkStyleType = {
    shape : {
        opacity: 1,
        thickness: 3,
        color: "#efefef"
    },
    label: {
        background: {
            color: "#222222",
            opacity: 1
        },
        padding: 3,
        border: {
            thickness: 1,
            color: "#efefef",
            type: "solid"
        },
        text: {
            color: "#ffffff",
            font: {
                size: 12,
                family: "Arial"
            }
        }
        // fontSize: 12,
        // fontFamily: "Arial"
    },
    labelDisplay: "onHover", // | alwaysOn | onSelected"
    states: {
        ":hovered": {
            shape: {
                opacity: 1,
                thickness: 6,
                color: 0xfeeb77
            }
        },
        ":inactive": {
            shape: {
                opacity: 1,
                thickness: 6,
                color: 0xfeeb77
            }
        },
    }


    // ":selected": {
    //     shape: {
    //         opacity: 1,
    //         thickness: 3,
    //         color: "#F6B26B"
    //     }
    // }
}

// selected : {
//     thickness: 5,
//     color: "#0xfeeb77"
// }