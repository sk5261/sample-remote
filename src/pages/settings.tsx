import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/routes";

type PageProps = {
  onNavigate?: (path: string) => void;
  isHosted?: boolean;
  theme?: "light" | "dark" | "system";
};

const navigateTo = (onNavigate: PageProps["onNavigate"], path: string) => {
  if (onNavigate) {
    onNavigate(path);
    return;
  }

  window.location.assign(path);
};

export default function SettingsPage({ onNavigate }: PageProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-10">
        <Card>
          <CardHeader>
            <CardTitle>Starter settings page</CardTitle>
            <CardDescription>
              This route exists so teams have a second example page and a safe place to grow app-level settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>Keep new app routes under the same prefix defined in `src/routes.ts`.</p>
            <p>Expose pages from `webpack.config.js` only when the host needs to load them directly.</p>
            <p>Replace the local auth stub before you rely on standalone permissions.</p>
            <Button variant="outline" onClick={() => navigateTo(onNavigate, ROUTES.main)}>
              Back to main page
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
