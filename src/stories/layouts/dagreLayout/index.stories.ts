import type { Meta, StoryObj } from '@storybook/react';
import FlowCanvas from '../../../app/app';
import { CanvasEdge, CanvasNode } from "../../../core/types";
import DagreLayoutEngine from '../../../layouts/dagre';


const meta = {
    title: 'Layouts/Dagre Layout',
    component: FlowCanvas,
    parameters: {
        layout: 'fullscreen',
    }

} satisfies Meta<typeof FlowCanvas>;

export default meta;
type Story = StoryObj;

const initialNodes: CanvasNode[] = [
    { id: '1', type: 'card', data: { label: "Node 1" }, position: { x: -100, y: -100 } },
    { id: '2', type: 'card', data: { label: "Node 2" }, position: { x: 0, y: 0 } },
    { id: '3', type: 'card', data: { label: "Node 3" }, position: { x: 100, y: 100 } }
]
const initialEdges: CanvasEdge[] = [
    { id: 'e1-2', source: '1', target: '2', },
    { id: 'e2-3', source: '2', target: '3', }
];

export const dagreLayout: Story = {
    args: {
        initialNodes: initialNodes,
        initialEdges: initialEdges,
        layoutEngine: new DagreLayoutEngine()
    }
};
