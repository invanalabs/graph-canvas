import type { Meta, StoryObj } from '@storybook/react';
import FlowCanvas from '../../app/app';


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Shapes/Other',
    component: FlowCanvas,
    parameters: {
      layout: 'fullscreen',
    },
  } satisfies Meta<typeof FlowCanvas>;
  
export default meta;
type Story = StoryObj<typeof meta>;


const exampleData = [{
  id: "2.1",
  type: "Other",
  data: {
    label: "Other 1",
    commentText: "Hello World ! this is yet another attempt to create beautiful visualisations"
  },
  position: {x: 0, y: 100}
},
{
  id: "2.2",
  type: "Other",
  data: {
    label: "Other 2",
    commentText: "<strong>Hello World !</strong> this is yet another attempt to create beautiful visualisations"
  },
  position: {x: 0, y: -100}
}];

export const Other: Story = {
    args: {
        initialNodes:  exampleData,
        // initialEdges: initialEdges,
    },
};

