import React from "react"
 
const RenderIconOrImgString = ({html}: {html: string| object}) => {
    console.log("====RenderIconOrImgString", html, typeof html)
    if (typeof html === "string"){
        return <img src={html} width={16} />
    }else{
        return html
    }
}

export default RenderIconOrImgString