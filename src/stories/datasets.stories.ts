import type { Meta, StoryObj } from '@storybook/html';
import { createCanvas } from './canvas';
import {  helloWorldDataSet } from "./datasets/hello-world";
import largeData from './datasets/large-data'; //https://observablehq.com/@alexigd/as-connections-with-pixi-js/2
import { customICanvasOptions } from './styling/nodes/circle/circle';
import { sample1DataSet } from "./datasets/sample1"
import miserablesData from './datasets/les-miserables/miserables.json';
 
const meta = {
  title: 'Examples',
  render: () => createCanvas(helloWorldDataSet.nodes, helloWorldDataSet.links, customICanvasOptions),
  parameters: {
    layout: 'fullscreen',
  },

} satisfies Meta;

export default meta;


export const HelloWorld: StoryObj = {
  render: () => createCanvas(helloWorldDataSet.nodes, helloWorldDataSet.links, {}, "d3-force") ,
};


export const LesMiserables: StoryObj = {
  render: () => createCanvas(miserablesData.nodes, miserablesData.links, {
    extraSettings: { nodeSizeBasedOn: "degree", }
  }),
};

export const SampleOne: StoryObj = {
  render: () => createCanvas(sample1DataSet.nodes, sample1DataSet.links, ) ,
};

// export const LargeData: StoryObj = {
//   render: () => createCanvas(largeData.nodes, largeData.links, {
//     extraSettings: { nodeSizeBasedOn: "default" },
//     styles: { nodes: { TestNode: { size: 5 } } },
//   },
//     "d3-force"
//   ),
// };


