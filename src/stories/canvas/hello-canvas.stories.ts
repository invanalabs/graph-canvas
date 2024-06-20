import type { Meta, StoryObj } from '@storybook/html';
import { createCanvas } from '../canvas';
import { ICanvasLink, ICanvasNode } from '../../store';
// import { createApp } from './pixi-test';



const exampleNodes: ICanvasNode[] = [
  { id: '1', group: 'Person', label: 'Person-1', x: 100, y: 100 },
  { id: '2', group: 'Person', label: 'Person-2', x: 250, y: 250 },
  { id: '3', group: 'Person', label: 'Person-3', x: 350, y: 350 },
  { id: '4', group: 'Person', label: 'Person-4', x: 450, y: 450 },

];

const exampleLinks: ICanvasLink[] = [
  { id: '1-2', group: 'authored', label: 'default-1-2', source: '1', target: '2' },
  { id: '1-2.1', group: 'authored', label: 'default-1-2.1', source: '1', target: '2' },
  { id: '2-3', group: 'authored', label: 'default-2-3', source: '2', target: '3' },
  { id: '2-4', group: 'authored', label: 'default-2-4', source: '2', target: '4' },
  { id: '3-4', group: 'authored', label: 'default-3-4', source: '3', target: '4' },
];

const meta = {
  title: 'Canvas/Simple',
  render: () => createCanvas(exampleNodes, exampleLinks) ,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ['autodocs'],
  //   // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // argTypes: {
  //   // backgroundColor: { control: 'color' },
  // },
} satisfies Meta;

export default meta;

export const States: StoryObj = {};

