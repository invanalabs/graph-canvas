import type { Preview } from "@storybook/html";
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';


const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
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
