import React from "react";
import Demo from "@/components/Demo";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { AppTheme, useSyncHostedTheme, useTheme } from "@/contexts/ThemeContext";
import { useHostedApp } from "@/hooks/useHostedApp";
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

const starterStats = (routePrefix: string, resolvedTheme: string) => [
  { label: "Route prefix", value: routePrefix },
  { label: "Theme", value: resolvedTheme },
  { label: "API proxy", value: REMOTE_API_BASE },
  { label: "Build key", value: "__sampleRemoteBuildVersion" },
];

export default function MainPage({ onNavigate, isHosted, theme }: PageProps) {
  useSyncHostedTheme(theme);

  const hosted = isHosted ?? useHostedApp();
  const { isAuthenticated, isLoading, user } = useAuth();
  const { resolvedTheme } = useTheme();

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-[-90px] h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-[-120px] right-[-120px] h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6">
        <Card className="overflow-hidden">
          <CardContent className="flex flex-col gap-8 p-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 dark:border-blue-900/60 dark:bg-blue-900/20 dark:text-blue-200">
                DigiHub starter remote
              </div>
              <div className="space-y-3">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                  Shared DigiHub look, host-aware theme, and a clean starter structure.
                </h1>
                <p className="max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
                  This starter now mirrors DigiHub's blue/slate light and dark theme, keeps host theme propagation intact,
                  and gives new teams a clear place to add pages, hooks, contexts, and API helpers.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button onClick={() => navigateTo(onNavigate, ROUTES.settings)}>Open starter settings</Button>
              <Button variant="outline" onClick={() => navigateTo(onNavigate, ROUTES.main)}>
                Stay on main page
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {starterStats(ROUTES.main, resolvedTheme).map(item => (
            <Card key={item.label} className="border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
              <CardContent className="p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {item.label}
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{item.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <CardHeader>
              <CardTitle>Hosted integration points</CardTitle>
              <CardDescription>The host already expects this starter to behave like a proper remote.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {[
                "remoteEntry.js stays stable for Module Federation",
                "version.json is emitted for host refresh checks",
                "window.isHostedRemote is the hosted-mode source of truth",
                "window.hostAuthContext is used when the remote runs inside DigiHub",
                "theme follows the host automatically when DigiHub controls the page",
                "frontend API calls should go through /remote-api before they reach your backend",
              ].map(item => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-300"
                >
                  {item}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Theme behavior</CardTitle>
              <CardDescription>
                Standalone mode stores theme locally. Hosted mode follows DigiHub and should not drift.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ThemeToggle />
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-300">
                {hosted
                  ? "DigiHub is currently driving the page theme and route navigation."
                  : "Standalone mode uses the same light/dark palette as DigiHub so the app looks familiar before integration."}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Auth snapshot</CardTitle>
              <CardDescription>
                Standalone mode uses a harmless local stub until you replace it with your real auth flow.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-700">
                <span>Hosted mode</span>
                <span className="font-medium text-slate-900 dark:text-white">{hosted ? "yes" : "no"}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-700">
                <span>Loading</span>
                <span className="font-medium text-slate-900 dark:text-white">{isLoading ? "yes" : "no"}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-700">
                <span>Authenticated</span>
                <span className="font-medium text-slate-900 dark:text-white">{isAuthenticated ? "yes" : "no"}</span>
              </div>
              <div className="rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-700">
                <p className="font-medium text-slate-900 dark:text-white">{user?.name ?? "No user"}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{user?.email ?? "No email"}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {user?.role ?? "No role"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Starter rules to keep</CardTitle>
              <CardDescription>These are the small things that prevent big integration pain later.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              {[
                "Keep every route under the same short prefix from src/routes.ts.",
                "Change the sampleRemote federation scope before real integration.",
                "Keep remoteEntry.js, publicPath: auto, runtimeChunk: false, and version.json intact.",
                "Keep low-level backend URL building in src/lib/apiClient.ts instead of hardcoding full backend hosts in pages.",
                "Use README and STARTER-GUIDE.md before adding new folders or one-off patterns.",
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

        <Demo />
      </div>
    </div>
  );
}
