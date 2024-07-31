import type { Meta, StoryObj } from '@storybook/html';
import { createCanvas } from '../../../utils/canvas';
import { exampleNodes, exampleLinks, customICanvasOptions } from './circle';
import { notImplementedPage } from '../../../utils/notImplementedPage';


const meta = {
  title: 'Styling Options/Nodes',
  render: () => createCanvas(exampleNodes, exampleLinks, customICanvasOptions) ,
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

