import { ILink, INode, GraphCanvasSetting } from './types';
import Canvas from '../canvas/pixi';
import StateCtrl from '../state/model';


class GraphCanvas {

    settings: GraphCanvasSetting;
    stateCtrl: StateCtrl;
    canvasCtrl: Canvas; // rendering graphics 
    // layout :ForceLayout;

    constructor(settings: GraphCanvasSetting) {
        this.settings = settings;
        this.stateCtrl = new StateCtrl();
        this.canvasCtrl = new Canvas(settings.canvas, this.stateCtrl);
    }

    addData = (nodes: INode[], links: ILink[]) => {
        console.log("Adding nodes and edges", nodes, links)
        // add data to store 
        this.stateCtrl.addData(nodes, links)
        this.canvasCtrl.layout.runLayout();
        this.canvasCtrl.renderer.render()
    }

}


export default GraphCanvas;