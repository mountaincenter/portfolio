import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./badge";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

// デフォルトのストーリー
export const Default: Story = {
  args: {
    children: "Default Badge",
    variant: "default",
  },
};

// セカンダリバリアントのストーリー
export const Secondary: Story = {
  args: {
    children: "Secondary Badge",
    variant: "secondary",
  },
};

// デストラクティブバリアントのストーリー
export const Destructive: Story = {
  args: {
    children: "Destructive Badge",
    variant: "destructive",
  },
};

// アウトラインバリアントのストーリー
export const Outline: Story = {
  args: {
    children: "Outline Badge",
    variant: "outline",
  },
};

// 日付を表示するバリアントのストーリー
export const WithDate: Story = {
  args: {
    children: `Due ${new Date().toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })}`,
    variant: "default",
  },
};
