import React, { useEffect } from "react";
import { AuthProvider } from "@/contexts/AuthContext";

const BUILD_VERSION = process.env.REACT_APP_BUILD_VERSION || "dev";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    window.__sampleRemoteBuildVersion = BUILD_VERSION;

    if (window.isHostedRemote) {
      console.info("[SampleRemote] active build", BUILD_VERSION);
    }
  }, []);

  return <AuthProvider>{children}</AuthProvider>;
}
