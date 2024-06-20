

export type BorderType = 'solid' | 'dotted';


/* generic */
export interface ShapeBackgroundType {
  color: string | number
  opacity: number
}

export interface ShapeBorderType {
  thickness: number
  color: string | number
  type: BorderType
  opacity?: null | number
}

export interface ShapeFontType {
  family : string
  size: number
}

export interface TextType {
  color: string | number
  font : ShapeFontType
}

export interface IconType extends TextType {
  content: string | number
}

/* for links */
export interface ILinkShapeStyle {
  opacity: number
  thickness: number
  color: string | number
  type: BorderType
}

/* for nodes */
export interface IShapeLabelStyle {
  background: ShapeBackgroundType
  border: ShapeBorderType
  text: TextType
  padding : number
  resolution?: number
}

export interface INodeShapeStyle {
  background: ShapeBackgroundType
  border: ShapeBorderType
  icon: IconType
}


