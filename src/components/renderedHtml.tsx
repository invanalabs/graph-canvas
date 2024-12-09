import React from "react"

interface RenderedHTMLProps {
    html: string | React.ReactNode;
}

const RenderedHTML = ({html} : RenderedHTMLProps)  => {
    if (typeof html === "string"){
        return <div dangerouslySetInnerHTML={{__html: html || ""}} />
    }else{
        return html
    }
}

export default RenderedHTML