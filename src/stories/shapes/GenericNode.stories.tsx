import type { Meta, StoryObj } from '@storybook/react';
import FlowCanvas from '../../app/app';
import {BsFillBuildingsFill} from "react-icons/bs";


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Shapes/GenericNode',
    component: FlowCanvas,
    parameters: {
      layout: 'fullscreen',
    },
  } satisfies Meta<typeof FlowCanvas>;
  
export default meta;
type Story = StoryObj<typeof meta>;




 const exampleData = [{
    id: "2.1",
    type: "GenericNode",
    data: {
      label: "Reactjs icon",
      icon: <BsFillBuildingsFill/>,
      properties: {
        "identifier": "string",
        "is_active": false
      }
    },
    position: { x: -200, y: -100 }
  },
  {
    id: "2.3",
    type: "GenericNode",
    data: {
      label: "No Icon Node",
      properties: {
        "identifier": "string",
        "is_active": false
      }
    },
    position: {x: 200, y: -100}
  },
  {
    id: "2.2",
    type: "GenericNode",
    data: {
      label: "url based Icon",
      // icon: "https://avatars.githubusercontent.com/u/4606947?v=4",
      icon: "https://i.stack.imgur.com/6Zy0g.jpg?s=256&g=1",
      properties: {
        "title": "string",
        "identifier": "string",
        "is_active": false,
        "description": "string"
      }
    },
    position: {x: -200, y: 100}
  },
  {
    id: "2.4",
    type: "GenericNode",
    data: {
      label: "url based Icon and a very long label",
      // icon: "https://avatars.githubusercontent.com/u/4606947?v=4",
      icon: "https://i.stack.imgur.com/6Zy0g.jpg?s=256&g=1",
      properties: {
        "title": "string",
        "identifier": "string",
        "is_active": false,
        "description": "string"
      }
    },
    position: {x: 200, y: 100}
  }

];

export const GenericNode: Story = {
    args: {
        initialNodes:  exampleData,
        // initialEdges: initialEdges,
    },
};

