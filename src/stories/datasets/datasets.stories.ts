import type { Meta, StoryObj } from '@storybook/html';
import { createCanvas } from '../canvas';
import { exampleLinks, exampleNodes } from "./hello-graph-canvas";
import exampleData from './large-data'; //https://observablehq.com/@alexigd/as-connections-with-pixi-js/2
import { customICanvasOptions } from '../styling/nodes/circle/circle';
import {sample1DataSet} from "./sample1"


const meta = {
  title: 'Datasets/Examples',
  render: () => createCanvas(exampleNodes, exampleLinks, customICanvasOptions) ,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
    docs: {
      source: {
        type: 'code',
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // argTypes: {
  //   // backgroundColor: { control: 'color' },
  // },
} satisfies Meta;

export default meta;

export const HelloWorld: StoryObj = {};

export const Sample1: StoryObj = {
  render: () => createCanvas(sample1DataSet.nodes, sample1DataSet.links, ) ,
};

export const LargeData: StoryObj = {
  render: () => createCanvas(exampleData.nodes, exampleData.links, {}, 'd3-force') ,
};


