import React from "react";
import type { Preview } from "@storybook/react";
import "../src/styles/globals.css";
import { ThemeProvider } from "../src/components/theme-provider";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class">
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
