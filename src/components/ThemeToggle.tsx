import React from "react";
import { Laptop, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppTheme, useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

const themeOptions: Array<{
  value: AppTheme;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Laptop },
];

export default function ThemeToggle() {
  const { isHosted, resolvedTheme, setTheme, theme } = useTheme();

  if (isHosted) {
    return (
      <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800 dark:border-blue-900/60 dark:bg-blue-900/20 dark:text-blue-200">
        DigiHub controls the theme while this remote is hosted. Current theme: {resolvedTheme}.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {themeOptions.map(option => {
          const Icon = option.icon;
          const active = theme === option.value;

          return (
            <Button
              key={option.value}
              type="button"
              variant={active ? "default" : "outline"}
              onClick={() => setTheme(option.value)}
              className={cn("gap-2", !active && "text-slate-700 dark:text-slate-100")}
            >
              <Icon className="h-4 w-4" />
              {option.label}
            </Button>
          );
        })}
      </div>
      <p className="text-sm text-muted-foreground">
        Standalone mode stores your preference locally. Current applied theme: {resolvedTheme}.
      </p>
    </div>
  );
}
