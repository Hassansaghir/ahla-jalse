# AGENTS.md

## Layout
- The only app is a Vite + React 19 project in `menu/` — not in the repo root. Run all commands with working directory `menu/`.
- Entry: `menu/src/main.jsx` → `menu/src/App.jsx`. Styles: `menu/src/App.css`, `menu/src/index.css`.
- No tests, no TypeScript, no CI, no git repo. Verification = `npm run lint` (oxlint) and `npm run build`.

## Commands (run in `menu/`)
- `npm run dev` — Vite dev server
- `npm run lint` — oxlint (config in `menu/.oxlintrc.json`, react + oxc plugins)
- `npm run build` — production build to `menu/dist/`
- `npm run preview` — serve the built dist

## App-specific facts
- Menu data is hardcoded in `menu/src/App.jsx` (`data` array) with `{ en, ar }` names, prices as strings like `'420,000'`, and image paths. There is no API call for items.
- Images are served from a live Odoo instance hardcoded as `ODOO_URL = 'https://ahla-jalse.odoo.com'` in `App.jsx`; item images use `${ODOO_URL}/web/image/product.template/<id>/image_512`. Image `onError` falls back to placehold.co.
- Default language is Arabic; the app toggles `dir="rtl|ltr"` on the root div via the `lang` state.
- Mobile layout already partially handled in `App.css` (`@media (max-width: 768px)` and `600px`, `.mobile-brand` bar shown only on mobile).
