import BaseFlowCanvas  from './flow-canvas/canvasTypes/BaseCanvas';
import { initialNodes, initialEdges } from "./example-datasets/raw/er-mock-data";

export default function App() {
  return (
    <div className="App">
      {/* <h1>ER diagram with Reactflow</h1> */}
      <BaseFlowCanvas  initialNodes={initialNodes} initialEdges={initialEdges} />
    </div>
  );
}
