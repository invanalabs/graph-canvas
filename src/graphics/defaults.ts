



export const NodeStyleDefaults = {
    shape : {
        background: {
            // color: "#333333",
            color: "transparent",
            opacity: 1
        },
        border: {
            thickness: 3,
            color: "efefef"
        },
        icon: {
            color: "#ffffff",
            fontSize: 16,
            // fontFamily: ""
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
            color: "#efefef"
        },
        color: "#ffffff",
        fontSize: 12,
        fontFamily: "Arial"
    },
    // ":selected": {
    //     shape: {
    //         border: {
    //             thickness: 3,
    //             color: 0xff0000
    //         }
    //     }
    // },
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
    }
}


export const LinkStyleDefaults = {
    shape : {
        opacity: 1,
        thickness: 3,
        color: "efefef"
    },
    label: {
        background: {
            color: "#222222",
            opacity: 1
        },
        padding: 3,
        border: {
            thickness: 1,
            color: "#efefef"
        },
        color: "#ffffff",
        fontSize: 12,
        fontFamily: "Arial"
    },
    labelDisplay: "onHover", // | alwaysOn | onSelected"
    ":hovered": {
        shape: {
            opacity: 1,
            thickness: 6,
            color: 0xfeeb77
        }
    },
    // ":inactive": {
    //     shape: {
    //         opacity: 1,
    //         thickness: 6,
    //         color: 0xfeeb77
    //     }
    // },
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