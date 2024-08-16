import { ILinkShapeStyle, INodeShapeStyle, IShapeLabelStyle } from "./styles";
// TODO - merge this to styles.ts, both are styles anyways except, INodeStateTypes, ILinkStateTypes

export type IShapeState =  ':default' | ':highlighted' | ':selected' | ':inactive'; // :hovered, :hidden removed 


// export type INodeStateTypes =  ':default' | ':hovered' | ':selected' | ':highlighted' | ':inactive' | ':hidden';
// export type ILinkStateTypes =  ':default' | ':hovered' | ':selected' | ':highlighted' | ':inactive' | ':hidden';

export interface INodeStateStyle {
  size?: number
  shape?: INodeShapeStyle
  label?: IShapeLabelStyle
}

export interface INodeStyle  extends INodeStateStyle{
  states?: {
      [key in  IShapeState] : INodeStateStyle
  }
}

export interface ILinkStateStyle {
  shape?: ILinkShapeStyle
  label?: IShapeLabelStyle
}

export interface ILinkStyle extends ILinkStateStyle {
  states?: {
      [key in  IShapeState] : ILinkStyle
  }
}

export interface NodeStyleMapType {
  [key: string]: INodeStyle
}

export interface LinkStyleMapType {
  [key: string]: ILinkStyle
}

export interface GraphicsStyles {
  nodes?: NodeStyleMapType
  links?: LinkStyleMapType
  defaultNodeStyle?: INodeStyle
  defaultLinkStyle?: ILinkStyle 
}


export interface ExtraSettings {
  // size
  nodeSizeBasedOn? : 'degree' | 'default'
  // color
  nodeColorBasedOn? : 'group' | 'default'
  linkColorBasedOn? : 'group' | 'default'
  // labels
  labelVisibilityZoomThreshold? : number
}
