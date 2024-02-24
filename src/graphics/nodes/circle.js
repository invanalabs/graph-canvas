import PropTypes, { any } from 'prop-types';
import * as PIXI from 'pixi.js';

// https://levelup.gitconnected.com/creating-a-force-graph-using-react-d3-and-pixijs-95616051aba

// interface CircleInterface {
//     bgColor: String,
//     size: number
// }

const CircleGraphics = ({ bgColor, size }) => {


    if (!bgColor){
        bgColor = '#ff00ff'
    }
    if (!size){
        size = 20
    }
    console.log("====bgColor", bgColor)
    const gfx = new PIXI.Graphics();
    gfx.lineStyle(1.5, 0xFFFFFF);
    // gfx.beginFill(color(group));
    gfx.beginFill(bgColor)
    gfx.drawCircle(0, 0, size);
    gfx.endFill();


    gfx.interactive = true;
    gfx.buttonMode = true;
    gfx.hitArea = new PIXI.Circle(0, 0, size);
    // gfx.hitArea.beginFill(0xFF00FF)

    const nodeLabel = "My Label here";

    const text = new PIXI.Text(nodeLabel, {
        fontSize: 12,
        fill: '#000'
      });
    text.anchor.set(0.5);
    text.resolution = 10;
    gfx.addChild(text);


    // gfx.on("pointerover", ()=>pointerOver(node));
    // gfx.on("pointerout", ()=>pointerOut(node));
    return gfx
}

// CircleGraphics.propTypes = {
//     bgColor:  PropTypes.any,
//     size: PropTypes.number
// }

CircleGraphics.defaultProps = {
    bgColor: '#ff00ff',
    size: 20
}

export default CircleGraphics

// const circle = new Graphics();
// circle.interactive = true;
//  circle.buttonMode = true;
// circle.beginFill(0xfff8dc, 0.85);
// circle.drawCircle(0, 0, 50);
// circle.position.set(viewport.screenWidth / 2, viewport.screenHeight / 2);
// Opt-in to interactivity

// new PIXI.Graphics().beginFill(0xffff00).drawCircle(0, 0, 58).endFill()
