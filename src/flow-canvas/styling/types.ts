import { ReactNode, CSSProperties } from "react"
import { Edge } from "reactflow"

export type CanvasEdgeStylingOptions  = {
    // this 
    color: string, // color of the edge
    thickness: string, // thickness of the edge
    icon: string | ReactNode,
    labelFontSize: string
    labelFontColor: string
    labelFontfamily: string
    labelBgColor:  string,
    labelBorderRadius: string,
    labelPadding: string,
    
}


export type CanvasNodeStylingOptions = {
    shapeColor: string, // color used for styling the node header/border etc ; color used in MiniMap also
    shapeBorderColor: string, // 
    shapeBgColor: string ,
    shapeTextColor: string    
}