import React from "react"
// import RenderedHTML from "./renderedHtml"
 
const RenderIconOrImgString = ({html}: {html: string | React.ReactNode}) => {
    // console.log("====RenderIconOrImgString", html, typeof html)
    if (typeof html === "string"){
        return <img  width={16} height={16}
         style={{backgroundImage: `url(${html})`,  
          backgroundPosition: "center",
         backgroundRepeat: "no-repeat",
         border: "none",
         marginRight: "10px",
         backgroundSize: "cover"}} />
    }else{
        return <span style={{marginRight: "10px"}} >{html}</span>
    }
}

export default RenderIconOrImgString