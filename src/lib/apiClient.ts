export const REMOTE_API_BASE = "/remote-api";

export const toRemoteApiUrl = (path: string) => {
  if (path.startsWith(REMOTE_API_BASE)) {
    return path;
  }

  return `${REMOTE_API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
};

export const remoteApiFetch = (path: string, init?: RequestInit) => fetch(toRemoteApiUrl(path), init);
