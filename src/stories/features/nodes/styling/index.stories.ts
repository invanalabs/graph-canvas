import type { Meta, StoryObj } from '@storybook/html';
import { notImplementedPage } from '../../../utils/notImplementedPage';
import renderTemplate from '../../../utils/render';

import nodeImagesExamplePlay from "./codes/with-images-icons"
import nodeImagesExampleCode from "./codes/with-images-icons?raw"

import colorIndividualLinkExamplePlay from "./codes/colorIndividualLink"
import colorIndividualLinkExampleCode from "./codes/colorIndividualLink?raw"

import colorByGroupExamplePlay from "./codes/colorByGroup"
import colotByGroupExampleCode from "./codes/colorByGroup?raw"

import labelFormattingExamplePlay from "./codes/label-formatting"
import labelFormattingExampleCode from "./codes/label-formatting?raw"


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


export const colorIndividualLink: StoryObj = {
  name : "color: individual link",
  render: () => renderTemplate() ,
  play: colorIndividualLinkExamplePlay,
  parameters: {
    storySource : {
      source: colorIndividualLinkExampleCode
    }
  }
};



export const colorByGroup: StoryObj = {
  name : "color: by group",
  render: () => renderTemplate() ,
  play: colorByGroupExamplePlay,
  parameters: {
    storySource : {
      source: colotByGroupExampleCode
    }
  }
};


export const labelFormattingByGroup: StoryObj = {
  name : "label: formatting",
  render: () => renderTemplate() ,
  play: labelFormattingExamplePlay,
  parameters: {
    storySource : {
      source: labelFormattingExampleCode
    }
  }
};




