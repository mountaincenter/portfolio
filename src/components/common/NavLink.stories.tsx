import type { Meta, StoryObj } from "@storybook/react";
import NavLinks from "./NavLinks";

const meta: Meta<typeof NavLinks> = {
  title: "Common/NavLinks",
  component: NavLinks,
  argTypes: {
    items: {
      control: {
        type: "object",
      },
      defaultValue: [
        { label: "Timer", path: "/timer" },
        { label: "Trello", path: "/services" },
        { label: "BodyFat", path: "/contact" },
      ],
    },
  },
};

export default meta;

type Story = StoryObj<typeof NavLinks>;

export const Default: Story = {
  args: {
    items: [
      { label: "Timer", path: "/timer" },
      { label: "Services", path: "/services" },
      { label: "Contact", path: "/contact" },
    ],
  },
};
