import draw from "../../test_canvases/canvas1";

import type { Meta, StoryObj } from '@storybook/html';



export const createPage = () => {
    const html = document.createElement("div");
    draw()
    return html;
};


const meta = {
  title: 'Test Canvases/canvas1',
  render: () => createPage(),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

export const Default: StoryObj = {};

 
 
