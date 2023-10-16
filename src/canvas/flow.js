import "./styles.scss";
import FlowCanvas from './canvas';

export default function Flow() {
  return (
    <div className="App">
      <h1>ER diagram with Reactflow</h1>
      {/* <h2>Start editing to see some magic happen!</h2> */}
    
        <FlowCanvas />
 
    </div>
  );
}
