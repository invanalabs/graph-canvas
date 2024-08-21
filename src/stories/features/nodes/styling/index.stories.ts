import type { Meta, StoryObj } from '@storybook/html';
import renderTemplate from '../../../utils/render';

import nodeImagesExamplePlay from "./codes/with-images-icons"
import nodeImagesExampleCode from "./codes/with-images-icons?raw"

import styleIndividualNodesExamplePlay from "./codes/style-individual-nodes"
import styleIndividualNodesExampleCode from "./codes/style-individual-nodes?raw"

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


export const colorByGroup: StoryObj = {
  name : "style by group",
  render: () => renderTemplate() ,
  play: colorByGroupExamplePlay,
  parameters: {
    storySource : {
      source: colotByGroupExampleCode
    }
  }
};




export const styleIndividualNodes: StoryObj = {
  name : "style individual nodes",
  render: () => renderTemplate() ,
  play: styleIndividualNodesExamplePlay,
  parameters: {
    storySource : {
      source: styleIndividualNodesExampleCode
    }
  }
};
