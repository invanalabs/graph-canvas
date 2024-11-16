import type { Meta, StoryObj } from '@storybook/html';
import { wrapStory } from "../utils";
import template from "./../html-templates/full-screen.html?raw";

import circleShapeExamplePlay from "./circles/index";
import circleShapeExampleSource from "./circles/index?raw";


const meta = {
  title: 'Shapes',
  parameters: {
    layout: 'fullscreen',
  }

} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Circle: Story = {
  name: "Circle",
  render: () => template,
  play: wrapStory(circleShapeExamplePlay),
  args: {},
  parameters: {
    storySource: {
      circleShapeExampleSource,
    },
  },
};
