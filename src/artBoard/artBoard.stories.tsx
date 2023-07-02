import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ArtBoard from "./artBoard";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ReactComponentLibrary/ArtBoard",
  component: ArtBoard,
} as ComponentMeta<typeof ArtBoard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ArtBoard> = (args) => <ArtBoard {...args} />;

// export const HelloWorldStory = Template.bind({});
// // More on args: https://storybook.js.org/docs/react/writing-stories/args
// HelloWorldStory.args = {
//   label: "Hello world!",
// };

 