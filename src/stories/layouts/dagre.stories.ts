import type { Meta, StoryObj } from '@storybook/html';
import { createCanvas } from '../canvas';
import { ICanvasOptions } from '../../canvas';
import { treeData } from '../datasets/treeData';

 
const customICanvasOptions: ICanvasOptions = {
  extraSettings: {
    nodeSizeBasedOn: "degree"
  }
} 


const meta = {
  title: 'Layout/dagre',
  render: () => createCanvas(treeData.nodes, treeData.links, 
    customICanvasOptions, 'dagre') ,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
 
} satisfies Meta;

export default meta;

export const TreeData: StoryObj = {};

