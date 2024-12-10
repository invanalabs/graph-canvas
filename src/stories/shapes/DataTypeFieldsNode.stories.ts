import type { Meta, StoryObj } from '@storybook/react';
import FlowCanvas from '../../app/app';


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Shapes/DataTypeFieldsNode',
    component: FlowCanvas,
    parameters: {
      layout: 'fullscreen',
    }
  } satisfies Meta<typeof FlowCanvas>;
  
export default meta;
type Story = StoryObj<typeof meta>;


const exampleData = [{
  id: "2.1",
  type: "DataTypeFieldsNode",
  data: {
    label: "NSE Data (2.1)",
    fields: [
      { label: "identifier", id: "identifier", data_type: "string" },
      { label: "is_active", id: "is_active", data_type: "string" }
    ]
  },
  position: { x: -300, y: 0 }
},
{
  id: "2.2",
  type: "DataTypeFieldsNode",
  data: {
    label: "Source1 - Candle Data (2.2)",
    fields: [
      { label: "candle", id: "candle", data_type: "string" },
      { label: "title", id: "title", data_type: "string" },
      { label: "description", id: "description", data_type: "string" },
      { label: "is_active", id: "is_active", data_type: "bool" }
    ]
  },
  position: { x: 100, y: 0 }
}];

export const DataTypeFieldsNode: Story = {
    args: {
        initialNodes:  exampleData,
        // initialEdges: initialEdges,
    },
};

