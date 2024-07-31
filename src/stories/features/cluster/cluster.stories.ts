import type { Meta, StoryObj } from '@storybook/html';
import { createCanvas } from '../../utils/canvas';
import { notImplementedPage } from '../../utils/notImplementedPage';
import { nodeStatesData, nodeStatesDataICanvasOptions } from '../nodes/data/nodeStatesData';


const meta = {
  title: 'Features/Cluster',
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


export const ClusterStyling: StoryObj = {
  name : "styling",
  render: () => notImplementedPage('ClusterStyling') ,
};


export const GroupNodeIntoCluster: StoryObj = {
  name: "groups nodes into Cluster",
  render: () => notImplementedPage("GroupNodeIntoCluster") ,
};

export const CollapseCluster: StoryObj = {
  name: "collapse or expand Cluster",
  render: () => notImplementedPage("CollapseCluster") ,
};



