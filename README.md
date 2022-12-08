# React Setup Example 

This is a reference project for creating react reusable components with rollup. 

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
    root.render(e(HelloApp.ArtBoard, {label: "R2Lab"}));
</script>

</body>
</html>
```
example in `examples/html-umd/index.html`

## To use with in a ReactJS App

```typescript jsx
import {ArtBoard} from "hello-app"

function App() {
    return (
        <ArtBoard label={"R2Lab"}/>
    );
}

export default App;
```
Full example in `examples/react-app`