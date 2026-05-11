# Verlo.ai Brand Reference

**Tagline:** AI for depositions

## Wordmark
- **Font:** Instrument Serif (regular 400)
- **Color:** Brass `#D4A574` (single color, no splits)
- **Letter spacing:** `0.03em`
- **Stroke:** `0.8px` (CSS: `-webkit-text-stroke: 0.8px`; SVG: `stroke-width` scales at ratio `0.8/56` of font-size, `paint-order: stroke fill`)

## Icon Mark
- **Container:** Charcoal `#1C1917`, border-radius `15%`
- **Letterform:** Instrument Serif "V" at **80%** of container size
- **Letter color:** Brass `#D4A574`
- **Stroke:** Same `0.8px` ratio as wordmark
- **LinkedIn variant:** No border-radius (square), 400x400
- **Min size:** 24px
- **Clear space:** 25% of mark height

## Brand Hierarchy
- **Verlo.ai** (parent)
  - TruthOrLie.ai (product)
  - CaseChecker.ai (product)

## Color Palette

### Brand Mark (logo, social, pitch decks)
| Name | Hex |
|------|-----|
| Charcoal | `#1C1917` |
| Brass | `#D4A574` |
| Brass light | `#E8C9A0` |
| Brass dark | `#B08550` |
| Linen | `#F0EBE3` |
| Stone | `#E8E4DB` |
| Espresso | `#292524` |

### Product UI (app, dashboards)
| Name | Hex |
|------|-----|
| Slate 900 | `#0f172a` |
| Slate 500 | `#64748b` |
| Slate 400 | `#94a3b8` |
| Slate 200 | `#e2e8f0` |
| Slate 100 | `#f1f5f9` |
| Slate 50 | `#f8fafc` |
| White | `#ffffff` |

### Semantic
| Purpose | Hex |
|---------|-----|
| Success / Truth | `#16a34a` |
| Error / Lie | `#dc2626` |
| Warning / Uncertain | `#d97706` |
| Info | `#2563eb` |

**Rules:** Brass only in brand mark, never in product UI. Green for UI accents (not in logo).

## Typography
- **Wordmark:** `Instrument Serif`
- **UI/Marketing:** `DM Sans` — 800 page titles, 700 headings, 500 body, 600 captions (uppercase, `0.1em` tracking)
- **Technical:** `DM Mono` — hex values, timestamps, code

## Design Tokens
```
font-wordmark: 'Instrument Serif'
font-sans: 'DM Sans'
font-mono: 'DM Mono'
--wm-spacing: 0.03em
--wm-stroke: 0.8px
--icon-v-scale: 80%
--icon-radius: 15%
--charcoal: #1C1917
--brass: #D4A574
--linen: #F0EBE3
--slate-900: #0f172a
--slate-500: #64748b
--accent: #16a34a
--border: #e2e8f0
--radius-md: 10px
--radius-lg: 12px
```

## Files
- `docs/verlo-style-guide-v2.html` — Full visual style guide
- `verlo-wordmark-final.svg` — Brass wordmark
- `verlo-wordmark-reversed.svg` — White wordmark
- `verlo-wordmark-mono.svg` — Ink wordmark
- `verlo-icon-final.svg` — Icon (rounded)
- `verlo-lockup.svg` — Icon + wordmark
- SVG kit in `~/Downloads/verlo-svg-kit/` (includes LinkedIn square variant)
