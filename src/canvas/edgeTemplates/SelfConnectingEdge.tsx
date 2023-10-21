import { BezierEdge, EdgeProps } from "reactflow";

export default function SelfConnectingEdge(props: EdgeProps) {
  // https://github.com/wbkd/react-flow/issues/2140
  // TODO - when there are more than one edges, change the radius  
  // we are using the default bezier edge when source and target ids are different
  if (props.source !== props.target) {
    return <BezierEdge {...props} />;
  }

  const { sourceX, sourceY, targetX, targetY, id, markerEnd } = props;
  const radiusX = (sourceX - targetX) * 0.6;
  const radiusY = 20;
  const edgePath = `M ${sourceX} ${sourceY} A ${radiusX} ${radiusY} 0 1 0 ${targetX} ${targetY}`;

  return (
    <path
      id={id}
      className="react-flow__edge-path react-flow__self-edge"
      d={edgePath}
      markerEnd={markerEnd}
    />
  );
}
