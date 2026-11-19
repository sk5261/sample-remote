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
- shared DigiHub Tailwind theme variables
- prefixed routes so the remote does not collide with host routes
- hosted auth bridge stub for `window.hostAuthContext`
- example pages, hooks, contexts, and provider structure
- `version.json` build manifest for host refresh detection

## Change these before integrating

1. Update the federation scope name in `webpack.config.js` from `sampleRemote` to your app scope.
2. Update the route prefix in `src/routes.ts` from `/sample` to your app prefix.
3. Replace the starter auth stub in `src/contexts/AuthContext.tsx` with your real standalone auth flow if needed.
4. Replace the starter pages in `src/pages/` with your actual screens.

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
│   └── ui/
├── contexts/
│   └── AuthContext.tsx
├── hooks/
│   └── useHostedApp.ts
├── pages/
│   ├── main.tsx
│   └── settings.tsx
├── utils/
│   ├── ThemeContext.tsx
│   └── hostDetection.ts
└── lib/
    └── utils.ts
```

## Integration rules that matter

- Every route must stay under a short unique prefix.
- Keep `remoteEntry.js` as the federation filename.
- Keep `publicPath: "auto"`.
- Keep `runtimeChunk: false`.
- Keep `VersionManifestPlugin` so DigiHub can detect new deployments.
- Detect hosted mode only through `window.isHostedRemote`.

## Commands

```bash
npm start
npm run typecheck
npm run build
```

## Verification

`npm run build` must produce `remoteEntry.js` and `version.json`.

## More docs

Use the DigiHub host integration guides from the host repo `docs/integration/`, especially:

- `00-START-HERE.md`
- `03-building-your-app.md`
- `04-authentication.md`
- `05-theme-and-css.md`
