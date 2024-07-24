import { IIconStyle } from "../types";
import { Assets, Sprite } from "pixi.js";


export interface IIconShape extends IIconStyle {
    content: string
    // style: IIconStyle

}

const drawImageShape = (imageUrl: string) => {
    return Assets.load(imageUrl)
    
    // .then((texture) => {
    //     return texture
    // }).catch((error) => {
    //     console.error('Error loading texture:', error);
    // });
}

export default drawImageShape;