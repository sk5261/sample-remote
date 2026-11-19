declare global {
  interface AuthUser {
    username: string;
    email: string;
    name: string;
    role?: string;
  }

  interface AuthContextValue {
    isAuthenticated: boolean;
    user: AuthUser | null;
    isLoading: boolean;
    login: (username?: string, password?: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => Promise<void>;
    checkSession: () => Promise<void>;
  }

  interface Window {
    isHostedRemote?: boolean;
    hostAuthContext?: AuthContextValue;
    __sampleRemoteBuildVersion?: string;
  }
}

declare const process: {
  env: {
    NODE_ENV?: string;
    REACT_APP_BUILD_VERSION?: string;
    [key: string]: string | undefined;
  };
};

export {};
