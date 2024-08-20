import type { Meta, StoryObj } from '@storybook/html';
import { linkTypesData } from './code';
import { createCanvas } from '../../../utils/canvas';
import { notImplementedPage } from '../../../utils/notImplementedPage';


const meta = {
  title: 'Features/Links/Styling',
  render: () => createCanvas(linkTypesData.nodes, linkTypesData.links) ,
  parameters: {
    layout: 'fullscreen',
  }
 
} satisfies Meta;

export default meta;
 
export const Types: StoryObj = {
  name : "Types",
  render: () => notImplementedPage('Types') ,
};


export const ParallelLinks: StoryObj = {
  name : "Parallel links",
  render: () => notImplementedPage('ParallelLinks') ,
};

export const labels: StoryObj = {
  name : "Styling options",
  render: () => notImplementedPage('Styling') ,
};