import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const starterFolders = [
  {
    title: "pages/",
    description: "Create routed screens here and expose them from webpack when the host needs them.",
  },
  {
    title: "hooks/",
    description: "Keep reusable client-side state and integration helpers here.",
  },
  {
    title: "contexts/",
    description: "Put shared runtime state here when props stop being enough.",
  },
  {
    title: "components/",
    description: "Reusable UI belongs here; keep route-level logic inside pages/.",
  },
  {
    title: "utils/",
    description: "Use this for host detection, formatting helpers, and small pure helpers.",
  },
  {
    title: "provider.tsx",
    description: "Wrap global providers here so standalone and hosted usage stay aligned.",
  },
];

export default function Demo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Starter structure</CardTitle>
        <CardDescription>These folders are already in place so new work has a home.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 md:grid-cols-2">
          {starterFolders.map(item => (
            <div key={item.title} className="rounded-lg border border-border bg-background p-4">
              <p className="font-medium text-foreground">{item.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
