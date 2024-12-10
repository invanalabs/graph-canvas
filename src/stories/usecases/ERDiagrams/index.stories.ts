import type { Meta, StoryObj } from '@storybook/react';
import { initialNodes , initialEdges  } from "./data";
import FlowCanvas from '../../../app/app';
import DagreLayoutEngine from '../../../layouts/dagre';


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Use Cases/ER Driagram',
  component: FlowCanvas,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FlowCanvas>;

export default meta;
type Story = StoryObj<typeof meta>;


export const ERDriagram: Story = {
  args: {
    initialNodes: initialNodes,
    initialEdges: initialEdges,
    layoutEngine: new DagreLayoutEngine()
  },
};