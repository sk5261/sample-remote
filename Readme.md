# Sample Remote

Starter DigiHub remote app for teams building a new federated module.

## Quick start

```bash
git clone <your-repo-url>
cd sample-remote
npm install
npm start
```

Dev server: `http://localhost:3002`

## What this starter already gives you

- working webpack Module Federation remote
- DigiHub-style blue/slate light and dark theme
- standalone theme persistence plus automatic hosted theme following
- prefixed routes so the remote does not collide with host routes
- hosted auth bridge stub for `window.hostAuthContext`
- example pages, hooks, contexts, and provider structure
- `/remote-api` frontend proxy contract for backend calls
- `version.json` build manifest for host refresh detection

## Change these before integrating

1. Update the federation scope name in `webpack.config.js` from `sampleRemote` to your app scope.
2. Update the route prefix in `src/routes.ts` from `/sample` to your app prefix.
3. Update the `/remote-api` proxy target and rewrite rule in `webpack.config.js` for your backend.
4. Keep `src/lib/apiClient.ts` aligned with the same proxy prefix your webpack/nginx config uses.
5. Replace the starter auth stub in `src/contexts/AuthContext.tsx` with your real standalone auth flow if needed.
6. Replace the starter pages in `src/pages/` with your actual screens.

## Project structure

```text
src/
├── App.tsx
├── bootstrap.tsx
├── env.d.ts
├── globals.css
├── provider.tsx
├── routes.ts
├── components/
│   ├── Demo.tsx
│   ├── ThemeToggle.tsx
│   └── ui/
├── contexts/
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
├── hooks/
│   └── useHostedApp.ts
├── pages/
│   ├── main.tsx
│   └── settings.tsx
├── utils/
│   ├── ThemeContext.tsx
│   └── hostDetection.ts
└── lib/
    ├── apiClient.ts
    └── utils.ts
```

`src/utils/ThemeContext.tsx` is only a compatibility re-export. New theme work belongs in `src/contexts/ThemeContext.tsx`.

## Integration rules that matter

- Every route must stay under a short unique prefix.
- Keep `remoteEntry.js` as the federation filename.
- Keep `publicPath: "auto"`.
- Keep `runtimeChunk: false`.
- Keep `VersionManifestPlugin` so DigiHub can detect new deployments.
- Detect hosted mode only through `window.isHostedRemote`.
- Keep frontend backend calls on `/remote-api` and forward them through the dev proxy or nginx.

## Commands

```bash
npm start
npm run typecheck
npm run build
```

## Verification

`npm run build` must produce `remoteEntry.js` and `version.json`.

## More docs

- [Starter repo guide](./STARTER-GUIDE.md)
- DigiHub host integration guides: https://www.nasdigi.io/docs/integration
