# Unboxed TCG Dashboard

Business management dashboard for Unboxed TCG at Arden Fair Mall.

## Files
- `unboxed-dashboard.jsx` — Main dashboard (React component)
- `vault.jsx` — Backup & secrets manager
- `index.html` — Entry point (for local dev)

## How to Deploy

### Option 1: Use with Claude.ai (Current)
Just open the `.jsx` files as artifacts in Claude.ai — they run directly.

### Option 2: GitHub Pages with Vite
```bash
npm create vite@latest unboxed -- --template react
cd unboxed
# Replace src/App.jsx with unboxed-dashboard.jsx content
# Install deps: npm install recharts papaparse
npm run build
# Deploy dist/ to GitHub Pages
```

### Option 3: Quick Local Dev
```bash
npx serve .
# Open http://localhost:3000
```

## Features
- Multi-channel sales tracking (Shopify, Square, Cash, AMEX)
- CSV import with auto-detect (drag & drop)
- Staff analytics & performance tracking
- Product analytics (Sealed vs Singles)
- Consignment management with commission splits
- Bank account tracking (AMEX, CHASE, CASH)
- Bill counter for cash deposits
- Goal tracker with milestone timestamps
- Trade credit handling
- Payout system with SMS notifications
- Data backup/export via Vault app
