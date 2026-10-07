# Biotech

Prototype of a crop monitoring app with a built-in AI assistant. Farmers
register their crops, follow humidity, temperature, pH and light readings on a
dashboard, and ask Gaia, an LLM assistant, for guidance.

[Live demo](https://biotech-app.vercel.app)

## What it does

- **Crop dashboard**: one card per crop, with detail pages charting humidity,
  temperature and pH over recent days (Recharts)
- **Gaia assistant**: chat backed by Llama 3 through the Groq API. The server
  route sends a system prompt, the conversation history and any context the
  user chose to share in their settings
- **Accounts**: email and password sign-in, passwords hashed with bcrypt
- **User settings**: notification, energy saving and data sharing preferences,
  plus plan tiers (Freemium, Premium, Enterprise)
- **Installable**: ships as a PWA, with light and dark themes

## Status

This is a prototype of the product concept. The hardware that would collect
field data (the "Biotech Node" sensor) is not part of this repository, so
chart readings are generated values rather than real measurements. Sessions
and authorization are minimal and would need hardening before real use.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router), React 19 RC, TypeScript |
| UI | Tailwind CSS, shadcn/ui (Radix), Motion |
| Data | Cloud Firestore |
| AI | Groq SDK, `llama3-8b-8192` |
| Forms | React Hook Form, Zod |
| Charts | Recharts |
| PWA | next-pwa |

## Project layout

```
app/api/        Route handlers: auth, crop, user, gaia
app/app/        Authenticated area: crops, crop detail, Gaia chat, profile
components/     UI components (shadcn/ui in components/ui)
services/       Firestore client and the Gaia LLM wrapper
types/          Crop, User and Message types
```

## Running locally

```bash
pnpm install
pnpm dev
```

Create `.env.local` with the Firebase web config (`NEXT_PUBLIC_FIREBASE_API_KEY`,
`NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`, `NEXT_PUBLIC_FIREBASE_DATABASE_URL`,
`NEXT_PUBLIC_FIREBASE_PROJECT_ID`, `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`,
`NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`, `NEXT_PUBLIC_FIREBASE_APP_ID`,
`NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`) and a Groq key
(`NEXT_PUBLIC_GROQ_AI_API_KEY`).

The interface is in Portuguese.
