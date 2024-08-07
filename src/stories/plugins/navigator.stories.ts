import type { Meta, StoryObj } from '@storybook/html';
import {  helloWorldDataSet } from "../datasets/hello-world";
import { createCanvas } from '../utils/canvas';
import { notImplementedPage } from '../utils/notImplementedPage';
 
const meta = {
  title: 'Plugins/Navigator',
  render: () => createCanvas(helloWorldDataSet.nodes, helloWorldDataSet.links),
  parameters: {
    layout: 'fullscreen',
  },

} satisfies Meta;

export default meta;



 
export const MiniMap: StoryObj = {
  name:  "MiniMap",
  render: () => notImplementedPage("MiniMap") ,
};

export const ZoomController: StoryObj = {
  name:  "ZoomController",
  render: () => notImplementedPage("ZoomController") ,
};

export const PanninController: StoryObj = {
  name:  "PanninController",
  render: () => notImplementedPage("PanninController") ,
};
 

