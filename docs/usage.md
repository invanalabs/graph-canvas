# Usage


## Data 


### Node data
```javascript
{
    "label": "Project",
    "id": "graph-canvas-id"
    "display_text": "graph canvas",
    "properties": {
        "name": "graph canvas",
        "url" : "https://github.com/invana/graph-canvas" 
    }
}
```

### Edge data
```javascript
{
    "label": "authored_by",
    "id" : "edge-id",
    "from": "graph-canvas-id",
    "to" : "author-id",
    "properties": {
        "started_at": "01-01-2022"
    }
}
```

### NodeStyle
```javascript
{
    "shapeStyle": {
        "shape" : "circle",
        "backgroundColor": "#",
        "borderColor" : "#",
        "borderWidth": 2,
    },
    label: {
        defaultValue: "hello-value", // if no value exist for fromPropertyKey
        fromPropertyKey: "",
        fontSize: 16

    }
} 
```

### EdgeStyle
```javascript
{
    "length" : 200,
    "color" : "#",
    "width": 1
}
```

## Data store
```javascript
const dataStore: GraphDataStore = new GraphDataStore();
dataStore.updateData([]:Array<Node>, []:Array<Edge>)
dataStore.removeData([]:Array<Node>, []:Array<Edge>)
dataStore.clear()
```

## Event store

To store the events happened on the graph 
1. node and edge position changed
2. add, update, remove nodes and edges
3. add, update, remove node and edge styles
4. positions freezed.


```javascript

const eventStore: EventStore = new EventStore();


```


## Art board controller

```javascript

const artBoardController: ArtBoardController = new ArtBoardController();

// camera
artBoardController.saveImageAsPNG(); // camera
artBoardController.saveImageAsJPEG(); // camera

// zoom
artBoardController.zoomIn(); // zoom
artBoardController.zoomOut(); // zoom

// full screen
artBoardController.resizeToFullScreen(); 
artBoardController.restoreToOriginalSize();  



```


## Art board

Artboard contains the colors, shapes and background info

```javascript
const dataStore: GraphDataStore = new GraphDataStore();
const artBoard: ArtBoard = new ArtBoard("container-id", dataStore);

artBoard.updateNodeStyle("Person", {});
artBoard.removeNodeStyle("Person");

artBoard.updateEdgeStyle("authored_by", {});
artBoard.removeEdgeStyle("authored_by");

artBoard.removeAllStyles(); // resets all nodes and edges styles

artBoard.updateBackground(); 

artBoard.stopPhysics(); 
artBoard.startPhysics(); 
artBoard.redraw();

artBoard.updateLayout("layoutName);

```

## Initiating a canvas

```javascript
import {GraphCanvas} from "../graph/canvas-ctrl";


const graphSchema = {}
const graphCanvas: GraphCanvas = new GraphCanvas("container-id", dataStore);



```

## 
