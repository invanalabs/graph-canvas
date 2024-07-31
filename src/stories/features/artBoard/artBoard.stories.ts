import type { Meta, StoryObj } from '@storybook/html';
import { createCanvas } from '../../utils/canvas';
import { notImplementedPage } from '../../utils/notImplementedPage';
import { nodeStatesData, nodeStatesDataICanvasOptions } from '../nodes/data/nodeStatesData';


const meta = {
  title: 'Features/ArtBoard',
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


export const nodeSizeBasedOn: StoryObj = {
  name: "node size based on degree",
  render: () => notImplementedPage("nodeSizeBasedOn") ,
};


export const nodeColorBasedOn: StoryObj = {
  name : "node color based on group",
  render: () => notImplementedPage('nodeColorBasedOn') ,
};


export const linkColorBasedOn: StoryObj = {
  name : "link color based on group",
  render: () => notImplementedPage('linkColorBasedOn') ,
};

export const labelVisibilityZoomThreshold: StoryObj = {
  name : "label visibility on zoom",
  render: () => notImplementedPage('labelVisibilityZoomThreshold') ,
};


export const ArtBoardBackground: StoryObj = {
  name : "change background",
  render: () => notImplementedPage('ArtBoardBackground') ,
};



