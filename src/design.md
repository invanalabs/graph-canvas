# Canvas

- [ ] **canvas** - state, display, interactions, camera, renderer
- [ ] **state**
    - [ ] data (nodes, links, focusedNodes, annotatedLinks, annotatedNodes)
- [ ] **display**
    - [ ] displayCfg (nodes<str:NodeCfg>, links<str:LinkCfg> and canvas<CanvasCfg>), 
            camera (zoomLevel, position), renderer(screen, webgl/webgpu)
- [ ] **interactions**
    - [ ] interactions (canvasContextMenu, nodeContextMenu, linkContextMenu, defaultContextMenu)
- [ ] **camera** - zoomIn, zoomOut, focusOnAll, focusOnSelection, 
- [ ] **renderer** - renders the data from datastore, interactions, 

 

```javascript
const canvasConfig = {
    data : {
        nodes: [
            {id: 1, label: "Ravi", type: "Person", shape: "circle", "properties": {}},
            {id: 2, label: "Graph Canvas", type: "Project", shape: "circle", "properties": {}}
        ],
        links: [
            {id: 3, label: "authored", type: "authored_projects", shape: "straight", "properties": {} }
        ]
    },
    display: {
        nodes: {
            _default: {borderColor: }
        }
    }
}

const canvas = new Canvas()

```