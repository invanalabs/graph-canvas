import type { Meta, StoryObj } from '@storybook/react';
import FlowCanvas from '../../app/app';
import { Edge, Node } from 'reactflow';


const initialNodes: Node[] = [
  { id: '1', position: { x: 100, y: 100 }, data: { label: 'Node 1' }, type: 'input' },
  { id: '2', position: { x: 300, y: 200 }, data: { label: 'Node 2' } },
];

const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }];


const meta = {
  title: 'Canvas/Basic Example',
  component: FlowCanvas,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FlowCanvas>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicExample: Story = {
  args: {
    initialNodes:  initialNodes,
    initialEdges: initialEdges,
  }
};

