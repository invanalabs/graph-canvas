import type { Meta, StoryObj } from '@storybook/html';
import {  helloWorldDataSet } from "../example-datasets/hello-world";
import { createCanvas } from '../utils/canvas';
import { notImplementedPage } from '../utils/notImplementedPage';
 
const meta = {
  title: 'Plugins/Layout',
  render: () => createCanvas(helloWorldDataSet.nodes, helloWorldDataSet.links),
  parameters: {
    layout: 'fullscreen',
  },

} satisfies Meta;

export default meta;



 
export const D3ForceLayoutToolBar: StoryObj = {
  name:  "D3ForceLayoutToolBar",
  render: () => notImplementedPage("D3ForceLayoutToolBar") ,
};

export const DagreLayoutToolBar: StoryObj = {
  name:  "DagreLayoutToolBar",
  render: () => notImplementedPage("DagreLayoutToolBar") ,
};

export const LayoutSwitcherToolBar: StoryObj = {
  name:  "LayoutSwitcherToolBar",
  render: () => notImplementedPage("LayoutSwitcherToolBar") ,
};
 

