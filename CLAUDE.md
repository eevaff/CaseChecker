# Verlo / TruthOrLie Project

## Key Files
- **Landing page (Verlo parent):** `verlo-landing-page.tsx` — `LandingPage` (default export) + `SolutionsDropdown` + `VerloHeroVisual`. Edit this file for any landing-page work.
- **Main app (product pages + app screens):** `truthorlie-app.tsx` — CaseCheckerPage, TruthOrLiePage, ResourcesPage, SecurityPage, plus all logged-in app screens. Exports shared helpers (`C`, `VerloWordmark`, `TruthBars`, `SampleAnalysisSection`) that the landing page imports.
- **Routing:** `src/main.tsx` — pathname-based: `/casechecker`, `/truthorlie`, `/resources`, `/security`, `/logo`, `/wordmark`
- **Style guide:** `docs/verlo-style-guide-v2.html`
- **Wordmark SVGs:** `verlo-wordmark-final.svg`, `verlo-lockup.svg`

## Brand Specs
- Wordmark font: Instrument Serif, color #D4A574 (brass), stroke 0.8px
- Body font: DM Sans
- Mono font: DM Mono
- Colors: bg #fff, dark #0f172a (ink), icon bg #1C1917 (charcoal), accent #16a34a (green), brass #D4A574
- Text: primary #0f172a, secondary #64748b, muted #94a3b8

## Current State (April 14 2026)
- Landing page: Verlo parent brand, hero headline "Case intelligence at your fingertips." in Instrument Serif 60px
- Hero visual: two-product mockup (CaseChecker + TruthOrLie) with pulsing status dot animation
- Solutions dropdown: CaseChecker → /casechecker, TruthOrLie.ai → /truthorlie
- Product pages: eyebrow (product name, small DM Sans) + headline (value prop, 50px Instrument Serif brass)
- CaseChecker page: single CTA "Get a demo." (no live product yet)
- TruthOrLie page: two CTAs (Get Started + Schedule a Demo)
- Navbar wordmark: text-only "Verlo" at 30px, no V icon

## Pending Decisions
- Value prop copy for product pages — current taglines may be replaced with:
  - CaseChecker: "Catch every contradiction before the record closes."
  - TruthOrLie: "See what the transcript doesn't show you."
  - (Proposed, not yet approved)

## Dev Server
- `npx vite --port 5173` from project root
- No git repo initialized (Xcode CLI tools not available)
