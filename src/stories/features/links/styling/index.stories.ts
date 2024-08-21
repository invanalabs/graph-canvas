import type { Meta, StoryObj } from '@storybook/html';
import renderTemplate from '../../../utils/render';

import colorByGroupExamplePlay from "./colorByGroup"
import colotByGroupExampleCode from "./colorByGroup?raw"

import colorIndividualLinkExamplePlay from "./colorIndividualLinks"
import colorIndividualLinkExampleCode from "./colorIndividualLinks?raw"


const meta = {
  title: 'Features/Links/Styling', 
} satisfies Meta;

export default meta;
 
export const Types: StoryObj = {
  name : "color by group",
  render: () => renderTemplate() ,
  play: colorByGroupExamplePlay,
  parameters: {
    storySource : {
      source: colotByGroupExampleCode
    }
  }
};

 


export const colorIndividualLink: StoryObj = {
  name : "color: individual links",
  render: () => renderTemplate() ,
  play: colorIndividualLinkExamplePlay,
  parameters: {
    storySource : {
      source: colorIndividualLinkExampleCode
    }
  }
};

