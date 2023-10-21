import FlowCanvas  from './flow-canvas/canvas';
import { initialNodes, initialEdges } from "./example-datasets/raw/er-mock-data";

export default function App() {
  return (
    <div className="App">
      {/* <h1>ER diagram with Reactflow</h1> */}
      <FlowCanvas  initialNodes={initialNodes} initialEdges={initialEdges} />
    </div>
  );
}
