import type { Meta, StoryObj } from '@storybook/react';
import FlowCanvas from '../../canvas/canvas';
import { initialNodes as erInitialNodes, initialEdges as erInitialEdges  } from "../../example-datasets/raw/er-mock-data";
import { initialNodes, initialEdges } from '../../example-datasets/raw/simple-hello-world';
import { initialNodes as allNodesInitialNodes, initialEdges as allEdgesInitialEdges  } from "../../example-datasets/raw/all-nodes";


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

export const MixedDataCanvas: Story = {
  args: {
      initialNodes:  allNodesInitialNodes,
      initialEdges: allEdgesInitialEdges,
  },
};
console.log("[=======initialNodes" , initialNodes)
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const SimpleStoryCanvas: Story = {
    args: {
        initialNodes:  initialNodes,
        initialEdges: initialEdges,
    },
};

export const EntityRelationCanvas: Story = {
  args: {
      initialNodes:  erInitialNodes,
      initialEdges: erInitialEdges,
  },
};


