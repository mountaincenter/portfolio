import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./card";
import { Button } from "@/app/_components/ui/button";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Card>;

// デフォルトのストーリー
export const Default: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Default Card</CardTitle>
        <CardDescription>This is a default card example.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          This is the content of the card. It can include text, images, or other
          elements.
        </p>
      </CardContent>
      <CardFooter>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  ),
};

// ヘッダーとフッターのあるカード
export const WithHeaderAndFooter: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Card with Header and Footer</CardTitle>
        <CardDescription>Including a header and footer.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          This card includes a header and a footer for additional context and
          actions.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="secondary">Cancel</Button>
        <Button>Confirm</Button>
      </CardFooter>
    </Card>
  ),
};

// カードのコンテンツがいっぱいの状態
export const FullContent: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Full Content Card</CardTitle>
        <CardDescription>A card with more content.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          lacinia odio vitae vestibulum vestibulum.
        </p>
        <p>Curabitur venenatis ut elit quis tempus, sed eget sem pretium.</p>
        <p>
          Maecenas condimentum, ligula at interdum venenatis, nisi erat bibendum
          urna, sit amet tincidunt lectus ex eget purus.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="destructive">Delete</Button>
        <Button>Save changes</Button>
      </CardFooter>
    </Card>
  ),
};
