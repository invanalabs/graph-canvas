import type { Meta, StoryObj } from '@storybook/html';
import { linkTypesData } from './data/linkTypes';
import { createCanvas } from '../../utils/canvas';
import { linkStateData } from './data/linkStates';


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

// export const Types: StoryObj = {
//   name : "Types",
//   render: () => createCanvas(linkTypesData.nodes, linkTypesData.links) ,
// };
