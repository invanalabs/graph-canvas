import type { Meta, StoryObj } from '@storybook/html';
import { createCanvas } from '../utils/canvas';
import { ICanvasOptions } from '../../canvas';
import { treeData } from '../example-datasets/treeData';

 
const customICanvasOptions: ICanvasOptions = {
  extraSettings: {
    nodeSizeBasedOn: "degree"
  }
} 


const meta = {
  title: 'Layout Computers/dagre',
  render: () => createCanvas(treeData.nodes, treeData.links, 
    customICanvasOptions, 'dagre') ,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
 
} satisfies Meta;

export default meta;

export const TreeData: StoryObj = {};

