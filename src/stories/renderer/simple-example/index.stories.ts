import type { Meta, StoryObj } from '@storybook/html';
import { wrapStory } from "../../utils";
import play from "./index";
import template from "./index.html?raw";
import source from "./index?raw";


const meta = {
  title: 'Renderer',
  parameters: {
    layout: 'fullscreen',
  },

} satisfies Meta;

export default meta;

type Story = StoryObj;

export const story: Story = {
  name: "Simple Example",
  render: () => template,
  play: wrapStory(play),
  args: {},
  parameters: {
    storySource: {
      source,
    },
  },
};
