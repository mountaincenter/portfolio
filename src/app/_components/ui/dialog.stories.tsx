import type { Meta, StoryObj } from "@storybook/react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./dialog";
import { Button } from "./button";

const meta: Meta<typeof Dialog> = {
  title: "UI/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  argTypes: {
    open: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof Dialog>;

// デフォルトのダイアログ
export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a sample description for the dialog. You can add more
            content here.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>
            Dialog body content goes here. You can include any elements like
            text, inputs, buttons, etc.
          </p>
        </div>
        <DialogFooter>
          <Button variant="ghost">Cancel</Button>
          <Button variant="default">Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// ユーザー入力を含むダイアログ
export const WithUserInput: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Open Dialog with Input</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Information</DialogTitle>
          <DialogDescription>
            Update your profile information here.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            className="mt-1 w-full rounded border p-2"
            placeholder="Enter your name"
          />
        </div>
        <DialogFooter>
          <Button variant="ghost">Cancel</Button>
          <Button variant="default">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
