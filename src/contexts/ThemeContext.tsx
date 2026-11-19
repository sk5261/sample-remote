import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import isHostedApp from "@/utils/hostDetection";

export type AppTheme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

type ThemeContextValue = {
  theme: AppTheme;
  resolvedTheme: ResolvedTheme;
  isHosted: boolean;
  setTheme: (theme: AppTheme) => void;
  toggleTheme: () => void;
  syncHostedTheme: (theme?: AppTheme) => void;
};

const STORAGE_KEY = "sample-remote-theme";

const themeTokens: Record<ResolvedTheme, Record<string, string>> = {
  light: {
    "--background": "0 0% 100%",
    "--foreground": "222.2 84% 4.9%",
    "--card": "0 0% 100%",
    "--card-foreground": "222.2 84% 4.9%",
    "--popover": "0 0% 100%",
    "--popover-foreground": "222.2 84% 4.9%",
    "--primary": "221.2 83.2% 53.3%",
    "--primary-foreground": "210 40% 98%",
    "--secondary": "210 40% 96.1%",
    "--secondary-foreground": "222.2 47.4% 11.2%",
    "--muted": "210 40% 96.1%",
    "--muted-foreground": "215.4 16.3% 46.9%",
    "--accent": "210 40% 96.1%",
    "--accent-foreground": "222.2 47.4% 11.2%",
    "--destructive": "0 84.2% 60.2%",
    "--destructive-foreground": "210 40% 98%",
    "--border": "214.3 31.8% 91.4%",
    "--input": "214.3 31.8% 91.4%",
    "--ring": "221.2 83.2% 53.3%",
  },
  dark: {
    "--background": "222.2 84% 4.9%",
    "--foreground": "210 40% 98%",
    "--card": "222.2 84% 4.9%",
    "--card-foreground": "210 40% 98%",
    "--popover": "222.2 84% 4.9%",
    "--popover-foreground": "210 40% 98%",
    "--primary": "217.2 91.2% 59.8%",
    "--primary-foreground": "222.2 47.4% 11.2%",
    "--secondary": "217.2 32.6% 17.5%",
    "--secondary-foreground": "210 40% 98%",
    "--muted": "217.2 32.6% 17.5%",
    "--muted-foreground": "215 20.2% 65.1%",
    "--accent": "217.2 32.6% 17.5%",
    "--accent-foreground": "210 40% 98%",
    "--destructive": "0 62.8% 30.6%",
    "--destructive-foreground": "210 40% 98%",
    "--border": "217.2 32.6% 17.5%",
    "--input": "217.2 32.6% 17.5%",
    "--ring": "224.3 76.3% 48%",
  },
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const isThemeOption = (value?: string): value is AppTheme => value === "light" || value === "dark" || value === "system";

const getSystemTheme = (): ResolvedTheme =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const detectDocumentTheme = (): ResolvedTheme =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

const resolveTheme = (theme: AppTheme, hosted: boolean): ResolvedTheme => {
  if (theme === "system") {
    return hosted ? detectDocumentTheme() : getSystemTheme();
  }

  return theme;
};

const applyTheme = (resolvedTheme: ResolvedTheme) => {
  const root = window.document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(resolvedTheme);
  root.style.colorScheme = resolvedTheme;

  Object.entries(themeTokens[resolvedTheme]).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
};

const getStoredTheme = (): AppTheme => {
  if (typeof window === "undefined") {
    return "system";
  }

  const storedTheme = window.localStorage.getItem(STORAGE_KEY);
  return isThemeOption(storedTheme ?? undefined) ? (storedTheme as AppTheme) : "system";
};

function useHostedThemeFallback(): ThemeContextValue {
  const [theme, setTheme] = useState<AppTheme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() =>
    typeof document === "undefined" ? "light" : detectDocumentTheme()
  );

  useEffect(() => {
    if (!isHostedApp()) {
      return undefined;
    }

    const sync = (nextTheme?: AppTheme) => {
      const normalizedTheme = isThemeOption(nextTheme) ? nextTheme : "system";
      setTheme(normalizedTheme);
      setResolvedTheme(resolveTheme(normalizedTheme, true));
    };

    sync();

    const handleThemeChange = (event: Event) => {
      sync((event as CustomEvent<{ theme?: AppTheme }>).detail?.theme);
    };

    window.addEventListener("themeChange", handleThemeChange as EventListener);
    return () => window.removeEventListener("themeChange", handleThemeChange as EventListener);
  }, []);

  return useMemo(
    () => ({
      theme,
      resolvedTheme,
      isHosted: true,
      setTheme: () => undefined,
      toggleTheme: () => undefined,
      syncHostedTheme: nextTheme => {
        const normalizedTheme = isThemeOption(nextTheme) ? nextTheme : "system";
        setTheme(normalizedTheme);
        setResolvedTheme(resolveTheme(normalizedTheme, true));
      },
    }),
    [resolvedTheme, theme]
  );
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const hosted = isHostedApp();
  const [theme, setTheme] = useState<AppTheme>(() => (hosted ? "system" : getStoredTheme()));
  const [hostedTheme, setHostedTheme] = useState<AppTheme>("system");
  const resolvedTheme = hosted ? resolveTheme(hostedTheme, true) : resolveTheme(theme, false);

  useEffect(() => {
    if (hosted) {
      return undefined;
    }

    applyTheme(resolvedTheme);
    window.localStorage.setItem(STORAGE_KEY, theme);
    return undefined;
  }, [hosted, resolvedTheme, theme]);

  useEffect(() => {
    if (!hosted) {
      return undefined;
    }

    const handleThemeChange = (event: Event) => {
      const nextTheme = (event as CustomEvent<{ theme?: AppTheme }>).detail?.theme;
      setHostedTheme(isThemeOption(nextTheme) ? nextTheme : "system");
    };

    window.addEventListener("themeChange", handleThemeChange as EventListener);
    return () => window.removeEventListener("themeChange", handleThemeChange as EventListener);
  }, [hosted]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme: hosted ? hostedTheme : theme,
      resolvedTheme,
      isHosted: hosted,
      setTheme: nextTheme => {
        if (!hosted) {
          setTheme(nextTheme);
        }
      },
      toggleTheme: () => {
        if (!hosted) {
          setTheme(currentTheme => (resolveTheme(currentTheme, false) === "dark" ? "light" : "dark"));
        }
      },
      syncHostedTheme: nextTheme => {
        if (hosted) {
          setHostedTheme(isThemeOption(nextTheme) ? nextTheme : "system");
        }
      },
    }),
    [hosted, hostedTheme, resolvedTheme, theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  const hostedFallback = useHostedThemeFallback();

  if (context) {
    return context;
  }

  if (isHostedApp()) {
    return hostedFallback;
  }

  throw new Error("useTheme must be used within a ThemeProvider");
}

export function useSyncHostedTheme(theme?: AppTheme) {
  const context = useContext(ThemeContext);

  useEffect(() => {
    if (context?.isHosted) {
      context.syncHostedTheme(theme);
    }
  }, [context, theme]);
}
