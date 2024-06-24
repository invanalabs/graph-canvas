import { ILinkShapeStyle, INodeShapeStyle, IShapeLabelStyle } from "./styles";
// TODO - merge this to styles.ts, both are styles anyways except, INodeStateTypes, ILinkStateTypes

export type INodeStateTypes =  ':default' | ':hovered' | ':highlighted' | ':highlighted' | ':inactive' | ':hidden'; 
export type ILinkStateTypes =  ':default' | ':hovered' | ':highlighted' | ':highlighted' | ':inactive' | ':hidden';


export interface INodeStyle {
  size: number
  shape: INodeShapeStyle
  label: IShapeLabelStyle
  states: {
      [key in  INodeStateTypes] : INodeStyle
  }
}

export interface ILinkStyle {
  shape: ILinkShapeStyle
  label: IShapeLabelStyle
  states: {
      [key in  ILinkStateTypes] : ILinkStyle
  }
}


export interface NodeStyleMapType {
  [key: string]: INodeStyle
}

export interface LinkStyleMapType {
  [key: string]: ILinkStyle
}

export interface GraphicsStyles {
  nodes: NodeStyleMapType
  links: LinkStyleMapType
  defaultNodeStyle: INodeStyle
  defaultLinkStyle: ILinkStyle
}


export interface ExtraSettings {
  // size
  nodeSizeBasedOn : 'degree' | 'default'
  // color
  nodeColorBasedOn : 'group' | 'default'
  linkColorBasedOn : 'group' | 'default'
}
