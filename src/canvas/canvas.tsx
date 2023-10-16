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
  Position,
ReactFlowProvider
} from "reactflow";

import styled, { ThemeProvider } from 'styled-components';

import { darkTheme, lightTheme } from "./theme";
import React from "react";
import { resetHandlePathHighlight } from "./highlight-utils";
// import { ThemeProvider } from "styled-components";

// https://reactflow.dev/docs/examples/styling/styled-components/

import { initialNodes, initialEdges } from "./mock-data";
import CollectionNode from "./customNodes/Collection";
import DerivedCollectionNode from "./customNodes/DerivedCollection";
import DataStoreNode from "./customNodes/DataStore";
import "reactflow/dist/style.css";
// import "./overview.css";
import dagre from "dagre";

const nodeTypes = {
  Collection: CollectionNode,
  DataStore: DataStoreNode,
  DerivedCollection: DerivedCollectionNode
};

// const minimapStyle = {
//   height: 140
// };

const defaultNodeWidth = 180 + 30;
const defaultColumnHeight = 36;
// const nodeHeight = 36;

function calcNodeHeight(node: Node) {
  if (node.data.fields) {
    return defaultColumnHeight * node.data.fields.length + 60;
  }
  return defaultColumnHeight + 60;
}

const onInit = (reactFlowInstance: ReactFlowInstance) =>
  console.log("flow loaded:", reactFlowInstance);

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

// https://v9.reactflow.dev/examples/layouting/
// In order to keep this example simple the node width and height are hardcoded.
// In a real world app you would use the correct width and height values of
// const nodes = useStoreState(state => state.nodes) and then node.__rf.width, node.__rf.height

const getLayoutedElements = (nodes: any[], edges: any[], direction: string = "LR") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node: Node) => {
    // console.log("node.id", node);
    dagreGraph.setNode(node.id, {
      width: defaultNodeWidth,
      height: calcNodeHeight(node)
    });
  });

  edges.forEach((edge: { source: string; target: string; }) => {
    dagreGraph.setEdge(edge.source, edge.target, {
      // length: 200
    });
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node: Node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? Position.Left : Position.Top;
    node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - defaultNodeWidth / 2,
      y: nodeWithPosition.y - calcNodeHeight(node) / 2
    };

    return node;
  });
  const layoutedNodes = nodes;
  const layoutedEdges = edges;

  return { layoutedNodes, layoutedEdges };
};



const { layoutedNodes, layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges
);

console.log("===layoutedNodes", layoutedNodes)
const FlowCanvas = ({ children }: { children: React.ReactNode }) => {


  const [mode, setMode] = useState('light');
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
