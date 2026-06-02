# Atomity Frontend Challenge — Feature Scaffold

This repository contains a focused scaffold for the Atomity frontend challenge. It implements a baseline FeatureSection (Option B) with:

- Next.js + TypeScript
- Tailwind CSS (configuration included)
- Framer Motion for animations
- TanStack React Query for data fetching and caching

What I scaffolded:

- `src/tokens/colors.ts` — token mapping referencing CSS variables
- `src/styles/globals.css` — global styles, CSS variables, Tailwind imports
- `src/hooks/useKpiData.ts` — React Query hook fetching DummyJSON products
- `src/components/FeatureSection.tsx` — scroll-triggered section rendering KPIs
- `src/components/AnimatedCard.tsx` — animated, accessible card

How to run locally:

```bash
cd Atomity
npm install
npm run dev
```

Notes:
- This scaffold focuses on structure, tokens, caching, and animation hooks. Continue by refining animations (motion-path SVG, parallax layers), accessibility polish, and deployment to Vercel.

Accessibility notes:
- All interactive elements are keyboard-focusable; cards support keyboard activation to focus the preview button (`Enter` / `Space`).
- Animations respect `prefers-reduced-motion`.
- Counters expose changes via `aria-live="polite"`.


If you want the micro-preview video to work locally, place your clip at `public/micro-preview.mp4` (or update the `videoSrc` prop in `FeatureSection`).

Git / Deploy
- Commit incrementally as you develop. Example commands to push to `main`:

```bash
git init
git add .
git commit -m "feat: scaffold feature section and animations"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

I cannot push to your remote from here; run the commands above locally to publish.

Automatic push helper
- A small helper script is included at `scripts/git-push-incremental.sh` to quickly commit and push incremental changes. Usage:

```bash
chmod +x scripts/git-push-incremental.sh
./scripts/git-push-incremental.sh "feat: refine animations"
```

Deploy to Vercel
- Recommended: Connect the GitHub repo to Vercel and enable automatic deploys from `main`.
- Steps:
	1. Create a GitHub repo and push your code.
	2. Go to https://vercel.com/new and import the repo.
	3. Ensure the framework is detected as Next.js and environment variables are empty.
	4. Deploy — Vercel will run `npm install` and `npm run build`.

Tips for deployment:
- Add a small `public/micro-preview.mp4` if you want the preview to work on the demo, or remove the preview usage in `FeatureSection`.
- Use Vercel Preview URLs from pull requests to show incremental work to reviewers.
