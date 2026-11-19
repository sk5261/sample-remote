# AGENTS

## Repo purpose
- Starter DigiHub remote app for new teams to clone and customize.
- Keeps the minimum working Module Federation, auth bridge, route prefixing, and shared theme setup expected by the DigiHub host.

## Commands
- `npm start` - webpack dev server on `localhost:3002`
- `npm run build` - production build
- `npm run typecheck` - TypeScript check

## Starter structure
- `src/App.tsx` - standalone router using the required prefixed routes
- `src/routes.ts` - route prefix source of truth (`/sample` by default; change it before integration)
- `src/pages/main.tsx` - starter landing page exposed to the host as `./main`
- `src/pages/settings.tsx` - second example routed page exposed as `./settings`
- `src/provider.tsx` - top-level providers and build-version publish
- `src/contexts/AuthContext.tsx` - hosted/standalone auth bridge stub
- `src/hooks/useHostedApp.ts` - hook wrapper around hosted detection
- `src/utils/hostDetection.ts` - source of truth for `window.isHostedRemote`
- `src/components/Demo.tsx` - starter folder map for new developers
- `webpack.config.js` - federation scope, shared deps, and `version.json` emission

## Integration rules
- Change the default route prefix from `/sample` to your app's own short prefix before integrating into DigiHub.
- Change the federation scope name `sampleRemote` before integrating.
- Keep `filename: "remoteEntry.js"`, `publicPath: "auto"`, and `runtimeChunk: false`.
- Keep `VersionManifestPlugin`; DigiHub uses `version.json` to detect fresh remote builds.
- Detect hosted mode only through `window.isHostedRemote`; do not infer it from the URL.
- Keep `src/globals.css`, `tailwind.config.js`, and `postcss.config.js` aligned with DigiHub shared theme variables.

## Verification
- `npm run typecheck`
- `npm run build`

## Reference docs
- DigiHub host integration guides live in https://www.nasdigi.io/docs/integration.
