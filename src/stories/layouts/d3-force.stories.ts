import type { Meta, StoryObj } from '@storybook/html';
import { createCanvas } from '../utils/canvas';
import { ICanvasOptions } from '../../canvas';
import { miserablesData } from '../example-datasets/miserables-no-positions';


const canvasOptions: ICanvasOptions = {
  extraSettings: {
    nodeSizeBasedOn : 'degree'
  }
} 
 
const meta = {
  title: 'Layout Computers/d3-force',
  render: () => createCanvas(miserablesData.nodes, miserablesData.links, canvasOptions, 'd3-force') ,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;


export const LesMiserables: StoryObj = {
  name : "LesMiserables",
  render: () => createCanvas(miserablesData.nodes, miserablesData.links, canvasOptions, 'd3-force') ,
};


