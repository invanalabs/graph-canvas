import React from "react"
 
const RenderedHTML = ({html}:    {html: string| object | React.ReactNode})  => {
    if (typeof html === "string"){
        return <div dangerouslySetInnerHTML={{__html: html || ""}} />
    }else{
        return html
    }
}

export default RenderedHTML