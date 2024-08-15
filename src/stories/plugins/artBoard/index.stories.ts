import type { Meta, StoryObj } from '@storybook/html';
// import { notImplementedPage } from '../../utils/notImplementedPage';
import renderTemplate from '../../utils/render';

import artBoardToolBarExamplePlay from "./artBoardToolBar/code"
import artBoardToolBarExampleSource from "./artBoardToolBar/code?raw"

import artBoardStatusBarExamplePlay from "./artBoardStatusBar/code"
import artBoardStatusBarExampleSource from "./artBoardStatusBar/code?raw"

const meta = {
  title: 'Plugins/ArtBoard',
  parameters: {
    layout: 'fullscreen',
  },

} satisfies Meta;

export default meta;


export const ArtBoardToolBar: StoryObj = {
  name: "ArtBoardToolBar",
  play: artBoardToolBarExamplePlay,
  render: () => renderTemplate(),
  parameters: {
    storySource: {
      source: artBoardToolBarExampleSource
    }
  }
};
 
export const ArtBoardStatusBar: StoryObj = {
  name: "ArtBoardStatusBar",
  play: artBoardStatusBarExamplePlay,
  render: () => renderTemplate(),
  parameters: {
    storySource: {
      source: artBoardStatusBarExampleSource
    }
  }
};

 
 

