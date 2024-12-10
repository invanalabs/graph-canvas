import type { Meta, StoryObj } from '@storybook/react';
import { getNodesAndEdges, } from "./data";
import FlowCanvas from '../../../app/app';


const largeDataSet = getNodesAndEdges();

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Use Cases/Large Dataset',
  component: FlowCanvas,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FlowCanvas>;

export default meta;
type Story = StoryObj<typeof meta>;


export const LargeDataset: Story = {
  args: {
    initialNodes: largeDataSet.initialNodes,
    initialEdges: largeDataSet.initialEdges,
  },
};