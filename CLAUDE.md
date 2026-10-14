# CLAUDE.md

NEVER START A DEV SERVER, I WILL DO THAT
This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PathwayEd - An AI-powered K–12 tutoring web application. Originally built as a vendor-fair demo, it is now moving toward a real student pilot: the N.I.K.K.I. tutor runs on Claude (Sonnet 4.6), backed by Supabase for persistence (saved sessions and per-student access codes) and gated by parent consent.

## Commands

```bash
bun dev        # Start development server
bun run build  # Type-check and build for production
bun run lint   # Run ESLint
bun run preview # Preview production build
```

## Tech Stack

- **Runtime:** Bun
- **Build:** Vite 7
- **Framework:** React 19 + TypeScript
- **Styling:** Tailwind CSS v4 (via @tailwindcss/vite plugin)
- **Components:** shadcn/ui (new-york style)
- **Icons:** Lucide React
- **AI:** OpenAI APIs (Chat Completions, Whisper, TTS)

## Architecture

### Path Aliases
All imports use `@/` prefix mapped to `src/`:
- `@/components` - React components
- `@/components/ui` - shadcn/ui components
- `@/lib` - Utilities (includes `cn()` helper)
- `@/hooks` - Custom React hooks
- `@/assets` - Static assets (logo, images)

### Styling
- Always use the frontend design skill for front end work!
- Tailwind v4 configured in `src/index.css` (no tailwind.config.js)
- CSS variables for theming defined in `:root`
- Brand colors: `--navy: #1e3a6e`, `--orange: #e85a24`
- Use `bg-primary`, `bg-accent`, `text-primary-foreground` etc. for brand colors

### Adding shadcn/ui Components
```bash
bunx --bun shadcn@latest add <component-name>
```

### Database Rules
- Every new database function the browser calls needs an explicit `grant execute ... to authenticated` in its migration, and `revoke` from `public` and `anon`.
- Edge function redeploys can reset `verify_jwt`; check it after every deploy.

### Commiting Rules
**Important:** Do not include any reference to Claude or AI in commit messages. Keep commits clean and professional.

## Key Files

- `PRD.md` - Product requirements document
- `DEVELOPMENT_PLAN.md` - Phased task breakdown with progress tracking
- `src/index.css` - Tailwind imports and CSS variables
- `components.json` - shadcn/ui configuration
