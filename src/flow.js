import "./styles.css";
import OverviewFlow from './canvas';

import { ReactFlowProvider } from "reactflow";

export default function Flow() {
  return (
    <div className="App">
      <h1>ER diagram with Reactflow</h1>
      {/* <h2>Start editing to see some magic happen!</h2> */}
      <ReactFlowProvider>
        <OverviewFlow />
      </ReactFlowProvider>
    </div>
  );
}
