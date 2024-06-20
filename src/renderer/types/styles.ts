

export type IBorderStyle = 'solid' | 'dotted';


/* generic */
export interface IShapeBgStyle {
  color: string | number
  opacity: number
}

export interface IShapeBorderStyle {
  thickness: number
  color: string | number
  type: IBorderStyle
  opacity?: null | number
}

export interface IShapeFontStyle {
  family : string
  size: number
}

export interface ITextStyle {
  color: string | number
  font : IShapeFontStyle
}

export interface IIconStyle extends ITextStyle {
  content: string | number
}

/* for links */
export interface ILinkShapeStyle {
  opacity: number
  thickness: number
  color: string | number
  type: IBorderStyle
}

/* for nodes */
export interface IShapeLabelStyle {
  background: IShapeBgStyle
  border: IShapeBorderStyle
  text: ITextStyle
  padding : number
  resolution?: number
}

export interface INodeShapeStyle {
  background: IShapeBgStyle
  border: IShapeBorderStyle
  icon: IIconStyle
}


