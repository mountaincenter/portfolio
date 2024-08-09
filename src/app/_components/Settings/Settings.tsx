"use client";
import { useState, useEffect } from "react";
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/app/_components/ui/card";
import { Label } from "@/app/_components/ui/label";
import { Input } from "@/app/_components/ui/input";
import { Switch } from "@/app/_components/ui/switch";
import { useTheme } from "next-themes";

import { useUserMutation } from "@/app/hooks/useUserMutation";

const SettingsPage: React.FC = () => {
  const { user, updateUser, isLoading } = useUserMutation();
  const { theme, setTheme } = useTheme();

  // height を number 型で管理し、初期値は 0 に設定
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (user) {
      // user.height が存在する場合はその値を設定、存在しない場合は 0
      setHeight(user.height ?? 0);
    }
  }, [user]);

  const handleSave = () => {
    // 更新ミューテーションの呼び出し
    updateUser({ height });
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
          <p className="text-muted-foreground">
            Customize your application preferences.
          </p>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                  Update your profile information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="height">Height</Label>
                  <Input
                    id="height"
                    value={height}
                    onChange={(e) => setHeight(parseFloat(e.target.value))}
                    placeholder="Enter your height"
                    type="number"
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Dark Mode</Label>
                  <Switch
                    checked={theme === "dark"}
                    onCheckedChange={(checked) =>
                      setTheme(checked ? "dark" : "light")
                    }
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleSave}
                  className="ml-auto"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
