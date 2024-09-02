import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import { mockSession, mockSessionWithoutImage } from "@/mocks/session";

const meta: Meta<typeof Avatar> = {
  title: "UI/Avatar",
  component: Avatar,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage
        src={mockSession.user.image ?? undefined}
        alt={mockSession.user.name ?? "User"}
      />
      <AvatarFallback>{mockSession.user.name?.charAt(0) ?? "?"}</AvatarFallback>
    </Avatar>
  ),
};

export const WithoutImage: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage
        src={mockSessionWithoutImage.user.image ?? undefined}
        alt={mockSessionWithoutImage.user.name ?? "User"}
      />
      <AvatarFallback>
        {mockSessionWithoutImage.user.name?.charAt(0) ?? "?"}
      </AvatarFallback>
    </Avatar>
  ),
};
