import type { Meta, StoryObj } from '@storybook/html';
import { createCanvas } from '../canvas';
import { miserablesData } from '../datasets/miserables-no-positions';
import { ICanvasOptions } from '../../canvas';


const canvasOptions: ICanvasOptions = {
  extraSettings: {
    nodeSizeBasedOn : 'degree'
  }
} 
 
const meta = {
  title: 'Layout/d3-force',
  render: () => createCanvas(miserablesData.nodes, miserablesData.links, canvasOptions, 'd3-force') ,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

export const LesMiserables: StoryObj = {};

