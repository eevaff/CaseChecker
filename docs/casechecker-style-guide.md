# CaseChecker Style Guide

Version: 1.0  
Updated: April 2026  
Scope: CaseChecker product/marketing materials, aligned to current live code in `verlo-landing-page.tsx` and `truthorlie-app.tsx`.

## 1) Brand Positioning

CaseChecker is the contradiction-detection product under the Verlo parent brand.

- Parent brand: **Verlo**
- Product: **CaseChecker**
- Primary promise: live deposition fact-checking against case files
- Functional tone: rigorous, precise, defensible
- Emotional tone: calm authority, never alarmist

## 2) Voice and Messaging

### Voice attributes

- **Authoritative, not aggressive**: be direct and evidence-based.
- **Clear, not academic**: prefer plain legal-operational language.
- **Confident, not absolute**: imply risk assessment, not certainty theater.
- **Professional, not sterile**: concise but human.

### Core value themes

- Real-time contradiction detection
- Document-grounded citations
- Litigation workflow fit
- Defensible outputs and auditability

### Recommended headline style

- Use outcome-first phrasing.
- Keep headlines short (6-12 words).
- Avoid hype words ("revolutionary", "magic", "guaranteed").

Examples:

- "Live deposition fact-checking against your case files."
- "Catch contradictions before the record closes."

## 3) Brand Architecture and Naming

- Use `CaseChecker` (no space, title case).
- Use `Verlo` as company/umbrella reference.
- Use `.ai` domain only where context requires it.
- In UI labels, prefer short product names (`CaseChecker`, `TruthOrLie`).

## 4) Color System

CaseChecker uses Verlo’s neutral UI base plus a CaseChecker-specific accent.

### 4.1 Foundation neutrals (UI base)

- `--cc-bg`: `#ffffff`
- `--cc-bg-sub`: `#f8fafc`
- `--cc-bg-dark`: `#0f172a`
- `--cc-border`: `#e2e8f0`
- `--cc-border-light`: `#f1f5f9`
- `--cc-text`: `#0f172a`
- `--cc-text-secondary`: `#64748b`
- `--cc-text-muted`: `#94a3b8`

### 4.2 Semantic colors

- Success / verified: `#16a34a`
- Error / contradiction critical: `#dc2626`
- Warning / uncertain: `#d97706`
- Info / neutral signal: `#2563eb`

### 4.3 CaseChecker product accent

- CaseChecker primary accent: `#7A2E3B` (burgundy)
- Light tint usage: `rgba(122,46,59,0.04-0.12)` for subtle fills/borders

Use this accent for:

- CaseChecker eyebrow labels
- Section dividers/numerals on CaseChecker pages
- CaseChecker icon strokes/chips

Do not use it as a global app CTA color unless the page is explicitly CaseChecker-branded.

### 4.4 Verlo brass usage rule

`#D4A574` (brass) remains a **brand-mark color**, not a general product accent.

Allowed:

- Wordmark/logo
- Selected decorative highlights
- Branded contradiction card accents on dark surfaces

Not allowed:

- Primary buttons in CaseChecker UI
- Body-text links
- Generic product iconography

## 5) Typography

### 5.1 Font families

- Brand wordmark/display serif: `Instrument Serif`
- Primary UI/marketing: `DM Sans`
- Data/technical labels: `DM Mono`

### 5.2 Type roles

- **Hero display**: Instrument Serif, 52-60px, weight 400, tight tracking
- **Section headline**: Instrument Serif, 32-44px, weight 400
- **Subhead/body intro**: DM Sans, 16-18px, weight 400-500
- **Body text**: DM Sans, 14-16px, weight 400-500
- **UI labels/buttons**: DM Sans, 13-16px, weight 600
- **Eyebrows**: DM Sans, 13-14px, weight 600, uppercase, 0.08em tracking
- **Technical microcopy**: DM Mono, 9-12px

### 5.3 Wordmark specification (Verlo lockup)

- Font: Instrument Serif
- Letter spacing: `0.03em`
- Stroke ratio: `0.8 / 56` of rendered font size
- Wordmark color: brass (`#D4A574`) or white for dark mode contexts only

## 6) Spacing, Radius, and Surfaces

### 6.1 Radius scale (current implementation)

- `6px`: tiny chips/minor pills
- `8px`: nav buttons, compact controls
- `10px`: primary/secondary CTA buttons
- `12px`: cards and dropdown shells
- `14px`: feature cards
- `16px`: major panels/modals

### 6.2 Spacing rhythm

- Inner control spacing: 6-12px
- Card padding: 20-32px
- Section vertical spacing: 60-128px depending on hierarchy
- Max content width: usually 800, 900, or 1200px containers

### 6.3 Borders and shadows

- Standard border: `1px solid #e2e8f0`
- Soft border: `1px solid #f1f5f9`
- Light elevation: `0 8px 32px rgba(0,0,0,0.06-0.10)`

## 7) Component Style Patterns

### 7.1 Navigation

- Sticky top nav on white with subtle blur and border
- Wordmark-led brand presence
- Text links in secondary text color
- Primary CTA uses green accent (`#16a34a`) on main landing

### 7.2 Buttons

- **Primary**: solid fill, white text, 10px radius, 600 weight
- **Secondary**: transparent/white fill, bordered, same radius/weight
- Keep button labels action-oriented:
  - "Schedule a Demo"
  - "Request a Demo"
  - "See how it works"

### 7.3 Cards

- White background on neutral or dark section backgrounds
- Border-first treatment; shadow is subtle
- Icon container often uses tinted accent background

### 7.4 Status and signal chips

- Truth/verified states: green
- Contradiction alerts: red or CaseChecker burgundy, depending on context
- Technical states ("just now", confidence levels): DM Mono at small sizes

## 8) Iconography and Illustration

- Default stroke style: 1.5px line icons
- Rounded corners and consistent stroke joins
- CaseChecker page icons can use burgundy stroke (`#7A2E3B`)
- Security/trust visuals often use green accent to reinforce safety

## 9) Motion and Interaction

Motion should communicate system activity, not decoration overload.

Allowed patterns from current implementation:

- Soft pulse for active/live indicators
- Slow floating cards in hero mockups
- Gentle marquee/news belt
- Subtle hover background transitions in menus

Guidelines:

- Keep motion durations mostly in 0.15s-0.6s for interactions
- Use longer loops (4s-35s) for ambient background motion
- Avoid abrupt easings and excessive scale jumps

## 10) Layout Templates

### 10.1 Landing-style structure

1. Utility/banner strip (optional)
2. Sticky nav
3. Hero with serif headline + supporting paragraph + CTA pair
4. Problem framing section
5. "How it works" process section
6. Capability/use-case cards
7. Security/trust section
8. Pricing or conversion section
9. Dark final CTA
10. Minimal legal footer

### 10.2 CaseChecker product page structure

1. Product nav
2. Product hero (CaseChecker eyebrow + serif H1 + single demo CTA)
3. Three-step contradiction workflow narrative
4. Feature card grid
5. Return link / cross-nav
6. Footer

## 11) Accessibility and Quality Rules

- Maintain AA contrast minimum for body text and controls.
- Do not rely on color alone to convey contradiction states; include labels/icons.
- Preserve readable line lengths (about 60-90 characters for body copy blocks).
- Keep tap/click targets appropriately sized (44px minimum recommended for mobile).
- Use consistent heading hierarchy for semantic structure.

## 12) Do / Don’t

### Do

- Use Instrument Serif for high-importance display moments.
- Use DM Sans for all functional and body UI text.
- Keep CaseChecker accent usage focused and intentional.
- Ground claims in evidence-oriented language.
- Favor clean, bordered layouts over heavy visual effects.

### Don’t

- Don’t use brass as a general UI accent color.
- Don’t overuse animations in functional workflows.
- Don’t mix too many accent colors in one section.
- Don’t use sensational fraud-detection language.
- Don’t introduce new corner radius values without reason.

## 13) Implementation Tokens (Recommended)

Use these as canonical tokens for CaseChecker-facing work:

```css
:root {
  /* Neutrals */
  --cc-bg: #ffffff;
  --cc-bg-sub: #f8fafc;
  --cc-bg-dark: #0f172a;
  --cc-border: #e2e8f0;
  --cc-border-light: #f1f5f9;
  --cc-text: #0f172a;
  --cc-text-secondary: #64748b;
  --cc-text-muted: #94a3b8;

  /* Brand + product accents */
  --cc-accent-green: #16a34a;
  --cc-accent-burgundy: #7A2E3B;
  --cc-brand-brass: #D4A574;
  --cc-brand-charcoal: #1C1917;

  /* Semantics */
  --cc-success: #16a34a;
  --cc-error: #dc2626;
  --cc-warning: #d97706;
  --cc-info: #2563eb;

  /* Radius */
  --cc-radius-sm: 8px;
  --cc-radius-md: 10px;
  --cc-radius-lg: 12px;
  --cc-radius-xl: 16px;
}
```

## 14) Source of Truth

When this guide and implementation differ, validate against:

1. `verlo-landing-page.tsx` (latest landing patterns)
2. `truthorlie-app.tsx` (shared tokens/components + CaseChecker page specifics)
3. `docs/BRAND.md` and `docs/verlo-style-guide-v2.html` (brand-system intent)

