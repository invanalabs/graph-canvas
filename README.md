# graph-canvas

React UI components for creating network graphs.

## Feature Checklist 
- [ ] ArtBoard
  - Node/Edge Context Menu
- [ ] Node/Edge Detail Viewer
  - [ ] Property Viewer
  - [ ] Neighbors schema
- [ ] DisplaySetting
  - [ ] Node/Edge 
    - [ ] color
    - [ ] shape
    - [ ] shapeSize
    - [ ] display text
  - [ ] ArtBoard 
    - [ ] Background Color
    - [ ] Background grid
- [ ] ArtBoard ToolBar
  - [ ] layout
  - [ ] Find in ArtBoard
  - [ ] Zoom in/out
  - [ ] Fit to screem
  - [ ] redraw
  - [ ] Save as 
    - [ ] image.png/jpeg
    - [ ] json
    - [ ] json with positions freezed
  - [ ] Clear ArtBoard
  - [ ] Select Node/Edge (Multi select)
  - [ ] undo, redo 
  - [ ] enable/disable read only mode (freeze data)
  - [ ] Create Notes on ArtBoard
- [ ] Story Creator 
  - [ ] Create story state 
  - [ ] Play, Pause, next, prev state 


All the featuers use localStorage as default data store, 

## To use with in a HTML page
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>UMD Example</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>

</head>
<body>
<div id="root"></div>
<script src="./dist/umd/bundle.js"></script>
<script type="text/javascript">
    const e = React.createElement;
    const domContainer = document.querySelector('#root');
    const root = ReactDOM.createRoot(domContainer);
    root.render(e(GraphCanvas.ArtBoard, {label: "R2Lab"}));
</script>

</body>
</html>
```
example in `examples/html-umd/index.html`

## To use with in a ReactJS App

```typescript jsx
import {ArtBoard} from "graph-artBoard"

function App() {
    return (
        <ArtBoard label={"R2Lab"}/>
    );
}

export default App;
```
Full example in `examples/react-app`