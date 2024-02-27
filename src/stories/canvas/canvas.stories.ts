import type { Meta, StoryObj } from '@storybook/html';
import { createPage } from './canvas';

const meta = {
  title: 'Graph/Canvas',
  render: () => createPage(),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

export const Default: StoryObj = {};

 