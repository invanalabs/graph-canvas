import React, { useCallback } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  MarkerType,
  Panel,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ConnectionLineType
} from "reactflow";
import { resetHandlePathHighlight } from "./highlight-utils";

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

function calcNodeHeight(node) {
  if (node.data.fields) {
    return defaultColumnHeight * node.data.fields.length + 60;
  }
  return defaultColumnHeight + 60;
}

const onInit = (reactFlowInstance) =>
  console.log("flow loaded:", reactFlowInstance);

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

// https://v9.reactflow.dev/examples/layouting/
// In order to keep this example simple the node width and height are hardcoded.
// In a real world app you would use the correct width and height values of
// const nodes = useStoreState(state => state.nodes) and then node.__rf.width, node.__rf.height

const getLayoutedElements = (nodes, edges, direction = "LR") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    console.log("node.id", node);
    dagreGraph.setNode(node.id, {
      width: defaultNodeWidth,
      height: calcNodeHeight(node)
    });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target, {
      // length: 200
    });
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? "left" : "top";
    node.sourcePosition = isHorizontal ? "right" : "bottom";

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - defaultNodeWidth / 2,
      y: nodeWithPosition.y - calcNodeHeight(node) / 2
    };

    return node;
  });

  return { nodes, edges };
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges
);

const OverviewFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onElementClick = (event, object) => {
    const graphElements = [object.id];
    console.log("======onElementClick", graphElements);
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
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
    (direction) => {
      const {
        nodes: layoutedNodes,
        edges: layoutedEdges
      } = getLayoutedElements(nodes, edges, direction);

      console.log("layoutedEdges", layoutedEdges);
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
    edge.type = ConnectionLineType.Step;

    return edge;
  });

  return (
    <ReactFlow
      nodes={nodes}
      edges={edgesWithUpdatedTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={onInit}
      onNodeClick={onElementClick}
      onEdgeClick={onElementClick}
      fitView
      attributionPosition="top-right"
      connectionLineType={ConnectionLineType.Bezierre}
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
      <MiniMap
        // style={minimapStyle}
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
      <Controls />
      <Background color="#aaa" gap={16} />
      <Panel position="top-right">
        <button onClick={() => onLayout("TB")}>vertical layout</button>
        <button onClick={() => onLayout("LR")}>horizontal layout</button>
      </Panel>
    </ReactFlow>
  );
};

export default OverviewFlow;
