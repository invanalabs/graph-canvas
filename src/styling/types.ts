import { ReactNode } from "react"


export type CanvasEdgeStylingOptions = {
    // this 
    color: string, // color of the edge
    thickness: string, // thickness of the edge
    icon: string | ReactNode,
    labelFontSize: string
    labelFontColor: string
    labelFontfamily: string
    labelBgColor: string,
    labelBorderRadius: string,
    labelPadding: string,

}

export type CanvasNodeStylingOptions = {
    shapeColor: string // color used for background ; color used in MiniMap also
    shapeBorderColor: string // 

    shapeHeaderBgColor: string
    shapeHeaderTextColor: string

    shapeBodyBgColor: string // defaults to shapeColor
    shapeBodyTextColor: string
}