import { IIconStyle } from "../types";
import { Assets} from "pixi.js";


export interface IIconShape extends IIconStyle {
    content: string
    // style: IIconStyle

}

const drawImageShape = (imageUrl: string, resolution: number=  window.devicePixelRatio) => {
    const extras: any = {
        data: {
            resolution: resolution,
            // resourceOptions: {
            //     scale: window.devicePixelRatio
            // }
        }
    }
    console.log("drawImage extra", extras, imageUrl)
    return Assets.load({
        src: imageUrl,
        data: {
            resolution: resolution,
            resourceOptions: {
                scale: window.devicePixelRatio 
            }
        }
    })
}

export default drawImageShape;