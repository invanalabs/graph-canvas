import type { Meta, StoryObj } from '@storybook/html';
import { createCanvas } from '../../canvas';
import { exampleNodes, exampleLinks, customCanvasOptions } from './circle';


const meta = {
  title: 'Shapes/Nodes',
  render: () => createCanvas(exampleNodes, exampleLinks, customCanvasOptions) ,
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

export const Circle: StoryObj = {};

