# Canvas



- Canvas -> Camera -> Layers -> Graphics
- Canvas -> Data -> StyledData -> Texture -> Graphics


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
            {id: 1, label: "Ravi", group: "Person", shape: "circle", "properties": {first_name: "Ravi"}, position: (1, 3), size: 10},
            {id: 2, label: "Graph Canvas", group: "Project", shape: "circle", "properties": {"name": "Graph Canvas"}, position: (10, 15), size: 15}
        ],
        links: [
            {id: 3, label: "authored", type: "authored_projects", shape: "straight", "properties": {} }
        ]
    },
    display: {
        nodes: {
            _default: {
                border:{width: 2, color: "#fff" }, 
                background: { color: "#222", imageUrl: "https://placehold.jp/150x150.png", opacity: 1},
                size: 2, // how to generate dynamic node sizes based on adj matrix.

            }
        }
    }
}

const canvas = new Canvas()

```