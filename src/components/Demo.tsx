import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const starterFolders = [
  {
    title: "pages/",
    description: "Route-level screens live here. Keep page composition here and move reusable pieces out to components/.",
  },
  {
    title: "hooks/",
    description: "Reusable React state and side-effect logic lives here. Hooks start with use and should stay focused.",
  },
  {
    title: "contexts/",
    description: "Put app-wide state here when several parts of the UI need the same runtime data.",
  },
  {
    title: "components/",
    description: "Reusable UI belongs here. Keep domain widgets here and keep App.tsx thin.",
  },
  {
    title: "utils/",
    description: "Use this for small pure helpers like host detection or formatting, not React state containers.",
  },
  {
    title: "lib/",
    description: "Low-level plumbing goes here, like class helpers, API URL helpers, or future query client setup.",
  },
  {
    title: "provider.tsx",
    description: "Global wrappers live here so standalone and hosted rendering use the same app-level providers.",
  },
];

export default function Demo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Starter structure</CardTitle>
        <CardDescription>
          These folders are already in place so new work has a clear home before the app grows.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {starterFolders.map(item => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-950/60"
            >
              <p className="font-medium text-slate-900 dark:text-white">{item.title}</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
