import React from "react"
import RenderedHTML from "./renderedHtml"
 
const RenderIconOrImgString = ({html}: {html: string| object | React.ReactNode}) => {
    // console.log("====RenderIconOrImgString", html, typeof html)
    if (typeof html === "string"){
        return <img  width={24} height={24}
         style={{backgroundImage: `url(${html})`,  
          backgroundPosition: "center",
         backgroundRepeat: "no-repeat",
         border: "none",
         backgroundSize: "cover"}} />
    }else{
        return <div style={{margin: "5px 0 5px 10px"}}>{html}</div>
    }
}

export default RenderIconOrImgString