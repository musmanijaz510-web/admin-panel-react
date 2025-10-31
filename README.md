# Admin Panel (React + Vite)

A simple admin UI to create and list entries via a Supabase Edge Function.

## Setup

1. Copy environment variables:

```bash
cp .env.example .env
```

2. Edit `.env` and set:

- `VITE_SUPABASE_FUNCTION_URL` to your deployed function URL, e.g.
  `https://<project-ref>.functions.supabase.co/entries`.
- `VITE_SUPABASE_ANON_KEY` to your project's anon key (from Supabase project settings).

If you see a 401 error like `{ "code": 401, "message": "Missing authorization header" }`, ensure `VITE_SUPABASE_ANON_KEY` is set and available in the environment where the app runs.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy (DigitalOcean App Platform)

- Create a new App as a static site from this repo.
- Build command: `npm run build`
- Output directory: `dist`
- Add an environment variable `VITE_SUPABASE_FUNCTION_URL` with your function URL.
