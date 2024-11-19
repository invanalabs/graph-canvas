import { ILinkStyle, ILinkOptions } from "./types";


export const linkStyleDefaults: ILinkStyle = {
  thickness: 1,
  fill: {
    color: 0x555555,
    alpha: 1
  }

}

export const linkOptionsDefaults: ILinkOptions = {
  source: { x: 0, y: 0 },
  target: { x: 0, y: 0 },
  style: linkStyleDefaults,
  renderOptions: {
    isRenderGroup: true
  }
}