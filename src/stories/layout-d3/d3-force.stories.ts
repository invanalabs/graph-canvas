import type { Meta, StoryObj } from '@storybook/html';
import { createCanvas, customCanvasOptions } from '../canvas';
import data from "../datasets/miserables.json";
import D3ForceLayout from './d3-force-layout';





const meta = {
  title: 'Layout/d3-force',
  render: () => createCanvas(data.nodes, data.links, customCanvasOptions, D3ForceLayout) ,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
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

