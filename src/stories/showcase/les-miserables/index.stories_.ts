import type { Meta, StoryObj } from '@storybook/html';
import basicPlay from "./code";
import basicSource from "./code?raw";
import renderTemplate from '../../utils/render';


const meta: Meta = {
  title: 'Showcase',

};
export default meta;

type Story = StoryObj;

export const story: Story = {
  name: "Les Miserables",
  render: () => renderTemplate(),
  play: basicPlay,
  parameters: {
    storySource: {
      source: basicSource,
    },
  },
};

 
 