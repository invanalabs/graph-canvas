import type { Meta, StoryObj } from '@storybook/html';
import { createCanvas } from '../../utils/canvas';
import { notImplementedPage } from '../../utils/notImplementedPage';
import { nodeStatesData, nodeStatesDataICanvasOptions } from './data/nodeStatesData';


const meta = {
  title: 'Features/Nodes',
  render: () => createCanvas(nodeStatesData.nodes, nodeStatesData.links, nodeStatesDataICanvasOptions) ,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ['autodocs'],
  //   // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // argTypes: {
  //   // backgroundColor: { control: 'color' },
  // },
} satisfies Meta;

export default meta;

export const States: StoryObj = {};

export const WithImageAndIcon: StoryObj = {
  name: "With Images and Icons",
  render: () => notImplementedPage("WithImageAndIcon") ,
};


export const Styling: StoryObj = {
  name : "Styling options",
  render: () => notImplementedPage('Styling options') ,
};


export const Interactions: StoryObj = {
  name : "Interactions - hover in/out",
  render: () => notImplementedPage('Interactions(disable hover in/out)') ,
};

export const Draggable: StoryObj = {
  name : "Draggable or Locked",
  render: () => notImplementedPage('Draggable or Locked') ,
};



