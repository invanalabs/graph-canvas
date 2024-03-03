// import { Application } from "pixi.js";
// import type {CPIXIAppSetting} from "./types";


// export default class PIXIAppCtrl {

//     app: Application;

//     constructor(settings: CPIXIAppSetting){
//         this.app = this.createPIXIApp(settings)
//     }

//     createPIXIApp(settings: CPIXIAppSetting){
          
//         const app = new Application({
//             width: settings.screenWidth,
//             height: settings.screenHeight,
//             view: settings.containerDiv,
//             antialias: true,
//             resizeTo: window,
//             autoStart: false, // // disable automatic rendering by ticker, render manually instead, only when needed
//             autoDensity: false,
//             resolution: window.devicePixelRatio, /// 2 for retina displays
//             backgroundColor: settings.backgroundColor,
//             eventMode : 'static' //  Emit events and is hit tested. Same as interaction = true in v7
//         });
//         app.stage.hitArea = app.screen;
   
//         // The stage will handle the move events
//         app.stage.interactive = true;
//         // app.stage.hitArea = app.screen;
//         return app;
//     }
// }