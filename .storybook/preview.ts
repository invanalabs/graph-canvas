import type { Preview } from "@storybook/html";
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';

const preview: Preview = {
  parameters: {
    // actions: { argTypesRegex: "^on[A-Z].*" },
    actions: {
      handles: ['click', 'mouseover'], // Add any events you want to listen for
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};


export const parameters = {
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
};

export default preview;
