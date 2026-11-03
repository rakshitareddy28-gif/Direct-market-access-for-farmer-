# Stillfield — Direct Market Access to Regenerative Farmers

[![Production Ready](https://img.shields.io/badge/Production-Ready-brightgreen.svg)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](#)
[![React](https://img.shields.io/badge/React-19-61DAFB.svg)](#)
[![Firebase](https://img.shields.io/badge/Firebase-Auth%20%26%20Firestore-orange.svg)](#)
[![Gemini AI](https://img.shields.io/badge/Google-Gemini%20AI-8E75B2.svg)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

An editorial, high-trust direct-to-farm rapid-commerce platform inspired by the Framer **Stillfield** design system. Connects conscious urban households directly with regional regenerative estates, orchards, and artisan millers with sub-4-hour dawn harvest timestamps, 100% fair price transparency (88.5% direct grower payout in Indian Rupees ₹), and cryptographic provenance tracking.

---

## Key Highlights & Standout Features

- **Heirloom Produce & Dawn Harvest Batches**:
  Every item features verifiable harvest timestamps (e.g. 05:15 AM today), core storage temperatures (4.5°C), brix sugar ratings, and direct grower attribution.
- **Curated Seasonal Terroir Crates**:
  One-click seasonal bundles (The Dawn Terroir Crate, Forest Fungi & Grain Hearth, Orchard & Roots) with instant basket population and ₹ bundle savings.
- **Grower Dawn Voice Dispatches**:
  Embedded field audio dispatches with animated audio waveforms, playback state, and verbatim harvest transcripts from regenerative growers.
- **Cryptographic Provenance Certificates**:
  Printable, shareable provenance cards verifying RFID batch numbers, SHA-256 batch hashes, soil biology lab tests (pH 6.8, 5.4% organic matter), and direct bank payout remittance confirmation.
- **Fair Price Ledger**:
  Interactive transparency slider comparing conventional supermarket middlemen (who pay growers ~22 paise/₹) with Stillfield’s verified **88.5% direct grower payout**.
- **AI Agronomist & Harvest Concierge**:
  Multi-turn assistant powered by Google Gemini (`gemini-3.8-flash` & `gemini-3.1-flash-lite`) providing culinary pairings, soil insights, and harvest knowledge with resilient offline domain fallback.
- **Enterprise-Grade Typography & Design**:
  Anthropic/Claude typographic hierarchy pairing **Newsreader** serif with **Plus Jakarta Sans** and **Space Mono**, accompanied by tactile 3D interactive button physics and Framer Motion viewport reveal animations.

---

## Security & Production Architecture

This repository is designed with strict security boundaries:

```
[ Client Browser (React 19) ]
           │
           │  1. Zero Client API Keys (Public-only config)
           │  2. Direct Firebase Auth with popup-cancellation fallback
           │  3. Multi-turn AI Agronomist requests
           ▼
[ Express API Server (Node / tsx) ]  <───  Environment Variables (.env)
           │                                 • GEMINI_API_KEY (strictly private)
           │                                 • PORT, NODE_ENV, APP_URL
           ├─► /api/health   (Container health & uptime check)
           ├─► /api/config   (Dynamic Firebase client initialization)
           └─► /api/chat     (Server-side Gemini AI proxy with User-Agent telemetry)
```

1. **Zero Client Secrets**:
   - The Gemini AI API key (`GEMINI_API_KEY`) is stored strictly in server-side memory and proxy routes (`/api/chat`). No private tokens or service credentials ever leak into Vite client bundles.
2. **Environment Variable Parity**:
   - Configurable via backend environment variables for deployment across Docker, Google Cloud Run, Railway, Render, AWS ECS, or Kubernetes.
3. **Hardened `.gitignore`**:
   - Automatically excludes `.env*`, `.pem`, `.key`, `service-account*.json`, and local build artifacts.

---

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite 8, Tailwind CSS v4, Motion (Framer Motion), Lucide Icons, Canvas Confetti.
- **Backend**: Express 4, Node.js, `@google/genai` TypeScript SDK (v2.4.0).
- **Database & Auth**: Firebase Firestore (with custom security rules in `firestore.rules`) & Firebase Authentication (Google Sign-In + Demo Patron fallback).
- **Typography**: Google Fonts (`Newsreader`, `Plus Jakarta Sans`, `Space Mono`).

---

## Environment Configuration

Copy `.env.example` to `.env` and configure your credentials:

```bash
cp .env.example .env
```

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `PORT` | HTTP server port | `3000` |
| `NODE_ENV` | Environment mode (`development` or `production`) | `production` |
| `GEMINI_API_KEY` | Private Google Gemini API Key (server-side only) | `AIzaSy...` |
| `APP_URL` | Public deployment URL | `https://your-domain.example.com` |
| `FIREBASE_PROJECT_ID` | Firebase Project ID | `modular-catbird-hpqwl` |
| `FIREBASE_DATABASE_ID`| Custom Firestore Database ID | `ai-studio-directmarketacce-...` |
| `FIREBASE_API_KEY` | Firebase Web Client API Key | `AIzaSy...` |
| `FIREBASE_AUTH_DOMAIN`| Firebase Auth Domain | `your-project.firebaseapp.com` |

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Development Mode
Runs the Express backend with Vite middleware and live TypeScript execution:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Execution
```bash
# Type check and build frontend assets into dist/
npm run build

# Start production server
npm start
```

### 4. Code Quality & Linting
```bash
npm run lint
```

---

## API Endpoints

- `GET /api/health` — Returns server health status, uptime, environment, and AI readiness.
- `GET /api/config` — Returns public Firebase client configuration dynamically from server env.
- `POST /api/chat` — Multi-turn server proxy for the Stillfield AI Agronomist Concierge:
  - Payload: `{ "messages": [{ "role": "user", "content": "What was cut at dawn today?" }], "modelSpeed": "balanced" }`
  - Response: `{ "reply": "...", "modelUsed": "gemini-3.8-flash" }`

---

## License

This project is licensed under the [MIT License](LICENSE).
