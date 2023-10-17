import { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  // MarkerType,
  Panel,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ConnectionLineType,
  Node,
  ReactFlowInstance,
  // Edge,
  // Position,
  ReactFlowProvider
} from "reactflow";
import "./styles.scss";
import styled, { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from "./theme";
import React from "react";
import { resetHandlePathHighlight } from "./core/highlight-utils";
// import { ThemeProvider } from "styled-components";

// https://reactflow.dev/docs/examples/styling/styled-components/

import { initialNodes, initialEdges } from "./mock-data";
import CollectionNode from "./customNodes/Collection";
import DerivedCollectionNode from "./customNodes/DerivedCollection";
import DataStoreNode from "./customNodes/DataStore";
import "reactflow/dist/style.css";
import { getLayoutedElements } from "./core/layouts/dagre";
// import "./overview.css";

const nodeTypes = {
  Collection: CollectionNode,
  DataStore: DataStoreNode,
  DerivedCollection: DerivedCollectionNode
};

// const minimapStyle = {
//   height: 140
// };


const onInit = (reactFlowInstance: ReactFlowInstance) =>
  console.log("flow loaded:", reactFlowInstance);






const { layoutedNodes, layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges
);

console.log("===layoutedNodes", layoutedNodes)
const FlowCanvas = ({ children }: { children: React.ReactNode }) => {


  const [mode, setMode] = useState('dark');
  const theme = mode === 'light' ? lightTheme : darkTheme;

  const toggleMode = () => {
    console.log("toggleMode")
    setMode((m) => (m === 'light' ? 'dark' : 'light'));
  };


  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  // const onElementClick = (event, object) => {
  //   const graphElements = [object.id];
  //   console.log("======onElementClick", graphElements);
  // };

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  // const onConnect = useCallback(
  //   (params) =>
  //     setEdges((eds) =>
  //     addEdge(
  //       {
  //         ...params,
  //         // type: ConnectionLineType.Bezier,
  //         markerEnd: {
  //           type: MarkerType.ArrowClosed
  //         }
  //         // animated: true
  //       },
  //       eds
  //     );
  //     ),
  //   []
  // );

  const onLayout = useCallback(
    (direction: string) => {
      const {
        layoutedNodes,
        layoutedEdges
      } = getLayoutedElements(nodes, edges, direction);

      console.log("layoutedEdges", layoutedEdges);
      setNodes([...nodes]);
      setEdges([...edges]);
    },
    [nodes, edges]
  );
  // we are using a bit of a shortcut here to adjust the edge type
  // this could also be done with a custom edge for example
  const edgesWithUpdatedTypes = edges.map((edge) => {
    // if (edge.sourceHandle) {
    //   const edgeType = nodes.find((node) => node.type === "custom").data
    //     .selects[edge.sourceHandle];
    //   edge.type = edgeType;
    // }
    edge.type = ConnectionLineType.Step;

    return edge;
  });

  // console.log("theme ====", theme);

  const MiniMapStyled = styled(MiniMap)`
  background-color: ${(props) => props.theme.bg};

  .react-flow__minimap-mask {
    fill: ${(props) => props.theme.minimapMaskBg};
  }

  .react-flow__minimap-node {
    // fill: ${(props) => props.theme.nodeBg};
    stroke: none;
  }
`;

  const ControlsStyled = styled(Controls)`
  button {
    background-color: ${(props) => props.theme.controlsBg};
    color: ${(props) => props.theme.controlsColor};
    border-bottom: 1px solid ${(props) => props.theme.controlsBorder};

    &:hover {
      background-color: ${(props) => props.theme.controlsBgHover};
    }

    path {
      fill: currentColor;
    }
  }
`;

  const ReactFlowStyled = styled(ReactFlow)`
  background-color: ${(props) => props.theme.bg};
`;
  return (
    <ThemeProvider theme={theme}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edgesWithUpdatedTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={onInit}
          // onNodeClick={onElementClick}
          // onEdgeClick={onElementClick}
          fitView
          attributionPosition="top-right"
          connectionLineType={ConnectionLineType.Bezier}
          nodeTypes={nodeTypes}
          onNodeMouseLeave={() =>
            resetHandlePathHighlight(
              nodes,
              edgesWithUpdatedTypes,
              setNodes,
              setEdges
            )
          }
        >

          <MiniMapStyled
            nodeColor={(node) => {
              switch (node.type) {
                case "DataStore":
                  return "LightGreen";
                case "Collection":
                  return "Lavender";
                case "DerivedCollectionNode":
                  return "LightBlue";
                // case "sourceNode":
                //   return "Gold";
                default:
                  return "#eee";
              }
            }}
            zoomable
            pannable
          />
          <ControlsStyled />
          <Background color="#aaa" style={{ backgroundColor: theme.bg }} gap={16} />
          <Panel position="top-right">
            <button onClick={() => onLayout("TB")}>vertical layout</button>
            <button onClick={() => onLayout("LR")}>horizontal layout</button>
            <button onClick={toggleMode}>switch mode</button>
          </Panel>
          {children}
        </ReactFlow>
      </ReactFlowProvider>
    </ThemeProvider>
  );
};

export default FlowCanvas;
