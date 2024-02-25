import PropTypes, { any } from 'prop-types';
import * as PIXI from 'pixi.js';
import { findPivot, midPoint, HALF_PI, THREE_HALF_PI, angle } from '../utils';
import ArrowSprite from '../textures/arrow';


const EdgeGraphics = ({ source, target }) => {

    const edgeLayerGfx = new PIXI.Graphics();
    edgeLayerGfx.interactive = true;
    edgeLayerGfx.buttonMode = true;

    // line 
    // straight, loop, curved - brazier, straight but curved,  


    // console.log("===source", source)

    const sourceRadius = 20;// TODO- hardcoded
    const targetRadius = 20;

    // if line is straight 
    const theta = angle(source.x, source.y, target.x, target.y);
    const sourcePivot = findPivot(source.x, source.y, theta, -sourceRadius);
    const targetPivot = findPivot(target.x, target.y, theta, targetRadius)
    let center = midPoint(sourcePivot[0], sourcePivot[1], targetPivot[0], targetPivot[1])


    // let lineCenterPoint = midPoint(sourcePivot[0], sourcePivot[1], targetPivot[0], targetPivot[1])



    // find the offset for the source and target nodes, 
    const sourceOffset =  findPivot(source.x, source.y, theta, -sourceRadius - ArrowSprite.arrowHeight)
    const targetOffset =   findPivot(target.x, target.y, theta, targetRadius + ArrowSprite.arrowHeight)


    const lineGfx =  new PIXI.Graphics();
    // lineGfx.lineStyle(2, 0xD3D3D3);
    lineGfx
        .moveTo(sourceOffset[0], sourceOffset[1])
        .lineStyle(2, 0xD3D3D3)
        .lineTo(targetOffset[0], targetOffset[1]);


    // label
    const labelContainer = new PIXI.Container();
    const nodeLabel = "Edge here";
    const text = new PIXI.Text(nodeLabel, {
        fontSize: 12,
        fill: '#000'
      });
    text.anchor.set(0.5);
    text.resolution = 10;
    labelContainer.addChild(text);
    labelContainer.x = center[0]
    labelContainer.y = center[1]
    labelContainer.rotation = theta > HALF_PI && theta < THREE_HALF_PI ? theta - Math.PI : theta

    // add line and label to edgeLayer
    edgeLayerGfx.addChild(lineGfx);
    edgeLayerGfx.addChild(labelContainer)
    return edgeLayerGfx

}

export default EdgeGraphics