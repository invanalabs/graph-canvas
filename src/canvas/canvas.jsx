import PropTypes, { any } from 'prop-types';
import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport'
import { useRef, useEffect, useState } from 'react';
// import generateRectangleGraphics from '../graphics/nodes/rectangle';
// import { GraphPaper } from "pixi-graphpaper";
import CircleGraphics from '../graphics/nodes/circle';
import EdgeGraphics from '../graphics/edges/edge';
import * as d3 from "d3";


const Canvas = ({nodes, edges}) => {
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
    const toolTipRef = useRef(null); // for tooltip
    const [viewport, setViewport] = useState(null)
    // const stageContainer = useRef(null); // this is the container to which all the graphics are pushed .
    // const app = useRef(null);

    // https://levelup.gitconnected.com/creating-a-force-graph-using-react-d3-and-pixijs-95616051aba

    // const containerRect = container.getBoundingClientRect();
    // const screenHeight = containerRect.height;
    // const screenWidth = containerRect.width;
    // let dragged = false;


    const screenHeight = 800;
    const screenWidth = 1200;
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




    // d3 color scaling function
    // const color = (function() {
    //     let scale = d3.scaleOrdinal(d3.schemeCategory10);
    //     return (num) => parseInt(scale(num).slice(1), 16);
    // })();




    const createSimulation = (nodes, edges) => {
        const simulation =   d3.forceSimulation(nodes)
            .force("link", d3.forceLink(edges) // This force provides links between nodes
                .id((d) => d.id) // This sets the node id accessor to the specified function.
                // If not specified, will default to the index of a node.
                .distance(200)
            )
            .force("charge", d3.forceManyBody().strength(-500)) // This adds repulsion (if it's negative) between nodes.
            .force("center", d3.forceCenter(displaySettings.screenWidth / 2, displaySettings.screenHeight / 2))
            .force("collision", d3.forceCollide().radius((d) => d.radius).iterations(2))
            .velocityDecay(0.8);

        simulation
            .force('link')
            .links(edges);
        return simulation
    }

    const createViewPort = (events) =>{
        const viewport =  new Viewport({
            screenWidth: displaySettings.screenWidth,
            screenHeight: displaySettings.screenHeight,
            worldWidth: displaySettings.screenWidth * 4,
            worldHeight: displaySettings.screenHeight * 4,
            events: events,
            resolution: 4, //window.devicePixelRatio
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


    const ticked = (nodes, edges, artBoard , app) => {
        nodes.forEach((node) => {
          let { x, y, gfx } = node;
          gfx.position = new PIXI.Point(x, y);
        });
    
        // for (let i = visualLinksGfxs.children.length - 1; i >= 0; i--) {
        //     visualLinksGfxs.children[i].destroy();
        // }
    
        // visualLinksGfxs.clear();
        // visualLinksGfxs.removeChildren();
        // visualLinksGfxs.alpha = 1;


        // linkArc = d =>`M${d.source.x},${d.source.y}A0,0 0 0,1 ${d.target.x},${d.target.y}`
    
        edges.forEach((link) => {
          let { source, target, number } = link;
        //   visualLinksGfxs.lineStyle(2, 0xD3D3D3);
        //   visualLinksGfxs.moveTo(source.x, source.y);
        //   visualLinksGfxs.lineTo(target.x, target.y);
        link.gfx = EdgeGraphics({source, target, app})
            artBoard.addChild(link.gfx);

        });
    
        // visualLinksGfxs.endFill();
      }

    // const addTooltip = (hoverTooltip, d, x, y) => {
    //     toolTipRef.current
    //         .transition()
    //         .duration(200)
    //         .style("opacity", 0.9);

    //     toolTipRef.current
    //         .html(hoverTooltip(d))
    //         .style("left", `${x}px`)
    //         .style("top", `${y - 28}px`);
    //   };
    
    //   const removeTooltip = () => {
    //     div.transition().duration(200).style("opacity", 0);
    //   };
    

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
        const viewport = createViewPort(app.renderer.events) // create viewport 
        app.stage.addChild(viewport); // add viewport to stage

        // stage for all the canvas dr
        const artBoard = new PIXI.Graphics();


        // render links first; so that they remain in the bg
        let visualLinksGfxs = new PIXI.Graphics();
        viewport.addChild(visualLinksGfxs);

        // render nodes 
        nodes.forEach((node) => {
            node.gfx = CircleGraphics({})
            artBoard.addChild(node.gfx);
        });
        viewport.addChild(artBoard);
        app.ticker.start();
        // Start the PixiJS app
        app.start();
        viewport.fit(true);
        setViewport(viewport);


        const simulation = createSimulation(nodes, edges);




        simulation.on("tick", ()=> ticked(nodes, edges, artBoard, app));

        return () => {
            // On unload stop the application
            app.stop();
            simulation.stop();
            nodes.forEach((node) => {
              node.gfx.clear();
            });
            // visualLinksGfxs.clear();
            setViewport(null)
        };



    }, []); // on first load 



    const resetViewport = () => {
        viewport.center = new PIXI.Point(WORLD_WIDTH / 2, WORLD_HEIGHT / 2);
        viewport.fitWorld(true);
    };





    return (<div>
        <div className='toolBar'><button>center</button></div>
        <div ref={toolTipRef}></div>
        <div ref={containerRef} className="graphCanvas"></div>
    </div>)

}

Canvas.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    resolution: PropTypes.number,
    nodes: PropTypes.any,
    edges: PropTypes.any
}

Canvas.defaultProps = {
    height: 600,
    width: 400,
    resolution: window.devicePixelRatio,
    nodes: [],
    edges: []
}
export default Canvas;
