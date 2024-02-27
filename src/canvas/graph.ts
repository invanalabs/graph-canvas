import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport'
import type { ICanvas } from '@pixi/core';
import type { EventSystem } from 'pixi.js';
import Circle from '../structures/nodes/circle';
import { ILink, INode, IGraphData } from './types';
import Graph from 'graphology';
import * as d3 from "d3";
import { BaseShape } from '../structures/nodes/base';


class GraphCanvas {

    /*


    */


    viewport: Viewport;
    app: PIXI.Application;
    artBoard: PIXI.Container;

    displaySettings: any;

    dragTarget: BaseShape | null; // selected item for drag 
    graphData: IGraphData;

    constructor(div: ICanvas) {
        if (!div) {
            throw ("div cannot be null")
        }
        this.dragTarget= null;

        // @ts-ignore
        const divRectangle = div?.getBoundingClientRect();

        // if (divRectangle.width === 0 || divRectangle.height === 0 ){
        //     throw (`cannot draw canvas in a div with dimensions ${JSON.stringify(divRectangle)}`)
        // }
        console.log("===divRectangle", divRectangle)
        this.displaySettings = this.createDisplaySettings(divRectangle.width, divRectangle.height)
        // this.displaySettings = this.createDisplaySettings(800,800)

        // this.graph = new Graph();
        this.graphData = { nodes: [], links: [] }

        this.app = new PIXI.Application({
            width: this.displaySettings.screenWidth,
            height: this.displaySettings.screenHeight,
            view: div,
            antialias: true,
            resizeTo: window,
            autoStart: false, // // disable automatic rendering by ticker, render manually instead, only when needed
            // autoResize: true,
            autoDensity: false,
            resolution: window.devicePixelRatio, /// 2 for retina displays
            backgroundColor: this.displaySettings.backgroundColor,
            eventMode : 'static' //  Emit events and is hit tested. Same as interaction = true in v7
        });

        // this.app.renderer.view.style?..background = 'rgba(0,0,0,.1)';
        console.log("==this.app.view", this.app.view)
  
        this.app.stage.hitArea = this.app.screen;
   

        // The stage will handle the move events
        this.app.stage.interactive = true;
        this.app.stage.hitArea = this.app.screen;

        this.viewport = this.createViewPort(this.app.renderer.events) // create viewport 
        this.app.stage.addChild(this.viewport); // add viewport to stage

        // activate plugin
        // this.viewport
        // .drag()
        // .pinch({ percent: 2 })
        // .wheel()
        // .decelerate()
        // .clamp({
        //     left: false,                // whether to clamp to the left and at what value
        //     right: false,               // whether to clamp to the right and at what value
        //     top: false,                 // whether to clamp to the top and at what value
        //     bottom: false,              // whether to clamp to the bottom and at what value
        //     direction: 'all',           // (all, x, or y) using clamps of [0, viewport.worldWidth / viewport.worldHeight]; replaces left / right / top / bottom if set
        //     underflow: 'center',	       // where to place world if too small for screen (e.g., top - right, center, none, bottomleft)
        // })
        // .clampZoom({
        //     minWidth: this.displaySettings.screenWidth,
        //     minHeight: this.displaySettings.screenHeight
        // })
        console.log("===this.displaySettings", this.displaySettings)
        this.viewport.drag().pinch().wheel().decelerate().clampZoom({ minWidth:  this.displaySettings.screenWidth/2, 
            minHeight: this.displaySettings.screenHeight/2 });
  
        // stage for all the canvas dr
        this.artBoard = new PIXI.Container();
        this.viewport.addChild(this.artBoard)
        this.app.ticker.start();
        // // Start the PixiJS app
        this.app.start();
        // this.viewport.fit(true);

    }


    // Handle the relative offset point
    // of the click on the object
    offset = new PIXI.Point();


    zoomIn = () => {
        this.viewport.zoom(-this.displaySettings.worldWidth / 10, true);
    };

    zoomOut = () => {
        this.viewport.zoom(this.displaySettings.worldWidth / 10, true);
    };
 
    fitView() {
        const nodesX = this.graphData.nodes.map((node: INode) => node.x);
        const nodesY = this.graphData.nodes.map((node: INode) => node.y);


        // @ts-ignore
        const minX = Math.min(...nodesX);
        // @ts-ignore
        const maxX = Math.max(...nodesX);
        // @ts-ignore
        const minY = Math.min(...nodesY);
        // @ts-ignore
        const maxY = Math.max(...nodesY);

        const graphWidth = Math.abs(maxX - minX);
        const graphHeight = Math.abs(maxY - minY);
        const graphCenter = new PIXI.Point(
            minX + graphWidth / 2,
            minY + graphHeight / 2
        );
        console.log("===graphCenter", graphCenter, graphWidth, graphHeight)
        // const graphWorldWidth = graphWidth ;// + option.padding * 2;
        // const graphWorldHeight = graphHeight;// + option.padding * 2;
        // this.viewport.resize(this.displaySettings.screenWidth, 
        //     this.displaySettings.screenHeight,
        //     this.displaySettings.graphWorldWidth, this.displaySettings.graphWorldHeight);


        this.viewport.toWorld(graphCenter);
        this.viewport.center = graphCenter;
        this.viewport.fit(true);
    }


    createSimulation = (nodes: INode[], edges: ILink[]) => {
        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(edges) // This force provides links between nodes
                .id((d: ILink) => d.id) // This sets the node id accessor to the specified function.
                // If not specified, will default to the index of a node.
                .distance(200)
            )
            .force("charge", d3.forceManyBody().strength(-500)) // This adds repulsion (if it's negative) between nodes.
            .force("center", d3.forceCenter(this.displaySettings.screenWidth / 2, this.displaySettings.screenHeight / 2))
            .force("collision", d3.forceCollide().radius((d: INode) => 20).iterations(2))
            .velocityDecay(0.8);

        simulation
            .force('link')
            .links(edges);
        return simulation
    }

    createDisplaySettings(divWidth: number, divHeight: number) {
        return {
            screenWidth: divWidth,
            screenHeight: divHeight,
            worldWidth: divWidth * 2,
            worldHeight: divHeight * 2,
            backgroundColor: 0x2a2c2e, // dark 
            // backgroundColor: 0x1099bb, // light blue 
            // backgroundColor: 0xf2eecb, // wheat
        }
    }

    createViewPort = (events: EventSystem) => {
        const viewport = new Viewport({
            screenWidth: this.displaySettings.screenWidth,
            screenHeight: this.displaySettings.screenHeight,
            worldWidth: this.displaySettings.worldWidth,  
            worldHeight: this.displaySettings.worldHeight, 
            events: events,
            // resolution: 2, //window.devicePixelRatio
        });
        // viewport.moveCenter(0, 0);
        return viewport
    }


    ticked = (nodes: INode[], edges: ILink[]) => {
        nodes.forEach((node: INode) => {
            let { x, y, shapeGfx } = node;
            shapeGfx?.position.set(x, y);
        });

        // edges.forEach((link) => {
        //     let { source, target } = link;
        //     link.shapeGfx = EdgeGraphics({ source, target, app })
        //     artBoard.addChild(link.shapeGfx);
        // });

        // visualLinksGfxs.endFill();
    }

    addData = (nodes: Array<INode>, links: Array<ILink>) => {
        console.log("Adding nodes and edges", nodes, links)
        let _this = this;

        // clear canvas
        // this.viewport.removeChildren();

        // render nodes 

        // render links 

        // set canvas events

        // // add to graphology
        // nodes.forEach((node: INode) => {
        //     _this.graphData.addNode(node.id, node);
        // });


        // add to graphData for reuse
        this.graphData = { nodes: nodes, links: links }

        // render nodes
        this.graphData.nodes.map((node: INode) => {
            if (!node.shapeGfx) {
                const shapeContainer = new Circle(_this)
                node.shapeGfx = shapeContainer.draw(node)
                _this.artBoard.addChild(node.shapeGfx);
            }
        });

        // render links 
        this.graphData.links.map((link: ILink) => {
            if (link.shapeGfx) {
                // const shapeContainer = new
            }
        })







        const simulation = this.createSimulation(nodes, links);
        simulation.on("tick", () => this.ticked(nodes, links));
        simulation.on('end', function() { console.log("=Simulation ended");  simulation.stop(); _this.fitView(); });
        // simulation.stop();

        

        // _this.artBoard.
        // console.log("edges", edges)
    }

    // dragstarted(e: any, d: any) {
    //     // hideTooltip();
    //     // if (!e.active) {
    //     //   simulation
    //     //   .alphaTarget(0.3)
    //     //   .restart();
    //     // } 
    //     e.subject.fx = e.subject.x;
    //     e.subject.fy = e.subject.y;
    // }

    // dragged(e: any, d: any) {
    //     e.subject.fx = e.x;
    //     e.subject.fy = e.y;
    // }

    // dragended(e: any, d: any) {
    //     // if (!e.active) {
    //     //     simulation.alphaTarget(0);
    //     // }
    //     e.subject.fx = null;
    //     e.subject.fy = null;
    // }

    // updateDragTarget (dragTarget: BaseShape){
    //     console.log("====updateDragTarget", dragTarget);
    //     this.dragTarget = dragTarget;
    // }

    // getDragTarget() {
    //     console.log("=======getDragTarget", this.dragTarget)
    //     return this.dragTarget;
    // }

    // onDragMove(event: any){
    //     // const params = this;
    //     console.log("onDragMove", this, event.global, event)
            
    //     // @ts-ignore
    //     let dragTarget: BaseShape = this;
    //     console.log("===onDragMove graphCanvas.dragTarget", dragTarget)
 
    //     dragTarget.container.toLocal(event.global, undefined, dragTarget.container.position); 
 
 
    // }

    //  onDragEnd(event: any) {
    //     console.log("onDragEnd", event, this);
    //             // @ts-ignore
    //     let dragTarget: BaseShape | GraphCanvas = this;
    //     // if ( dragTarget instanceof GraphCanvas){
    //     //     // canvas 
    //     // }
    //     if (dragTarget instanceof BaseShape) {
    //         dragTarget.graphCanvas.app.stage.off('pointermove', dragTarget.graphCanvas.onDragMove.bind(this));
    //     }
    // }



}


export default GraphCanvas;