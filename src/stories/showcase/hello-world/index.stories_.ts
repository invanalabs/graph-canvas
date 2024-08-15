import type { Meta, StoryObj } from '@storybook/html';
import basicPlay from "./code";
import basicSource from "./code?raw";
import renderTemplate from '../../utils/render';


const meta: Meta = {
  title: 'Showcase/1',
};
export default meta;

type Story = StoryObj;

export const story: Story = {
  name: "Hello World",
  render: () => renderTemplate(),
  play: basicPlay,
  parameters: {
    storySource: {
      source: basicSource,
    },
  },
};

