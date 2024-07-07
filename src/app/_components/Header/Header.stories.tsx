import type { Meta, StoryObj } from "@storybook/react";
import Header from "./Header";
import { Session } from "next-auth";
import { mockSession } from "@/mocks/session";

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  tags: ["autodocs"],
  args: {
    session: mockSession,
  },
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {};
