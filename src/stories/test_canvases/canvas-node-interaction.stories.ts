// import draw from "../../test_canvases/canvas-draggable";
import draw from "../../test_canvases/node-interaction-1";
import type { Meta, StoryObj } from '@storybook/html';



export const createPage = () => {
    const html = document.createElement("div");
    draw()
    return html;
};


const meta = {
  title: 'Test Canvases/node-interaction',
  render: () => createPage(),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

export const Default: StoryObj = {};

 
 
