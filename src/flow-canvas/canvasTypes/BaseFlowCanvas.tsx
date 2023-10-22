import { useCallback, useState, useRef } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Panel,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ReactFlowInstance,
  ReactFlowProvider,
  applyEdgeChanges, applyNodeChanges, NodeChange, EdgeChange, Edge, Node
  // useStore
} from "reactflow";
import "../styles.scss";
import styled, { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from "../theme";
import React from "react";
import { resetHandlePathHighlight } from "../interactions/EntityRelationHighlight";
import "reactflow/dist/style.css";
// import { getLayoutedElements } from "../layouts/dagre";
import { CanvasEdge, CanvasNode, FlowCanvasProps } from "../core/types";
import { defaultCanvasSettings, defaultCanvasStyle } from "../settings";
import { CanvasNodeTemplates } from "../nodeTemplates";
import { CanvasEdgeTemplates } from "../edgeTemplates";
import CanvasInteractions from "../interactions/interactions";
import GenericNodeContextMenu from "../components/ContextMenu/GenericNodeContextMenu";
import GenericEdgeContextMenu from "../components/ContextMenu/GenericEdgeContextMenu";
import { defaultLayoutChange } from "../layouts/noLayout";




const BaseFlowCanvas = ({
  children,
  initialNodes,
  initialEdges = [],
  onLayoutChange,
  NodeContextMenu, 
  EdgeContextMenu,
  style = defaultCanvasStyle,
  canvasSettings = defaultCanvasSettings,
  canvasNodeTemplates = CanvasNodeTemplates,
  canvasEdgeTemplates = CanvasEdgeTemplates,
  canvasInteractions = new CanvasInteractions(),


}: FlowCanvasProps) => {


  // const getNodeSizeInfo = (nodeId: string) => {
  //   return useStore((s: any) => {
  //     const mynode = s.nodeInternals.get(nodeId);
  //     console.log("==mynode", mynode)
  //     return {
  //       width: mynode?.width,
  //       height: mynode?.height,
  //     };
  //   });
  // }

  const [flowInstance, setFlowInstance] = useState<ReactFlowInstance | null | undefined>(null);

  console.log("====onLayoutChange", onLayoutChange);

  const { layoutedNodes, layoutedEdges } = onLayoutChange(
    initialNodes,
    initialEdges,
    flowInstance,
    "LR"
  );

  const [mode, setMode] = useState('dark');
  const theme = mode === 'light' ? lightTheme : darkTheme;

  const toggleMode = () => {
    setMode((m) => (m === 'light' ? 'dark' : 'light'));
  };

  // const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  // const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const [nodes, setNodes] = useNodesState(layoutedNodes);
  const [edges, setEdges] = useEdgesState(layoutedEdges);

  const [contextMenuItem, setContextMenuItem] = useState(null);

  const [direction, setDirection] = useState("LR");

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const ref = useRef(null);

  const onNodeContextMenu = useCallback(
    (event: React.MouseEvent, node: Node) => {
      // Prevent native context contextMenuItem from showing
      event.preventDefault();
      const pane = ref.current.getBoundingClientRect();
      setContextMenuItem({
        id: node.id,
        type: "node",
        top: event.clientY < pane.height - 200 && event.clientY,
        left: event.clientX < pane.width - 200 && event.clientX,
        right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
        bottom: event.clientY >= pane.height - 200 && pane.height - event.clientY,
      });

    },
    [setContextMenuItem]
  );

  const onEdgeContextMenu = useCallback(
    (event: React.MouseEvent, edge: Edge) => {
      // Prevent native context contextMenuItem from showing
      event.preventDefault();
      console.log("====onEdgeContextMenu", edge, event, event.clientX, event.clientY)
      const pane = ref.current.getBoundingClientRect();
      setContextMenuItem({
        id: edge.id,
        type: "edge",
        top: event.clientY < pane.height - 200 && event.clientY,
        left: event.clientX < pane.width - 200 && event.clientX,
        right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
        bottom: event.clientY >= pane.height - 200 && pane.height - event.clientY,
      });

    },
    [setContextMenuItem]
  );



  const onPaneClick = useCallback(() => setContextMenuItem(null), [setContextMenuItem]);


  const onInit = (reactFlowInstance: ReactFlowInstance) => {
    console.log("flow loaded:", reactFlowInstance);
    setFlowInstance(reactFlowInstance);
    reactFlowInstance?.zoomTo(1);
    reactFlowInstance?.fitView();

    onLayout(direction)
  }

  // const onNodeClick = (event: React.MouseEvent, object: CanvasNode) => {
  //   console.log("======onNodeClick", object.id);
  // };
  // const onEdgeClick = (event: React.MouseEvent, object: CanvasEdge) => {
  //   const edge = flowInstance?.getEdge(object.id)
  //   console.log("clicked edge", edge)
  // };

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
      } = onLayoutChange(nodes, edges, flowInstance, direction);
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
    // edge.type = canvasSettings.edges.type;
    if (edge.source === edge.target) {
      edge.type = "SelfConnectingEdge"
    }
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
    <div style={style} >
      <ThemeProvider theme={theme}>
        <ReactFlowProvider>
          <ReactFlow
            ref={ref}
            nodes={nodes}
            className="dark-theme"
            edges={edgesWithUpdatedTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={onInit}
            // onNodeClick={onNodeClick}
            onEdgeClick={(event: React.MouseEvent, edge: Edge) => canvasInteractions.onEdgeClick(event, edge, flowInstance)}
            onEdgeMouseEnter={(event: React.MouseEvent, edge: Edge) => canvasInteractions.onEdgeMouseEnter(event, edge, flowInstance)}
            onEdgeMouseLeave={(event: React.MouseEvent, edge: Edge) => canvasInteractions.onEdgeMouseLeave(event, edge, flowInstance)}
            onNodeMouseEnter={(event: React.MouseEvent, node: Node) => canvasInteractions.onNodeMouseEnter(event, node, flowInstance)}
            onNodeMouseLeave={(event: React.MouseEvent, node: Node) => canvasInteractions.onNodeMouseLeave(event, node, flowInstance)}

            onNodeContextMenu={onNodeContextMenu}
            onEdgeContextMenu={onEdgeContextMenu}


            fitView
            minZoom={0.2}
            attributionPosition="top-right"
            // connectionLineType={canvasSettings.edges.type}
            nodeTypes={canvasNodeTemplates}
            edgeTypes={canvasEdgeTemplates}

          // onNodeMouseLeave={() =>
          //   resetHandlePathHighlight(
          //     nodes,
          //     edgesWithUpdatedTypes,
          //     setNodes,
          //     setEdges
          //   )
          // }
          >

            {contextMenuItem && contextMenuItem?.type === "edge" && <NodeContextMenu onClick={onPaneClick} {...contextMenuItem} />}
            {contextMenuItem && contextMenuItem?.type === "node" && <EdgeContextMenu onClick={onPaneClick} {...contextMenuItem} />}

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
            <Background color="#444" style={{ backgroundColor: theme.bg }} gap={16} />
            <Panel position="top-right">
              <button onClick={() => onLayout("TB")}>vertical layout</button>
              <button onClick={() => onLayout("LR")}>horizontal layout</button>
              <button onClick={toggleMode}>switch mode</button>
            </Panel>
            {children}
          </ReactFlow>
        </ReactFlowProvider>
      </ThemeProvider>
    </div>
  );
};


BaseFlowCanvas.defaultProps = {
  onLayoutChange: defaultLayoutChange,
  canvasInteractions: new CanvasInteractions(),
  NodeContextMenu: GenericNodeContextMenu,
  EdgeContextMenu: GenericEdgeContextMenu

};

export default BaseFlowCanvas;
