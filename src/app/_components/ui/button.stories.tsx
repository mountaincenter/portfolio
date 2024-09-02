import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { Play, Sun } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

// デフォルトのストーリー
export const Default: Story = {
  args: {
    children: "Default Button",
    variant: "default",
    size: "default",
  },
};

// デストラクティブバリアントのストーリー
export const Destructive: Story = {
  args: {
    children: "Destructive Button",
    variant: "destructive",
    size: "default",
  },
};

// アウトラインバリアントのストーリー
export const Outline: Story = {
  args: {
    children: "Outline Button",
    variant: "outline",
    size: "default",
  },
};

// セカンダリバリアントのストーリー
export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
    size: "default",
  },
};

// ゴーストバリアントのストーリー
export const Ghost: Story = {
  args: {
    children: "Ghost Button",
    variant: "ghost",
    size: "default",
  },
};

// リンクバリアントのストーリー
export const Link: Story = {
  args: {
    children: "Link Button",
    variant: "link",
    size: "default",
  },
};

// アイコンボタンのストーリー（デフォルトバリアント）
export const IconButton: Story = {
  args: {
    children: <Play className="h-5 w-5" />,
    variant: "default",
    size: "icon",
  },
};

// アイコンボタンのストーリー（ゴーストバリアント）
export const GhostIconButton: Story = {
  args: {
    children: <Sun className="h-5 w-5" />,
    variant: "ghost",
    size: "icon",
  },
};

// 大きいボタンのストーリー
export const Large: Story = {
  args: {
    children: "Large Button",
    variant: "default",
    size: "lg",
  },
};

// 小さいボタンのストーリー
export const Small: Story = {
  args: {
    children: "Small Button",
    variant: "default",
    size: "sm",
  },
};
