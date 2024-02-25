import PropTypes, { any } from 'prop-types';
import * as PIXI from 'pixi.js';



class ArrowSprite {

     static arrowHeight = 12
     static arrowWidth = 6
     texture = null


    constructor(app){
        this.texture = app.renderer.generateTexture(new PIXI.Graphics()
            .beginFill(0xffffff)
            .lineTo(arrowHeight * 2, arrowWidth)
            .lineTo(arrowHeight * 2, -arrowWidth),
            PIXI.SCALE_MODES.LINEAR, 2 )
    }


    create(){
        const sprite = new PIXI.Sprite(texture)
        sprite.anchor.set(0, 0.5)
        sprite.scale.set(0.5)
        return sprite
    }

    delete(){
        this.texture.destroy()
    }


}


export default ArrowSprite