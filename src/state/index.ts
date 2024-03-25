/*

Two main components 
- Canvas - this 
- GraphData - 

//
- canvas - layout, lens/screen, renderer, interactions, templates 

## GraphCanvas 

// data layer [complete state is maintained here]
- graphData - nodes, links (and Properties), 
    - addData[nodes, links], 
    - updateData[nodes, links]
    - deleteData[nodes, links]
    - model - nodes; links (property)
    - addNodeModel
    - addLinkModel




BorderStyle - width, color
FontStyle - family, size, color, icon, position:<center,TL,TR,BL,BR>, shadow
BackgroundStyle - color, icon, pattern, 
LabelStyle - font:FontStyle, text, background: BackgroundStyle, border: BorderStyle
NodeStyleState - color, background:BackgroundStyle, border:BorderStyle, label:LabelStyle 
NodeStyle - label, shape, states:<default|hovered|visited|highlighted|inactive:NodeStyleState>


Property - key, value
Node - id, label, properties:Property[], updated_at,  
Link - *Node & source:Node, target:Node





- graph
    - model & data 
        - links:Link[]
        - nodes:Node[]
        - addLink
        - addNode
        - mergeNodes
        - mergeLinks
        - deleteNodes[nodeIds]
        - deleteLinks[linkIds]
        - deleteAll()


- canvas
    - style
        - nodeStyle
        - linkStyle


- display/view
    - hideSelection[nodes, links]
    - showSelection[nodes, links]
    - showSelectionOnly[nodes, links]
    - showAll
    - hideAll
    - drawHull 



// canvas 
- artboard - setScreenSize, setWorldSize, zoomIn, zoomOut, fitView(all/selection), focusOnNode,  

// layout layer
- layout - 
- renderer - renderNode, renderLink, renderHull, draw, rerender,
- interactions - on, off, on/off - listeners on user events. 


on 


*/
 
