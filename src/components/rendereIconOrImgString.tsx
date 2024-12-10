import React from "react";
import { CanvasIcon } from "../core/types";

const RenderIconOrImgString = ({ icon }: { icon: CanvasIcon }) => {
    console.log("icon, tyoeof icon", icon, typeof icon);
  if (typeof icon === "string") {
    if (icon.startsWith("http")) {
      return (
        <img
          src={icon}
          width={16}
          height={16}
          style={{
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            border: "none",
            marginRight: "10px",
            backgroundSize: "cover"
          }}
          alt="icon"
        />
      );
    } else {
      return <span style={{ marginRight: "10px" }}>{icon}</span>;
    }
  }
  else if (typeof icon === "function") {
    return <span style={{ marginRight: "10px" }}>{React.createElement(icon)}</span>;
  }
   else {
    return <span style={{ marginRight: "10px" }}>{icon}</span>;
  }
};

export default RenderIconOrImgString;