import { ILinkShapeStyle, INodeShapeStyle, IShapeLabelStyle } from "./styles";
// TODO - merge this to styles.ts, both are styles anyways except, INodeStateTypes, ILinkStateTypes

export type IShapeState =  ':default' | ':highlighted' | ':selected' | ':muted'; // :hovered, :hidden removed 


// export type INodeStateTypes =  ':default' | ':hovered' | ':selected' | ':highlighted' | ':muted' | ':hidden';
// export type ILinkStateTypes =  ':default' | ':hovered' | ':selected' | ':highlighted' | ':muted' | ':hidden';

export interface INodeStateStyle {
  size?: number
  // finalSize?:number // this is used for when size is manipulated by 
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
  labelVisibilityZoomThreshold? : number,


}
