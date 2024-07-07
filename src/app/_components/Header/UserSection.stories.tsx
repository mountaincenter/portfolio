import type { Meta, StoryObj } from "@storybook/react";
import UserSection from "./UserSection";
import { mockSession } from "@/mocks/session";

const meta: Meta<typeof UserSection> = {
  title: "Components/UserSection",
  component: UserSection,
  tags: ["autodocs"],
  args: {
    session: mockSession,
  },
};

export default meta;

type Story = StoryObj<typeof UserSection>;

export const Default: Story = {};
