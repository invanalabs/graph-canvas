import React from "react"
 
const RenderedHTML = ({html}: {html: string}) => {
    return <div dangerouslySetInnerHTML={{__html: html || ""}} />
}

export default RenderedHTML