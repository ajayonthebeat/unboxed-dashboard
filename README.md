# Unboxed TCG Dashboard

Business management dashboard for Unboxed TCG at Arden Fair Mall.

## Quick Setup

```bash
npm install
npm run dev
```

Opens at http://localhost:3000

## Project Structure
```
├── package.json
├── vite.config.js
├── index.html          ← Vite entry point
├── src/
│   ├── main.jsx        ← React bootstrap
│   └── App.jsx         ← Dashboard (localStorage version)
├── unboxed-dashboard.jsx  ← Claude.ai artifact version
└── vault.jsx           ← Backup & secrets (Claude.ai version)
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
