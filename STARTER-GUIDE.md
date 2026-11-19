# Starter Repo Guide

This starter is meant to stay boring and predictable.

If you keep each kind of code in the right place, new developers can clone the repo and start building without first untangling the structure.

## How to think about this repo

- `App.tsx` owns routes and little else.
- `pages/` own route-level composition.
- `components/` own reusable UI.
- `hooks/` own reusable React state and side effects.
- `contexts/` own app-wide runtime state.
- `utils/` own small pure helpers.
- `lib/` own low-level plumbing and wrappers around external APIs.
- `provider.tsx` is the single place that wraps the app in global providers.

## What a provider is

A provider is a React wrapper that makes shared state or services available to everything under it.

In this repo, `provider.tsx` wraps the app in:

- `ThemeProvider` so standalone mode can manage light/dark/system theme
- `AuthProvider` so standalone mode can expose auth state

Typical future provider examples:

- `QueryClientProvider` for React Query
- app-level feature flag provider
- app-level notification/toast provider

Keep provider setup in `provider.tsx` instead of sprinkling it across pages.

## What a hook is

A hook is reusable React logic that starts with `use...`.

Use a hook when you want to share stateful logic or side effects, not just a plain helper function.

Good hook examples:

- `useHostedApp.ts` to ask whether the app is running inside DigiHub
- `useOrders.ts` to fetch and cache orders
- `useSidebarState.ts` to manage a collapsible sidebar preference

Not a hook:

- date formatting
- string cleanup
- URL joining

Those belong in `utils/` or `lib/`.

## Folder rules

### `pages/`

Keep here:

- full route screens
- page-level layout and composition
- page-level calls to hooks
- wiring host props like `onNavigate` or `theme`

Do not keep here:

- low-level fetch wrappers
- large reusable widgets used across many pages
- utility functions that have nothing to do with the page

Example:

- `pages/settings.tsx` renders the settings screen
- it can call `useTheme()` and `useOrders()`
- it should not define a reusable table component inline if that table is used elsewhere

### `components/`

Keep here:

- reusable UI pieces
- page sections that are used more than once
- app-specific widgets
- `components/ui/` primitives like buttons and cards

Do not keep here:

- route definitions
- global app providers
- low-level API URL builders

Example:

- `components/ThemeToggle.tsx`
- `components/OrdersTable.tsx`
- `components/ui/button.tsx`

### `contexts/`

Keep here:

- app-wide shared runtime state
- auth state
- theme state
- things several distant parts of the tree need at the same time

Do not keep here:

- one-off local component state
- stateless helper functions
- data that can stay in a single page

Example:

- `contexts/AuthContext.tsx`
- `contexts/ThemeContext.tsx`

If only one page needs something, start with local state before promoting it to a context.

### `hooks/`

Keep here:

- reusable React state
- subscriptions
- fetch orchestration
- browser event wiring
- code that combines multiple contexts or services

Do not keep here:

- JSX-heavy reusable UI
- plain helper functions with no React state
- global provider setup

Example:

- `useHostedApp.ts`
- a future `useApplications.ts`
- a future `useCurrentUserPermissions.ts`

### `utils/`

`utils/ThemeContext.tsx` exists only as a compatibility re-export. New theme changes belong in `contexts/ThemeContext.tsx`.

Keep here:

- small pure helpers
- host detection
- formatting helpers
- tiny functions with no React dependency

Do not keep here:

- contexts for new code
- hooks
- direct backend fetch wrappers
- large business workflows

Example:

- `utils/hostDetection.ts`
- a future `utils/formatDate.ts`

### `lib/`

Keep here:

- low-level plumbing
- wrappers around browser or third-party APIs
- shared setup files
- API URL helpers

Do not keep here:

- route screens
- React page composition
- broad business logic that belongs in hooks or components

Example:

- `lib/apiClient.ts`
- `lib/utils.ts`
- a future `lib/queryClient.ts`

Use `lib/apiClient.ts` for frontend API URLs so requests stay on `/remote-api` instead of hardcoded backend hosts.

## API rule for this starter

Frontend code should call the backend through the frontend origin.

Use:

- `/remote-api/...` in browser requests
- `webpack.config.js` dev proxy to forward those requests locally
- nginx on deployed environments to forward the same prefix

When you rename the API prefix for a real app, update both:

- `webpack.config.js`
- `src/lib/apiClient.ts`

Do not scatter raw backend URLs across pages and components.

## Theme rule for this starter

- standalone mode uses `contexts/ThemeContext.tsx`
- hosted mode follows DigiHub theme automatically
- page components may receive a `theme` prop from the host, but they should not fight the host theme

If a remote looks wrong in dark mode, check these first:

- `src/globals.css`
- `src/contexts/ThemeContext.tsx`
- the host `theme` prop or DigiHub `themeChange` event

## Safe growth pattern

When you add a new feature, the default path should be:

1. add or update a page in `pages/`
2. extract reusable UI into `components/`
3. extract reusable stateful logic into `hooks/`
4. extract shared app state into `contexts/` only if several parts need it
5. keep low-level request helpers in `lib/`

That keeps `App.tsx` small and stops pages from turning into junk drawers.
