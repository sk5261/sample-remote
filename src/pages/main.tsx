import React from "react";
import Demo from "@/components/Demo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useHostedApp } from "@/hooks/useHostedApp";
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

export default function MainPage({ onNavigate, isHosted }: PageProps) {
  const hosted = isHosted ?? useHostedApp();
  const { isAuthenticated, isLoading, user } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10">
        <Card>
          <CardHeader>
            <CardTitle>Sample remote starter</CardTitle>
            <CardDescription>
              Clone this repo, rename the route prefix and federation scope, then replace these starter pages with your app.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>Default route prefix: {ROUTES.main}</p>
              <p>Hosted mode: {hosted ? "yes" : "no"}</p>
              <p>Build version key: window.__sampleRemoteBuildVersion</p>
            </div>
            <Button onClick={() => navigateTo(onNavigate, ROUTES.settings)}>
              Open starter settings page
            </Button>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Hosted integration</CardTitle>
              <CardDescription>These pieces are already wired for DigiHub.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>- `remoteEntry.js` federation entry</p>
              <p>- `version.json` build manifest</p>
              <p>- `window.isHostedRemote` detection</p>
              <p>- `window.hostAuthContext` bridge</p>
              <p>- shared Tailwind theme variables</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Auth snapshot</CardTitle>
              <CardDescription>
                Standalone mode uses a harmless local stub until you replace it with real auth.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>Loading: {isLoading ? "yes" : "no"}</p>
              <p>Authenticated: {isAuthenticated ? "yes" : "no"}</p>
              <p>User: {user?.name ?? "none"}</p>
              <p>Email: {user?.email ?? "none"}</p>
              <p>Role: {user?.role ?? "none"}</p>
            </CardContent>
          </Card>
        </div>

        <Demo />
      </div>
    </div>
  );
}
