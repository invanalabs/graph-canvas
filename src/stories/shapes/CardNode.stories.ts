import type { Meta, StoryObj } from '@storybook/react';
import FlowCanvas from '../../app/app';
import { BsFillBuildingsFill } from "react-icons/bs";


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Shapes/CardNode',
  component: FlowCanvas,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FlowCanvas>;

export default meta;
type Story = StoryObj<typeof meta>;


const exampleData = [{
  id: "2.1",
  type: "CardNode",
  data: {
    label: "Card with Html String based Form",
    icon: BsFillBuildingsFill,
    body: `
        <label>name</label>
        <input type='text'>      
        <button>submit</button>
      `
  },
  style: {
    width: "400px"
  },
  position: { x: -300, y: -300 }
},
{
  id: "2.3",
  type: "CardNode",
  data: {
    label: "No Icon Node",
    body: `
      <img src='https://picsum.photos/200/300' style='    margin: 0 auto;
      width: 100%; height: auto' />
      `
  },
  position: {  x: 0,  y: -100 }
},
{
  id: "2.2",
  type: "CardNode",
  data: {
    label: "url based Icon",
    icon: "https://avatars.githubusercontent.com/u/4606947?v=4",
    // icon: "https://i.stack.imgur.com/6Zy0g.jpg?s=256&g=1",
    properties: {
      "title": "string",
      "identifier": "string",
      "is_active": false,
      "description": "string"
    }
  },
  position: {  x: 200,  y: -200 }
}];


export const CardNode: Story = {
  args: {
    initialNodes: exampleData,
    // initialEdges: initialEdges,
  },
};
