import type { Meta, StoryObj } from '@storybook/html';
import { notImplementedPage } from '../../../utils/notImplementedPage';
import renderTemplate from '../../../utils/render';

import nodeImagesExamplePlay from "./codes/with-images-icons"
import nodeImagesExampleCode from "./codes/with-images-icons?raw"

import nodeLabelExamplePlay from "./codes/label-styling"
import nodeLabelExampleCode from "./codes/label-styling?raw"

import colorByGroupExamplePlay from "./codes/colorByGroup"
import colotByGroupExampleCode from "./codes/colorByGroup?raw"

const meta = {
  title: 'Features/Nodes/Styling',
} satisfies Meta;

export default meta;


export const WithImageAndIcon: StoryObj = {
  name: "shape : images and icons",
  render: () => renderTemplate() ,
  play: nodeImagesExamplePlay,
  parameters: {
    storySource : {
      source: nodeImagesExampleCode
    }
  }
};


export const Styling: StoryObj = {
  name : "label",
  render: () => renderTemplate() ,
  play: nodeLabelExamplePlay,
  parameters: {
    storySource : {
      source: nodeLabelExampleCode
    }
  }
};



export const colorByGroup: StoryObj = {
  name : "color by group",
  render: () => renderTemplate() ,
  play: colorByGroupExamplePlay,
  parameters: {
    storySource : {
      source: colotByGroupExampleCode
    }
  }
};




