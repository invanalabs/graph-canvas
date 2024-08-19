import type { Meta, StoryObj } from '@storybook/html';
import {  helloWorldDataSet } from "../../example-datasets/hello-world";
import { createCanvas } from '../../utils/canvas';
import { notImplementedPage } from '../../utils/notImplementedPage';
import renderTemplate from '../../utils/render';

import d3ForceOptionsToolBarExamplePlay from "./D3ForceOptionsToolBar/code"
import d3ForceOptionsToolBarExampleSource from "./D3ForceOptionsToolBar/code?raw"

import dagreOptionsToolBarExamplePlay from "./DagreLayoutToolBar/code"
import dagreOptionsToolBarExampleSource from "./DagreLayoutToolBar/code?raw"

 
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
  render: () => renderTemplate(),
  play: d3ForceOptionsToolBarExamplePlay,
  parameters: {
    storySource: {
      source: d3ForceOptionsToolBarExampleSource
    }
  }
};

export const DagreLayoutToolBar: StoryObj = {
  name:  "DagreLayoutToolBar",
  render: () => renderTemplate(),
  play: dagreOptionsToolBarExamplePlay,
  parameters: {
    storySource: {
      source: dagreOptionsToolBarExampleSource
    }
  }
 
};

// export const LayoutSwitcherToolBar: StoryObj = {
//   name:  "LayoutSwitcherToolBar",
//   render: () => notImplementedPage("LayoutSwitcherToolBar") ,
// };
 

