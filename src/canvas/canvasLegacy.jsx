import PropTypes, { any } from 'prop-types';
import * as PIXI from 'pixi.js-legacy';


const Canvas = ({ ...props }) => {
    // https://observablehq.com/@tlinkner/d3-webgl-force-graph-with-pixi-js-and-forceinabox-js-cluster
    // https://github.com/markuslerner/d3-webworker-pixijs?tab=readme-ov-file
    // https://observablehq.com/@zakjan/force-directed-graph-pixi
    

    // https://www.pixiplayground.com/#/edit/B8R6ZZD8JROtw1c52LFnN (unlimited canvas)

    /*

    - unlimited canvas
    - background Texture - grid, dotted
    - zoom, pan
    - minimap 
    - interactions 


    */
    
  // setup PIXI
  const stage = new PIXI.Container();
  const renderer = PIXI.autoDetectRenderer({
    width: props.width,
    height: props.height,
    antialias: true,
    autoResize:true,
    resolution: 2, 
    backgroundColor: 0xFFFFFF
  });


    return (<div className="graphCanvas"></div>)

}

Canvas.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    resolution: PropTypes.number
}

Canvas.defaultProps = {
    height: 600,
    width: 400,
    resolution: window.devicePixelRatio
}
export default Canvas;
