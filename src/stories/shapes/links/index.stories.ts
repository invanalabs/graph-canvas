import type { Meta, StoryObj } from '@storybook/html';
import { wrapStory } from "../../utils";
import template from "./../../html-templates/full-screen.html?raw";

import straightLineShapeExamplePlay from "./straightLine/index";
import straightLineShapeExampleSource from "./straightLine/index?raw";


const meta = {
  title: 'Shapes/Links',
  parameters: {
    layout: 'fullscreen',
  }

} satisfies Meta;

export default meta;

type Story = StoryObj;

export const StraightLine: Story = {
  name: "StraightLine",
  render: () => template,
  play: wrapStory(straightLineShapeExamplePlay),
  args: {},
  parameters: {
    storySource: {
      straightLineShapeExampleSource,
    },
  },
};
