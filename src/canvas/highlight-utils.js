// Reference https://github.com/wbkd/react-flow/issues/2418
import { generateFieldName } from "./utils";
const getNextIncomingEdges = (nodeId, handleId, nodes, edges) => {
  const incomingEdges = edges
    .filter((e) => e.target === nodeId && e.targetHandle === handleId)
    .map((e) => e);
  return incomingEdges;
};

const getNextOutgoingEdges = (nodeId, handleId, nodes, edges) => {
  const outgoingEdges = edges
    .filter((e) => e.source === nodeId && e.sourceHandle === handleId)
    .map((e) => e);
  return outgoingEdges;
};

const getAllIncomers = (
  nodeId,
  handleId,
  nodes,
  edges,
  prevIncomingEdge = []
) => {
  const incomingEdges = getNextIncomingEdges(nodeId, handleId, nodes, edges);
  const result = incomingEdges.reduce((memo, inComingEdge) => {
    memo.push(inComingEdge);
    console.log("inComingEdge", inComingEdge);

    if (prevIncomingEdge.findIndex((n) => n.id === inComingEdge.target) === -1) {
      prevIncomingEdge.push(inComingEdge);

      getAllIncomers(
        inComingEdge.source,
        inComingEdge.sourceHandle,
        nodes,
        edges,
        prevIncomingEdge
      ).forEach((foundNode) => {
        memo.push(foundNode);

        if (prevIncomingEdge.findIndex((n) => n.id === foundNode.id) === -1) {
          prevIncomingEdge.push(inComingEdge);
        }
      });
    }
    return memo;
  }, []);
  return result;
};

const getAllOutgoers = (nodeId, handleId, nodes, edges, prevOutgoers = []) => {
  const outGoingEdges = getNextOutgoingEdges(nodeId, handleId, nodes, edges);
  console.log("====outGoingEdges", outGoingEdges);
  return outGoingEdges.reduce((memo, outGoingEdge) => {
    memo.push(outGoingEdge);
    console.log("====outGoingEdge", outGoingEdge);

    if (prevOutgoers.findIndex((n) => n.id === outGoingEdge.id) === -1) {
      prevOutgoers.push(outGoingEdge);

      getAllOutgoers(
        outGoingEdge.target,
        outGoingEdge.targetHandle,
        nodes,
        edges,
        prevOutgoers
      ).forEach((foundNode) => {
        memo.push(foundNode);

        if (prevOutgoers.findIndex((n) => n.id === foundNode.id) === -1) {
          prevOutgoers.push(foundNode);
        }
      });
    }
    return memo;
  }, []);
};

export const getNodeHandles = (edges) => {
  const nodeHandles = edges
    .map((edge) => {
      if (
        edge.source === edge.sourceHandle ||
        edge.target === edge.targetHandle
      ) {
        // ignore edges that doesn have real handles
        return [];
      } else {
        return [
          generateFieldName(edge.source, edge.sourceHandle),
          generateFieldName(edge.target, edge.targetHandle)
          // edge.source + "-" + edge.sourceHandle,
          // edge.target + "-" + edge.targetHandle
        ];
      }
    })
    .flat();
  return [...new Set(nodeHandles)];
};

export const highlightHandlePath = (
  nodeId,
  handleId,
  nodes,
  edges,
  setNodes,
  setEdges
) => {
  resetHandlePathHighlight(nodes, edges, setNodes, setEdges);
  const allIncomingEdges = getAllIncomers(nodeId, handleId, nodes, edges);
  const allOutgoingEdges = getAllOutgoers(nodeId, handleId, nodes, edges);

  // make all other columns inactive
  document.querySelectorAll(".nodeField").forEach((el) => {
    el.classList.add("inactive");
  });

  // highlight edges
  const toHighlightEdges = allIncomingEdges.concat(allOutgoingEdges);
  const toHighlightEdgesIds = toHighlightEdges.map((edge) => edge.id);
  const edgesHighlited = edges?.map((edge) => {
    console.log();
    if (toHighlightEdgesIds.includes(edge.id)) {
      edge.animated = true;
      edge.style = {
        ...edge.style,
        stroke: "blue"
      };
    }
    return edge;
  });
  setEdges(edgesHighlited);

  // hightlight current handle when no edges are present
  const toHighlightHandleIds =
    toHighlightEdges.length === 0
      ? [generateFieldName(nodeId, handleId)]
      : getNodeHandles(toHighlightEdges);

  toHighlightHandleIds.map((handleId) => {
    const el = document.getElementById(handleId);
    el.classList.add("highlight");
    el.classList.remove("inactive");
  });
};

export const resetHandlePathHighlight = (nodes, edges, setNodes, setEdges) => {
  console.log("resetHandlePathHighlight");
  // remove highlighting of all handles
  document.querySelectorAll(".nodeField").forEach((el) => {
    el.classList.remove("highlight");
    el.classList.remove("inactive");
  });

  // remove edge path hightlights of all handle paths
  const edgesHighlighted = edges?.map((edge) => {
    edge.animated = false;
    edge.style = {
      ...edge.style,
      stroke: "#ccc"
    };
    return edge;
  });
  setEdges(edgesHighlighted);
};
