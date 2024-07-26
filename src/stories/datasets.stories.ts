import type { Meta, StoryObj } from '@storybook/html';
import { createCanvas } from './canvas';
import { exampleLinks, exampleNodes } from "./datasets/hello-world";
import largeData from './datasets/large-data'; //https://observablehq.com/@alexigd/as-connections-with-pixi-js/2
import { customICanvasOptions } from './styling/nodes/circle/circle';
import {sample1DataSet} from "./datasets/sample1"


const meta = {
  title: 'Examples',
  render: () => createCanvas(exampleNodes, exampleLinks, customICanvasOptions) ,
  parameters: {
    layout: 'fullscreen',
  },

} satisfies Meta;

export default meta;

export const Basic: StoryObj = {};

export const Sample: StoryObj = {
  render: () => createCanvas(sample1DataSet.nodes, sample1DataSet.links, ) ,
};

export const LargeData: StoryObj = {
  render: () => createCanvas(largeData.nodes, largeData.links, {}, 'd3-force') ,
};


