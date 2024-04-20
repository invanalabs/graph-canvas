



export const NodeStyleDefaults = {
    shape : {
        background: {
            color: "#333333",
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


// selected : {
//     thickness: 5,
//     color: "#0xfeeb77"
// }