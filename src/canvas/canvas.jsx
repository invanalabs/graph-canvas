import PropTypes, { any } from 'prop-types';
import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport'
import { useRef, useEffect } from 'react';
import generateRectangleGraphics from '../graphics/nodes/rectangle';
import { GraphPaper } from "pixi-graphpaper";


const Canvas = () => {
    // https://observablehq.com/@tlinkner/d3-webgl-force-graph-with-pixi-js-and-forceinabox-js-cluster
    // https://github.com/markuslerner/d3-webworker-pixijs?tab=readme-ov-file
    // https://observablehq.com/@zakjan/force-directed-graph-pixi

    //  Minimap - http://www.kaleadis.de/lab/04-pixi-cam/


    // https://www.pixiplayground.com/#/edit/B8R6ZZD8JROtw1c52LFnN (unlimited canvas)


    /*

    - unlimited canvas
    - background Texture - grid, dotted
    - zoom, pan
    - minimap 
    - animations 
    - graphicsTypes - nodes, edges, labels, compound nodes
    - events - Canvas, Node, Edge - hovered, clicked, doubleClicked, contextMenu, 
    - freeze - nodes, view
    - states - hovered, highlight, selected, visited
    - theme


    */
    const containerRef = useRef(null);
    // const app = useRef(null);


    const screenHeight = 800;
    const screenWidth = 800;
    const displaySettings = {
        screenWidth: screenWidth,
        screenHeight: screenHeight,
        worldWidth: screenWidth * 4,
        worldHeight: screenHeight * 4,

        backgroundColor: 0x1099bb, // light blue 
        // backgroundColor: 0xf2eecb, // wheat
    }

    // let paper = new GraphPaper({
    //     graphWidth: displaySettings.worldWidth,
    //     graphHeight: displaySettings.worldHeight,
    //     majorGridVisible: false,
    //     minorGridVisible: false
    // });


    const createViewPort = (events) =>{
        const viewport =  new Viewport({
            screenWidth: displaySettings.screenWidth,
            screenHeight: displaySettings.screenHeight,
            worldWidth: displaySettings.screenWidth * 4,
            worldHeight: displaySettings.screenHeight * 4,
            events: events,
        });

        return viewport
            .drag()
            .pinch({ percent: 2 })
            .wheel()
            .decelerate()
            .clamp({
                left: false,                // whether to clamp to the left and at what value
                right: false,               // whether to clamp to the right and at what value
                top: false,                 // whether to clamp to the top and at what value
                bottom: false,              // whether to clamp to the bottom and at what value
                direction: 'all',           // (all, x, or y) using clamps of [0, viewport.worldWidth / viewport.worldHeight]; replaces left / right / top / bottom if set
                underflow: 'center',	       // where to place world if too small for screen (e.g., top - right, center, none, bottomleft)
            })
            .clampZoom({
                minWidth: displaySettings.screenWidth / 2,
                minHeight: displaySettings.screenHeight / 2
            })
    }


    useEffect(() => {
        // Create our application instance
        const app = new PIXI.Application({
            width: displaySettings.screenWidth,
            height: displaySettings.screenHeight,
            // view: containerRef.current,
            antialias: true,
            autoResize: true,
            autoDensity: false,
            // resolution: window.devicePixelRatio || 1, /// 2 for retina displays
            backgroundColor: displaySettings.backgroundColor,
        });
        // Add the view to the DOM 
        containerRef.current.appendChild(app.view);
        // const events = new PIXI.EventSystem(app.renderer);
        // events.domElement = app.renderer.view;
        const events = app.renderer.events;

        const viewport = createViewPort(events)
        app.stage.addChild(viewport);

 
        // viewport.addChild(paper)

 

        const rectangle = generateRectangleGraphics()
        viewport.addChild( rectangle);
        app.ticker.start();


        // Start the PixiJS app
        app.start();
        viewport.fit(true);

        return () => {
            // On unload stop the application
            app.stop();
        };


    }, []); // on first load 



    const resetViewport = () => {
        viewport.center = new PIXI.Point(WORLD_WIDTH / 2, WORLD_HEIGHT / 2);
        viewport.fitWorld(true);
    };





    return (<div>
        <div><button>center</button></div>
        <div ref={containerRef} className="graphCanvas"></div>
    </div>)

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
