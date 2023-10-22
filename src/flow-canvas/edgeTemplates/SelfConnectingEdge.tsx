import { BaseEdge, EdgeProps, getBezierPath, EdgeText } from "reactflow";

export default function SelfConnectingEdge(props: EdgeProps) {
  // https://github.com/wbkd/react-flow/issues/2140
  // TODO - when there are more than one edges, change the radius  
  // TODO - show the label on the edge
 // https://reactflow.dev/docs/examples/edges/edge-label-renderer/ (refer later for label renderin)

  const { sourceX, sourceY, targetX, targetY, id, markerEnd } = props;
  const radiusX = (sourceX - targetX) * 0.6;
  const radiusY = 20;
  const edgePath = `M ${sourceX} ${sourceY} A ${radiusX} ${radiusY} 0 1 0 ${targetX} ${targetY}`;


  // const [edgePath, labelX, labelY] = getBezierPath({
  //   sourceX: props.sourceX,
  //   sourceY: props.sourceY,
  //   sourcePosition: props.sourcePosition,
  //   targetX: props.targetX,
  //   targetY: props.targetY,
  //   targetPosition: props.targetPosition,
  //   curvature: 0.5
  // });
  return <>
    <BaseEdge path={edgePath} {...props} />
    <EdgeText
        x={targetX-15}
        y={targetY-15}
        label={props.label}
        labelStyle={props.labelStyle}
        labelShowBg
        labelBgStyle={props.labelBgStyle}
        labelBgPadding={props.labelBgPadding}
        labelBgBorderRadius={props.labelBgBorderRadius}
        // onClick={() => console.log(props.data)}
      />
  </>

}
