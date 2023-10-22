import { FlowCanvasProps } from "../core/types";
import BaseFlowCanvas from "./BaseFlowCanvas";
import { defaultCanvasSettings, defaultCanvasStyle } from "../settings";
import { CanvasNodeTemplates } from "../nodeTemplates";
import { CanvasEdgeTemplates } from "../edgeTemplates";
import CanvasInteractions, { FlowInstanceType } from "../interactions/interactions";
import DagreLayoutEngine from "../layouts/dagre";
import { CanvasEdge , CanvasNode } from "../core/types";
import { defaultLayoutChange } from "../layouts/noLayout";
import GenericNodeContextMenu from "../components/ContextMenu/GenericNodeContextMenu";
import GenericEdgeContextMenu from "../components/ContextMenu/GenericEdgeContextMenu";


const layoutEngine: DagreLayoutEngine = new DagreLayoutEngine()
const dagreOnLayoutChange = (nodes: CanvasNode[], edges: CanvasEdge[], flowInstance: FlowInstanceType, direction: string) => {
  return layoutEngine.getLayoutedElements(nodes, edges, flowInstance, direction)
}
const GenericFlowCanvas = ({
  children,
  initialNodes,
  initialEdges = [],
  NodeContextMenu, 
  EdgeContextMenu,
  onLayoutChange,
  style = defaultCanvasStyle,
  canvasSettings = defaultCanvasSettings,
  canvasNodeTemplates = CanvasNodeTemplates,
  canvasEdgeTemplates = CanvasEdgeTemplates,
  canvasInteractions = null
}: FlowCanvasProps) => {



  return <BaseFlowCanvas children={children} initialNodes={initialNodes} initialEdges={initialEdges}
     onLayoutChange={defaultLayoutChange} style={style} canvasSettings={canvasSettings} 
     canvasEdgeTemplates={canvasEdgeTemplates} canvasNodeTemplates={canvasNodeTemplates}
     NodeContextMenu={NodeContextMenu} EdgeContextMenu={EdgeContextMenu}
     canvasInteractions={canvasInteractions} />
}

GenericFlowCanvas.defaultProps = {
  onLayoutChange: dagreOnLayoutChange,
  canvasInteractions:new CanvasInteractions(),

};

export default GenericFlowCanvas
