# ☕ Ahla Jalse — Digital Menu

A fast, mobile-friendly digital menu for **Ahla Jalse Coffee Shop**, built with React + Vite and served via GitHub Pages.

🔗 **Live:** https://hassansaghir.github.io/ahla-jalse/

---

## ✨ Features

- 🌐 **Bilingual** — Arabic / English toggle with RTL support
- 📱 **Fully responsive** — dedicated mobile layout with sticky brand bar and category navigation
- 🗂️ **Category filtering** — one tap to browse coffee, desserts, shisha, and more
- 🖼️ **Real product photos** — served directly from the shop's Odoo backend, with graceful fallbacks
- 🎬 **Smooth animations** — powered by Framer Motion
- 🔒 **Hardened** — Content-Security-Policy, security headers, no sourcemaps in production

## 🛠️ Tech Stack

| Layer     | Tool                             |
| --------- | -------------------------------- |
| Framework | React 19                         |
| Build     | Vite 8                           |
| Styling   | CSS (custom, no UI kit)          |
| Animation | Framer Motion                    |
| Linting   | Oxlint                           |
| Hosting   | GitHub Pages (GitHub Actions CI) |

## 🚀 Development

```bash
cd menu
npm install
npm run dev       # start dev server
npm run lint      # oxlint
npm run build     # production build → menu/dist
npm run preview   # preview production build
```

## 📦 Deployment

Every push to `main` automatically:

1. Builds the app (`menu/` → `menu/dist`)
2. Deploys to GitHub Pages via `.github/workflows/deploy.yml`

No manual steps needed.

## 📁 Project Structure

```
ahla-jalse/
├── .github/workflows/deploy.yml   # CI/CD → GitHub Pages
├── qr-code.png                    # Printable QR code → live menu
├── cus.txt                        # Sales pitch (AR/EN)
└── menu/
    ├── index.html                 # CSP + meta + entry
    ├── vite.config.js             # base './', security headers
    └── src/
        ├── App.jsx                # Menu data + UI
        ├── App.css                # Styling + responsive rules
        └── main.jsx               # React entry
```

## 📷 QR Code

`qr-code.png` links directly to the live menu — print it on tables, menus, or receipts. Any menu update pushed to `main` is reflected at the same link, no reprint needed.
