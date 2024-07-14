/**
 * v0 by Vercel.
 * @see https://v0.dev/t/XxZkNffiRpg
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";
import React from "react";
import { Button } from "../_components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../_components/ui/avatar";
import { Card, CardHeader, CardContent } from "../_components/ui/card";
import { Badge } from "../_components/ui/badge";
import { Plus } from "lucide-react";

import TrelloContainer from "../_components/TrelloLike/TorelloContainer";

const Page: React.FC = () => {
  return (
    <div className="flex h-screen flex-col bg-background text-foreground dark:bg-background dark:text-foreground">
      <main className="flex-1 bg-muted/40 p-6 dark:bg-muted">
        <TrelloContainer />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
          <Card className="bg-card text-card-foreground dark:bg-card dark:text-card-foreground">
            <CardHeader className="flex items-center justify-between bg-card-foreground px-4 py-3 text-card dark:bg-card-foreground dark:text-card">
              <h2 className="text-lg font-medium">To Do</h2>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Plus className="h-5 w-5" />
                <span className="sr-only">Add new task</span>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4 p-4">
              <Card className="bg-background text-foreground shadow-sm dark:bg-card dark:text-card-foreground">
                <CardContent className="space-y-2 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Design new homepage</h3>
                    <Badge
                      variant="secondary"
                      className="rounded-full px-2 py-1 text-xs"
                    >
                      Due 2023-07-15
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span>Jared Palmer</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-background text-foreground shadow-sm dark:bg-card dark:text-card-foreground">
                <CardContent className="space-y-2 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Write blog post</h3>
                    <Badge
                      variant="secondary"
                      className="rounded-full px-2 py-1 text-xs"
                    >
                      Due 2023-07-20
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>AC</AvatarFallback>
                    </Avatar>
                    <span>Acme Inc</span>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
          <Card className="bg-card text-card-foreground dark:bg-card dark:text-card-foreground">
            <CardHeader className="flex items-center justify-between bg-card-foreground px-4 py-3 text-card dark:bg-card-foreground dark:text-card">
              <h2 className="text-lg font-medium">In Progress</h2>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Plus className="h-5 w-5" />
                <span className="sr-only">Add new task</span>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4 p-4">
              <Card className="bg-background text-foreground shadow-sm dark:bg-card dark:text-card-foreground">
                <CardContent className="space-y-2 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">
                      Implement new feature
                    </h3>
                    <Badge
                      variant="secondary"
                      className="rounded-full px-2 py-1 text-xs"
                    >
                      Due 2023-07-25
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span>Jared Palmer</span>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
          <Card className="bg-card text-card-foreground dark:bg-card dark:text-card-foreground">
            <CardHeader className="flex items-center justify-between bg-card-foreground px-4 py-3 text-card dark:bg-card-foreground dark:text-card">
              <h2 className="text-lg font-medium">Done</h2>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Plus className="h-5 w-5" />
                <span className="sr-only">Add new task</span>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4 p-4">
              <Card className="bg-background text-foreground shadow-sm dark:bg-card dark:text-card-foreground">
                <CardContent className="space-y-2 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">
                      Update documentation
                    </h3>
                    <Badge
                      variant="secondary"
                      className="rounded-full px-2 py-1 text-xs"
                    >
                      Due 2023-07-10
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>AC</AvatarFallback>
                    </Avatar>
                    <span>Acme Inc</span>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Page;
