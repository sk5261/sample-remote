import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AppTheme, useSyncHostedTheme, useTheme } from "@/contexts/ThemeContext";
import { REMOTE_API_BASE } from "@/lib/apiClient";
import { ROUTES } from "@/routes";

type PageProps = {
  onNavigate?: (path: string) => void;
  isHosted?: boolean;
  theme?: AppTheme;
};

const navigateTo = (onNavigate: PageProps["onNavigate"], path: string) => {
  if (onNavigate) {
    onNavigate(path);
    return;
  }

  window.location.assign(path);
};

export default function SettingsPage({ onNavigate, theme }: PageProps) {
  useSyncHostedTheme(theme);

  const { isHosted, resolvedTheme, theme: currentTheme } = useTheme();

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-120px] top-[-100px] h-64 w-64 rounded-full bg-violet-500/15 blur-3xl" />
        <div className="absolute bottom-[-120px] left-[-120px] h-72 w-72 rounded-full bg-blue-500/15 blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-10 sm:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Starter settings page</CardTitle>
            <CardDescription>
              Use this route for app-level settings, environment info, and integration-safe configuration screens.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 sm:flex-row">
            <Button variant="outline" onClick={() => navigateTo(onNavigate, ROUTES.main)}>
              Back to main page
            </Button>
            <Button onClick={() => navigateTo(onNavigate, ROUTES.settings)}>Stay on settings</Button>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Theme contract</CardTitle>
              <CardDescription>This starter works the same in standalone mode and inside DigiHub.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-950/60">
                <p className="font-medium text-slate-900 dark:text-white">Hosted mode</p>
                <p className="mt-1">{isHosted ? "yes" : "no"}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-950/60">
                <p className="font-medium text-slate-900 dark:text-white">Theme preference</p>
                <p className="mt-1">{currentTheme}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-950/60">
                <p className="font-medium text-slate-900 dark:text-white">Resolved theme</p>
                <p className="mt-1">{resolvedTheme}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Backend proxy contract</CardTitle>
              <CardDescription>Keep browser requests on the frontend origin and let webpack or nginx forward them.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-950/60">
                <p className="font-medium text-slate-900 dark:text-white">Frontend API base</p>
                <p className="mt-1 font-mono text-xs">{REMOTE_API_BASE}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-950/60">
                <p className="font-medium text-slate-900 dark:text-white">Where to change it</p>
                <p className="mt-1">Update the proxy in webpack.config.js and keep src/lib/apiClient.ts aligned with the same prefix.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-950/60">
                <p className="font-medium text-slate-900 dark:text-white">Why this matters</p>
                <p className="mt-1">It keeps local development, DigiHub integration, and future nginx config using the same request shape.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Where future code should go</CardTitle>
            <CardDescription>Keep growth predictable so the starter stays easy for new teams to extend.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-4 text-sm text-slate-600 dark:text-slate-300">
            {[
              "pages/: full route screens and page composition",
              "components/: reusable UI and page sections",
              "hooks/: reusable stateful logic and data wiring",
              "lib/: low-level helpers like the API client and query setup",
              "contexts/: app-wide runtime state such as auth or theme",
              "utils/: pure helpers with no React state",
              "provider.tsx: wrap global providers in one place",
              "README + STARTER-GUIDE.md: explain the structure before you add new patterns",
            ].map(item => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-950/60"
              >
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
