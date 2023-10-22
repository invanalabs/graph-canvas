import type { Meta, StoryObj } from '@storybook/react';
import BaseFlowCanvas from '../../flow-canvas/canvasTypes/BaseFlowCanvas';
import {nodes, edges} from "../../example-datasets/BaseLayout/BaseLayoutData"

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Canvas/BaseFlowCanvas',
    component: BaseFlowCanvas,
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
  } satisfies Meta<typeof BaseFlowCanvas>;
  
  export default meta;
type Story = StoryObj<typeof meta>;

export const SimpleBaseFlowCanvas: Story = {
  args: {
      initialNodes:  nodes,
      initialEdges: edges,
  },
}; 