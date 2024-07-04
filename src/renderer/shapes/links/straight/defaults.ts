import { ILinkStyle } from "../../../types";

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
            color: "#222222",
            opacity: 0.5
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
