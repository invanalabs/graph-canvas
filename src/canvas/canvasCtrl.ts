import { Edge, Network, Node } from "vis-network";


class CanvasCtrl{

    network: Network 
    constructor(network: Network){
        this.network = network
    }
    // - [ ] Clear canvas 
    // - [ ] Canvas bg 
    // - [ ] Display properties 
    //     - [ ] Node and edge display
    //     - [ ] Layout settings (vertcial/horizontal tree)
    // - [ ] Context menu on node (Customisable)
    // - [ ] Zoom in (+, -, reset view )
    // - [ ] Redraw 
    // - [ ] Export - json, jpeg, png, svg. 
    // - [ ] Load - from json with positions
    // - [ ] Search in canvas 
    // - [ ] focus on nodes

    clear(){

    }

    redraw(){

    }

    focusNodes(nodes: Array<Node>){

    }

    updateBackground(color:string, pattern: null){

    }

    updateDisplaySettings(nodeSettings: any, edgeSettings:any, layoutSettings: any ){

    }

    zoomIn(factor: number){

    }

    zoomOut(factor: number){

    }

    resetZoom(){

    }
    import(nodes, edges){

    }

    exportAsJPEG(){

    }

    exportAsPNG(){
        
    }

    exportAsJSON(retainPositions: boolean= false){
        
    }

    exportAsSVG(){
        
    }

    searchNodeByDisplayLabel(s:string){
        return null
    }

    searchEdgeByDisplayLabel(s:string){
        return null
    }

    highlightNode(node: Node){

    }

    unHighlightNode(node: Node){

    }

    highlightEdge(edge: Edge){

    }

    unHighlightEdge(edge: Edge){

    }


    searchAndHighlightNodeByString(s: string){
        const node = this.searchNodeByDisplayLabel(s)
        this.highlightNode(node)
    }

    searchAndHighlightEdgeByString(s:string){
        const edge = this.searchEdgeByDisplayLabel(s);
        this.unHighlightEdge(edge)

    }    
}

export default CanvasCtrl