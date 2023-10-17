import { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Panel,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ReactFlowInstance,
  ReactFlowProvider
} from "reactflow";
import "./styles.scss";
import styled, { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from "./theme";
import React from "react";
import { resetHandlePathHighlight } from "./utils/highlight";
import CollectionNode from "./customNodes/Collection";

import "reactflow/dist/style.css";
import { getLayoutedElements } from "./core/layouts/dagre";
import { CanvasEdge, CanvasNode, FlowCanvasProps } from "./core/types";
import { defaultCanvasSettings } from "./settings";


const nodeTypes = {
  Collection: CollectionNode,
  // DataStore: DataStoreNode,
  // DerivedCollection: DerivedCollectionNode
};


const FlowCanvas = ({ children, initialNodes, initialEdges, canvasSettings = defaultCanvasSettings }: FlowCanvasProps) => {

  const { layoutedNodes, layoutedEdges } = getLayoutedElements(
    initialNodes,
    initialEdges
  );

  const [flowInstance, setFlowInstance] = useState<ReactFlowInstance|null|undefined>(null);

  const [mode, setMode] = useState('dark');
  const theme = mode === 'light' ? lightTheme : darkTheme;

  const toggleMode = () => {
    setMode((m) => (m === 'light' ? 'dark' : 'light'));
  };

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const onInit = (reactFlowInstance: ReactFlowInstance) => {
    console.log("flow loaded:", reactFlowInstance);
    setFlowInstance(reactFlowInstance);
  }

  const onNodeClick = (event: React.MouseEvent, object: CanvasNode) => {
    const graphElements = [object.id];
    console.log("======onNodeClick", graphElements);
  };
  const onEdgeClick = (event: React.MouseEvent, object: CanvasEdge) => {
    const graphElements = [object.id];
    console.log("======onEdgeClick", graphElements);
    const edge = flowInstance?.getEdge(object.id)
    console.log("clicked edge", edge)
  };

  const onConnect = useCallback(
    /*
    addEdge(
      {
        ...params,
        // type: ConnectionLineType.Bezier,
        markerEnd: {
          type: MarkerType.ArrowClosed
        }
        // animated: true
      },
      eds
    );
    */
    (params: any) => setEdges((eds) => addEdge({ ...params, }, eds)),
    []
  );

  const onLayout = useCallback(
    (direction: string) => {
      const {
        layoutedNodes,
        layoutedEdges
      } = getLayoutedElements(nodes, edges, direction);
      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
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
    edge.type = canvasSettings.edges.type;
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

  // const ReactFlowStyled = styled(ReactFlow)`
  //     background-color: ${(props) => props.theme.bg};
  // `;
  document.querySelector("html")?.setAttribute("data-canvas-theme", mode);
  return (
    // <div data-canvas-theme="dark">
      <ThemeProvider theme={theme}>
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            className="dark-theme"
            edges={edgesWithUpdatedTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={onInit}
            onNodeClick={onNodeClick}
            onEdgeClick={onEdgeClick}
            fitView
            attributionPosition="top-right"
            connectionLineType={canvasSettings.edges.type}
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
    // </div>
  );
};

export default FlowCanvas;
