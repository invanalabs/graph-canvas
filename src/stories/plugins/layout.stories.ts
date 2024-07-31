import type { Meta, StoryObj } from '@storybook/html';
import {  helloWorldDataSet } from "../datasets/hello-world";
import largeData from '../datasets/large-data/largeData.json'; //https://observablehq.com/@alexigd/as-connections-with-pixi-js/2
import { customICanvasOptions } from '../styling/nodes/circle/circle';
import { sample1DataSet } from "../datasets/sample1"
import miserablesData from '../datasets/les-miserables/miserables.json';
import { createCanvas } from '../utils/canvas';
import { notImplementedPage } from '../utils/notImplementedPage';
 
const meta = {
  title: 'Plugins/Layout',
  render: () => createCanvas(helloWorldDataSet.nodes, helloWorldDataSet.links, customICanvasOptions),
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
 

