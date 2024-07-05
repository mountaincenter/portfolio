import type { Meta, StoryObj } from "@storybook/react";
import TextAtom from "./TextAtom";

const meta: Meta<typeof TextAtom> = {
  title: "Atoms/TextAtom",
  component: TextAtom,
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: {
        type: "select",
        options: ["small", "medium", "large", "title", "nav"],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextAtom>;

export const Small: Story = {
  args: {
    size: "small",
    children: "Small Text",
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
    children: "Medium Text",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    children: "Large Text",
  },
};

export const Title: Story = {
  args: {
    size: "title",
    children: "Title Text",
  },
};

export const Nav: Story = {
  args: {
    size: "nav",
    children: "Nav Text",
  },
};
