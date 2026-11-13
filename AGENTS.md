# Repository guidance

- This is a single Next.js 13 App Router app. Routes and shared layouts live in `src/app`; the root layout mounts the shared navigation, cart, auth modal, footer, and Redux provider.
- Use `@/` for imports from `src/` (`jsconfig.json`). Shared UI is in `src/components`; Redux state and RTK Query endpoints are in `src/redux`.
- RTK Query endpoint slices extend the shared `apiSlice` in `src/redux/feature/api/apiSlice.js`. Add API behavior there or through `injectEndpoints` in the feature slice rather than creating a separate API store.
- Set `API_URL` to the backend base URL for API requests. `next.config.js` passes it through Next's `env` config, so it is embedded for client use; do not put secrets in it.

## Commands

- `npm run dev` — start the development server.
- `npm run lint` — run `next lint` using the `next/core-web-vitals` ESLint config.
- `npm test` — run Jest tests; pass a test path to focus a file (for example, `npm test -- src/redux/feature/cart/cartSlice.test.js`).
- `npm run test:watch` — run Jest in watch mode; `npm run test:coverage` — collect coverage.
- `npm run build` — production build; `npm start` serves that build.
- There is no typecheck script configured. No dependency lockfile is committed, and `.gitignore` excludes npm/yarn lockfiles.
