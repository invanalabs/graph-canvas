# How to use 

for next version 

## Managing graphdata 
```javascript
const gcanvas = Graphgcanvas()
```

```javascript

// data
const nodes = [
  {id: 1, label: 'Hello', group: 'Greeting', draggable : true, interactive: true, shape: 'circle'}, 
  {id: 2, label: 'World', group: 'Greeting', properties: {}}
]
// for nodes extra 
// use draggable : true -> for enabling dragging Node 
// use interactive : true -> for enabling mouse/pointer interactions
// use shape: "circle" -> for the shape of the graphics
// use style: {} -> for styling the shape - bg[color, icon, image], size, border[size, style, color]

const links = [{id: '1-2', source: 1, target: 2}]

// for links extra 

// actions you can do on the graph 
gcanvas.graph.add(nodes, links)
gcanvas.graph.delete(nodes, links)

gcanvas.graph.updateNodeProps(1, {test: 'test data'})
gcanvas.graph.updateNodeLinks
gcanvas.graph.updateLinkProps('1-2', {test: 'test data'})

```

## Drawing graphics 

```javascript 

gcanvas.display.set
```


## Actions on the states 

render nodes only when visible=true, 

```javascript
// So on, and soforth for selected, unSelected highlighted, unHighlighted, muted, visible

// nodes states
gcanvas.state.hoverNode(1)
gcanvas.state.unHoverNode(1)

gcanvas.state.selectNode(2)
gcanvas.state.unSelectNode(2)

gcanvas.state.highlightNode(2)
gcanvas.state.unHighlightNode(2)

gcanvas.state.muteNode(2)

gcanvas.state.setNodeVisible(2) // show
gcanvas.state.setNodeInVisible(2) // hide

// links states
gcanvas.state.hoverLink(1)
gcanvas.state.unHoverLink(1)

gcanvas.state.selectLink(2)
gcanvas.state.unSelectLink(2)

gcanvas.state.highlightLink(2)
gcanvas.state.unHighlightLink(2)

gcanvas.state.muteLink(2)

gcanvas.state.hideLink(2)
gcanvas.state.showLink(2)

```

## Animations
```javascript
// animations on nodes
gcanvas.state.animateNode(2, type="pulsate")
gcanvas.state.moveNodeTo(150, 300)

// manipulating the links states
gcanvas.state.animateLink('1-2', source=1, target=2)
```



## Events
```javascript

// set events 
gcanvas.on('newDataAdded', (event) => {
  console.log("newDataAdded triggered")
})

gcanvas.on('nodeClicked', (event) => {
  console.log("nodeClicked triggered")
})

gcanvas.on('nodeMoved', (event) => {
  console.log("nodeMoved triggered")
})


gcanvas.on("nodeHovered", (event)=>{ 
})
gcanvas.on("nodeUnHovered", (event)=>{ 
})
```
