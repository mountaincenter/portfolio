import type { Meta, StoryObj } from "@storybook/react";
import LoginAvatar from "./LoginAvatar";
import { mockSession, mockSessionWithoutImage } from "@/mocks/session";

const meta: Meta<typeof LoginAvatar> = {
  title: "Components/LoginAvatar",
  component: LoginAvatar,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof LoginAvatar>;

export const SignedIn: Story = {
  args: {
    session: mockSession,
  },
  render: (args) => <LoginAvatar {...args} />,
};

export const SignedInWithoutImage: Story = {
  args: {
    session: mockSessionWithoutImage,
  },
  render: (args) => <LoginAvatar {...args} />,
};

export const SignedOut: Story = {
  args: {
    session: null,
  },
  render: (args) => <LoginAvatar {...args} />,
};
