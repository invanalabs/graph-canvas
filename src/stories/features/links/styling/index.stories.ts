import type { Meta, StoryObj } from '@storybook/html';
import colorByGroupExamplePlay from "./colorByGroup"
import colotByGroupExampleCode from "./colorByGroup?raw"
import renderTemplate from '../../../utils/render';


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

 