import type { Meta, StoryObj } from '@storybook/react';
import FlowCanvas from '../../canvas/canvas';
import { initialNodes, initialEdges } from "../../example-datasets/er-mock-data";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Canvas/FlowCanvas',
    component: FlowCanvas,
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
  } satisfies Meta<typeof FlowCanvas>;
  
  export default meta;
type Story = StoryObj<typeof meta>;


console.log("[=======initialNodes" , initialNodes)
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const SimpleCanvas: Story = {
    args: {
        initialNodes:  initialNodes,
        initialEdges: initialEdges,
    },
};