import { FlowCanvasProps } from "../core/types";
import BaseFlowCanvas from "./BaseFlowCanvas";
import { defaultCanvasSettings, defaultCanvasStyle } from "../settings";
import { CanvasNodeTemplates } from "../nodeTemplates";
import { CanvasEdgeTemplates } from "../edgeTemplates";
import CanvasInteractions from "../interactions/interactions";
import DagreLayoutEngine from "../layouts/dagre";
import { CanvasEdge , CanvasNode } from "../core/types";
import { ReactFlowInstance } from "reactflow";


const layoutEngine: DagreLayoutEngine = new DagreLayoutEngine()
const dagreOnLayoutChange = (nodes: CanvasNode[], edges: CanvasEdge[], flowInstance: ReactFlowInstance, direction: string) => {
  layoutEngine.getLayoutedElements(nodes, edges, flowInstance, direction)
}
const FlowCanvas = ({
  children,
  initialNodes,
  initialEdges = [],
  onLayoutChange = dagreOnLayoutChange,
  style = defaultCanvasStyle,
  canvasSettings = defaultCanvasSettings,
  canvasNodeTemplates = CanvasNodeTemplates,
  canvasEdgeTemplates = CanvasEdgeTemplates,
}: FlowCanvasProps) => {



  return <BaseFlowCanvas children={children} initialNodes={initialNodes} initialEdges={initialEdges}
     onLayoutChange={onLayoutChange} style={style} canvasSettings={canvasSettings} 
     canvasEdgeTemplates={canvasEdgeTemplates}
     canvasNodeTemplates={canvasNodeTemplates} />
}

export default FlowCanvas
