import { LinkStyleType, NodeStyleType } from "../canvas/types"


export const NodeStyleDefaults: NodeStyleType = {
    size: 10 * 1.5,
    state: ":default",
    shape : {
        background: {
            color: "#3DA5D9",
            // color: "transparent",
            opacity: 1
        },
        border: {
            thickness: 1,
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
            shape: {
                border: {
                    thickness: 3,
                    color: 0xfeeb77,
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
            shape: {
                border: {
                    thickness: 6,
                    color: 0xF6B26B,
                    opacity: 0.6
                }
            }
        },
        ":inactive": {
            shape: {
                opacity: 0.5,
                border: {
                    thickness: 6,
                    color: 0x222222,
                    opacity: 0.6
                }
            }
        },

    }
}

export const LinkStyleDefaults: LinkStyleType = {
    state: ":default",
    shape : {
        opacity: 1,
        thickness: 1,
        color: "#555555",
        type: "solid"

    },
    label: {
        background: {
            color: "#222222",
            opacity: 0.2
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
                thickness: 2,
                color: 0xfeeb77
            }
        },
        ":inactive": {
            shape: {
                opacity: 1,
                // thickness: ,
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