import type { Meta, StoryObj } from '@storybook/html';
import {  helloWorldDataSet } from "../example-datasets/hello-world";
import largeData from '../example-datasets/large-data/largeData.json'; //https://observablehq.com/@alexigd/as-connections-with-pixi-js/2
import { sample1DataSet } from "../example-datasets/sample1"
import miserablesData from '../example-datasets/les-miserables/miserables.json';
import { createCanvas } from '../utils/canvas';
import { notImplementedPage } from '../utils/notImplementedPage';
 
const meta = {
  title: 'Plugins/ArtBoard',
  render: () => createCanvas(helloWorldDataSet.nodes, helloWorldDataSet.links),
  parameters: {
    layout: 'fullscreen',
  },

} satisfies Meta;

export default meta;




export const ArtBoardToolBar: StoryObj = {
  name: "ArtBoardToolBar",
  render: () => notImplementedPage("ArtBoardToolBar")

};
 
export const ArtBoardStatusBar: StoryObj = {
  name: "ArtBoardStatusBar",
  render: () => notImplementedPage("ArtBoardStatusBar")
};

 
 

