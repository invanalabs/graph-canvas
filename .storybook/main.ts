import type { StorybookConfig } from "@storybook/html-vite";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    '@storybook/addon-docs',
    "@storybook/addon-interactions",
    "@storybook/addon-storysource",
    "@chromatic-com/storybook"
  ],
  framework: {
    name: "@storybook/html-vite",
    options: {},
  },
  // typescript: {
  //   check: true,
  // },
  // core: {
  //   disableTelemetry: true,
  // },
  docs: {},
  viteFinal: async (config, { configType }) => {
    config.plugins.push({
      name: 'storybook-addon-storysource',
      enforce: 'pre',
      transform(src, id) {
        if (/\.stories\.(ts|tsx|js|jsx)$/.test(id)) {
          return {
            code: src,
            map: null,
          };
        }
        return null;
      },
    });

    return config;
  },

  // viteFinal:   async (config) => {
  //   return mergeConfig(config, {
  //     resolve: {
  //       preserveSymlinks: false,
  //     },
  //   });
  // },
};
export default config;
