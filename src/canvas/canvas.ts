import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport'
import type { ICanvas } from '@pixi/core';
import type { EventSystem } from 'pixi.js';



class Canvas {

    /*


    */


    viewport: Viewport;
    app: PIXI.Application;
    artBoard: PIXI.Graphics;

    displaySettings: any;


    // screenHeight = 800;
    // screenWidth = 1200;
    // displaySettings = {
    //     screenWidth: this.screenWidth,
    //     screenHeight: this.screenHeight,
    //     worldWidth: this.screenWidth * 4,
    //     worldHeight: this.screenHeight * 4,

    //     backgroundColor: 0x1099bb, // light blue 
    //     // backgroundColor: 0xf2eecb, // wheat
    // }

    createDisplaySettings(divWidth: number, divHeight: number) {
        return {
            screenWidth: divWidth,
            screenHeight: divHeight,
            worldWidth: divWidth * 4,
            worldHeight: divHeight * 4,
    
            backgroundColor: 0x1099bb, // light blue 
            // backgroundColor: 0xf2eecb, // wheat
        }
    }


    constructor(div: ICanvas) {

        if (!div) {
            throw ("div cannot be null")
        }

        const divRectangle = div?.getBoundingClientRect();
        this.displaySettings = this.createDisplaySettings(divRectangle.width, divRectangle.height)

        this.app = new PIXI.Application({
            width: this.displaySettings.screenWidth,
            height: this.displaySettings.screenHeight,
            view: div,
            antialias: true,
            // autoResize: true,
            autoDensity: false,
            // resolution: window.devicePixelRatio || 1, /// 2 for retina displays
            backgroundColor: this.displaySettings.backgroundColor,
        });

        this.viewport = this.createViewPort(this.app.renderer.events) // create viewport 
        this.app.stage.addChild(this.viewport); // add viewport to stage

        // stage for all the canvas dr
        this.artBoard = new PIXI.Graphics();
    }


    createViewPort = (events: EventSystem) => {
        const viewport = new Viewport({
            screenWidth: this.displaySettings.screenWidth,
            screenHeight: this.displaySettings.screenHeight,
            worldWidth: this.displaySettings.screenWidth * 4,
            worldHeight: this.displaySettings.screenHeight * 4,
            events: events,
            // resolution: 2, //window.devicePixelRatio
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
                minWidth: this.displaySettings.screenWidth / 2,
                minHeight: this.displaySettings.screenHeight / 2
            })
    }

}


export default Canvas;