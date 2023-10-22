import type { Meta, StoryObj } from '@storybook/react';
import GenericFlowCanvas from '../../flow-canvas/canvasTypes/GenericCanvas';
import {nodes, edges} from "../../example-datasets/BaseLayout/BaseLayoutData"
import {getNodesAndEdges,   } from "../../example-datasets/raw/large-data";


const largeDataSet =  getNodesAndEdges();

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Canvas/GenericFlowCanvas',
    component: GenericFlowCanvas,
    parameters: {
      // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
      layout: 'fullscreen',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
    //   backgroundColor: { control: 'color' },
    },
  } satisfies Meta<typeof GenericFlowCanvas>;
  
  export default meta;
type Story = StoryObj<typeof meta>;

export const SimpleBaseFlowCanvas: Story = {
  args: {
      initialNodes:  nodes,
      initialEdges: edges,
  },
}; 

export const LargeDataCanvas: Story = {
  args: {
      initialNodes:  largeDataSet.initialNodes,
      initialEdges: largeDataSet.initialEdges,
  },
};