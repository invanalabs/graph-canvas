import type { Meta, StoryObj } from '@storybook/react';
import FlowCanvas from '../../app/app';


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Shapes/CommentNode',
    component: FlowCanvas,
    parameters: {
      layout: 'fullscreen',
    }
  } satisfies Meta<typeof FlowCanvas>;
  
export default meta;
type Story = StoryObj<typeof meta>;


const exampleData = [{
  id: "2.1",
  type: "CommentNode",
  data: {
    label: "CommentNode 1",
    // icon: <StickNotes />,
    commentText: "Hello World ! this is yet another attempt to create beautiful visualisations"
  },
  position: { x: -300, y: -300 },
  style:{
    height: "200px"
  }
},
{
  id: "2.2",
  type: "CommentNode",
  data: {
    label: "CommentNode 2",
    // icon: <StickNotes />,
    commentText: "<strong>Hello World !</strong> this is yet another attempt to create beautiful visualisations.  This is also just a node 🥳"
  },
  position: { x: 0, y: -100 }
}];

export const CommentNode: Story = {
    args: {
        initialNodes:  exampleData,
        // initialEdges: initialEdges,
    },
};

