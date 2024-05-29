
export type IdString = Number | String;

export type ICanvasItemProperties = {
  [key: string]: any;
}

export interface ICanvasItemBase {
  readonly id: IdString
  group: String
  label: String
  data?: ICanvasItemProperties,
}

export interface ICanvasItemStates {
  selected: boolean
  hovered: boolean
}

export interface ICanvasLink extends ICanvasItemBase {
  source: ICanvasNode | IdString
  target: ICanvasNode | IdString

  state: ICanvasItemStates
}

export interface ICanvasNode extends ICanvasItemBase {

  x?: number | undefined
  y?: number | undefined

  state: ICanvasItemStates

  links: ICanvasLink[]
  degree?: {
    incoming: number
    outgoing: number
  }

}
