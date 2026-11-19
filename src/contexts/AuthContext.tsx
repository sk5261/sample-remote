import React, { createContext, useContext, useMemo, useState } from "react";
import isHostedApp from "@/utils/hostDetection";

const standaloneUser: AuthUser = {
  username: "developer",
  email: "developer@example.com",
  name: "Standalone Developer",
  role: "developer",
};

const hostedFallback: AuthContextValue = {
  isAuthenticated: false,
  user: null,
  isLoading: true,
  login: async () => ({ success: false, error: "Host auth context is still loading." }),
  logout: async () => undefined,
  checkSession: async () => undefined,
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(standaloneUser);

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated: user !== null,
      user,
      isLoading: false,
      login: async () => {
        setUser(standaloneUser);
        return { success: true };
      },
      logout: async () => {
        setUser(null);
      },
      checkSession: async () => undefined,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  if (isHostedApp()) {
    return window.hostAuthContext ?? hostedFallback;
  }

  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
