import { ILinkStyle } from "../../../types";

export const LinkStyleDefaults: ILinkStyle = {
  state: ":default",
  shapeName : {
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
          shapeName: {
              opacity: 0.6,
              thickness: 2,
              color: 0x59cd90, //0xF6B26B
          }
      },
      ":selected": {
          shapeName: {
              opacity: 0.6,
              thickness: 3,
              color: 0xfeeb77
          }
      }  
  }


  // ":selected": {
  //     shapeName: {
  //         opacity: 1,
  //         thickness: 3,
  //         color: "#F6B26B"
  //     }
  // }
}
