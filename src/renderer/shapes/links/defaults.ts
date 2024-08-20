import { ILinkStyle } from "../../types";

export const LinkStyleDefaults: ILinkStyle = {
    state: ":default",
    shape: {
        opacity: 1,
        thickness: 1,
        color: "#555555",
        type: "solid"
    },
    label: {
        background: {
            color: "#555555",
            opacity: 0.5
        },
        padding: 3,
        border: {
            thickness: 1,
            color: "#999999",
            type: "solid"
        },
        text: {
            color: "#999999",
            font: {
                size: 10,
                family: "Arial"
            }
        }
    },
    labelDisplay: "onHover", // | alwaysOn | onHighlighted"
    states: {
 
        // ":hovered": {
        //     shape: {
        //         opacity: 0.6,
        //         thickness: 2,
        //         color: 0x59cd90, //0xF6B26B
        //     }
        // },
        ":highlighted": {
            shape: {
                opacity: 0.6,
                thickness: 3,
                color: 0xfeeb77
            }
        },
        ":selected": {
            shape: {
                opacity: 0.6,
                thickness: 5,
                color: 0xf11b77
            }
        }
    }


    // ":highlighted": {
    //     shape: {
    //         opacity: 1,
    //         thickness: 3,
    //         color: "#F6B26B"
    //     }
    // }
}
