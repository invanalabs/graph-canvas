import type { Meta, StoryObj } from '@storybook/html';
import { createCanvas } from './canvas';
import { exampleLinks, exampleNodes } from "./datasets/hello-graph-canvas";



const meta = {
  title: 'Network',
  render: () => createCanvas(exampleNodes, exampleLinks) ,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} satisfies Meta;

export default meta;

export const HelloWorld: StoryObj = {};

// export const HelloWorld: StoryObj = {};
