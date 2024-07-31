import type { Meta, StoryObj } from '@storybook/html';
import { linkTypesData } from './data/linkTypes';
import { createCanvas } from '../../utils/canvas';
import { linkStateData } from './data/linkStates';
import { notImplementedPage } from '../../utils/notImplementedPage';


const meta = {
  title: 'Features/Links',
  render: () => createCanvas(linkTypesData.nodes, linkTypesData.links) ,
  parameters: {
    layout: 'fullscreen',
  }
 
} satisfies Meta;

export default meta;

export const States: StoryObj = {
  name : "States",
  render: () => createCanvas(linkStateData.nodes, linkStateData.links) ,
};

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